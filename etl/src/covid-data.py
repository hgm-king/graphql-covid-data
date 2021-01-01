from kedro.extras.datasets.pandas import CSVDataSet

import numpy as np
import os
import pandas as pd
import psycopg2
import re
import requests
from sqlalchemy import create_engine

os.environ['LOCAL_ROOT'] = '/app/data'

def format_date_for_url(date):
    return date.replace('/', '_')

def format_local_path(root, path, date, filetype):
    return '{}/{}/{}.{}'.format(root, path, format_date_for_url(date), filetype)

def create_history_url(path, page):
    return 'https://api.github.com/repos/nychealth/coronavirus-data/commits?path={}&page={}'.format(path, page)

def create_raw_data_url(sha, path):
    return 'https://raw.githubusercontent.com/nychealth/coronavirus-data/{}/{}'.format(sha, path)

# given an array of dataframes, we concatenate them together to make one big df
def concat_saved_files(saved_files):
    return pd.concat(saved_files)

# given a json object that represents the one commit in a git repo and a file path
# this will return a tuple of the raw url of the given path as well as the date that it was commited on
def break_down_history_json(row, path):
    sha = row['sha']
    commit_date = row['commit']['committer']['date']

    data_url = create_raw_data_url(sha, path)
    return (data_url, commit_date)

# this gets an array of json objects which represent 1 commit for a given file
# returns an array of tuples with the url to the raw file data as well as the date it was commited on
def get_history_data_from_git(url, path):
    try:
        r = requests.get(url)
        json = r.json()
        return [break_down_history_json(row, path) for row in json]
    except Exception as exception:
        print('Error: could not get {}'.format(url))
        return []

# given a url to a raw file on github and a date the file was commited on
# saves the file as a csv and returns a dataframe
def save_csv_from_github(url, date):
    #spits out root/path/date.filetype
    local_path = format_local_path(os.environ['LOCAL_ROOT'], path, date, filetype)

    print('Loading and saving data for {} to {}\n{}'.format(date, local_path, url))
    try:
        data_set = CSVDataSet(filepath=url)
        data = data_set.load()

        print('{} columns found'.format(len(data.columns)))

        dates = np.repeat(date, len(data))
        data['date'] = dates

        local_data_set = CSVDataSet(filepath=local_path)
        local_data_set.save(data)

        return data
    except Exception as exception:
        print('Error: could not get {}'.format(url))
        return []

def map_over_commits_for_file(history_data):
    return [save_csv_from_github(url, date) for (url, date) in history_data]

# given a path, we get every version of the file from the git history
# and return each version as an array of dataframes
def load_and_save_csv_data_from_github_file(path, filetype):
    url = '{}.{}'.format(path, filetype)

    has_commits = True
    commit_page = 1
    files_saved = []

    while has_commits:
        history_url = create_history_url(url, commit_page)
        history_data = get_history_data_from_git(history_url, url)

        num_commits = len(history_data)
        print('Found {} entries'.format(num_commits))
        if num_commits > 0:
            saved_files = map_over_commits_for_file(history_data)
            files_saved = files_saved + saved_files
        else:
            has_commits = False

        commit_page += 1

    return files_saved

def clean_data_files(files):
    files = filter(lambda df : 0 < len(df), files)
    return files

def load_github_file_to_database(engine, path, filetype, table_name):
    saved_files = load_and_save_csv_data_from_github_file(path, filetype)
    cleaned_files = clean_data_files(saved_files)
    all_data_from_history_df = concat_saved_files(cleaned_files)

    with engine.connect() as conn:
        all_data_from_history_df.to_sql(table_name, conn)


engine = create_engine("postgresql+psycopg2://unicorn_user:magical_password@db:5432/rainbow_database")
path = 'data-by-modzcta'
table_name = 'DataByModzcta'
filetype = 'csv'

# saved_files = load_and_save_csv_data_from_github_file(path, filetype)
data = load_github_file_to_database(engine, path, filetype, table_name)
