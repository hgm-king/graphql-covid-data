# This file will run some code that will pull down every version of a given file in github
#  - each version will get saved into the data directory
#  - it will then combine every version into one big data frame and save it as one big table
#  - afterwards you need to run some sql to clean it, found in the same directory as this file
# (this only works for csv at present)

# exec(open('src/covid-data.py').read())
# python3 src/covid-data.py

from datetime import date
import json
import numpy as np
import os
import pandas as pd
import psycopg2
import re
import requests
import semver
from sqlalchemy import create_engine, Integer, text

def load_me():
    exec(open('src/covid-data.py').read())

LOCAL_ROOT = os.environ.get('LOCAL_ROOT', './data')
BUMP_VERSION = os.environ.get('BUMP_VERSION', True)

print("Connecting to {}".format(os.environ['DATABASE_URL_ETL']))
engine = create_engine(os.environ['DATABASE_URL_ETL'])

# These functions are utilities
def get_table_name_from_path(path):
    [folder, name] = path.split('/')
    return name.title().replace('-', '')

def format_date_for_url(date):
    return date.replace('/', '_')

def format_local_path(root, path, filetype):
    return '{}/{}.{}'.format(root, path, filetype)

def create_history_url(path, page):
    return 'https://api.github.com/repos/nychealth/coronavirus-data/commits?path={}&page={}'.format(path, page)

def create_raw_data_url(sha, path):
    return 'https://raw.githubusercontent.com/nychealth/coronavirus-data/{}/{}'.format(sha, path)

def create_regular_data_url(path):
    return 'https://raw.githubusercontent.com/nychealth/coronavirus-data/master/{}'.format(path)

# given an array of dataframes, we concatenate them together to make one big df
def concat_saved_files(saved_files):
    return pd.concat(saved_files)

def clean_data_files(files):
    files = filter(lambda df : 0 < len(df), files)
    return files

def cleanup_data_frame(df):
    try:
        df = df.drop('<<<<<<< HEAD', axis=1)
    except:
        print("...table had no merge conflicts")

    new_index = range(len(df))
    df['id'] = new_index
    df = df.set_index('id')
    # df = df.dropna()

    return df

def get_app_version(engine):
    con = engine.connect()
    rs = con.execute("SELECT * from coviddatafrontend")
    version_info = rs.fetchone()
    con.close()
    return version_info

def save_dataframe_to_database(engine, df, table_name):
    try:
        with engine.connect() as conn:
            df.to_sql(table_name, conn, dtype={"id": Integer()}, if_exists='replace')
    except Exception as exception:
        print("Error: Could not save table {}".format(table_name))
        print(exception)

# given a url to a raw file on github and a date the file was commited on
# saves the file as a csv and returns a dataframe
def get_csv(url, date, local_path):
    print('Loading and saving data for {} to {}'.format(date, local_path))
    # we want to use the local one if we have it
    try:
        data = pd.read_csv(filepath_or_buffer=local_path)
        print("...Loaded from LOCAL {}".format(local_path))
        return data
    except Exception as exception:
        # pull it from internet
        return get_csv_file_from_github(url, date, local_path)

def get_csv_file_from_github(url, date, local_path):
    try:
        data = pd.read_csv(filepath_or_buffer=url)
        if date != "":
            dates = np.repeat(date, len(data))
            data['date'] = dates
        data.to_csv(path_or_buf=local_path)
        return data
    except Exception as exception:
        print('Error: could not get csv {}'.format(url))
        #print(exception)
        return []


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
        json_data = r.json()
        return [break_down_history_json(row, path) for row in json_data]
    except Exception as exception:
        print('Error: could not get history {}'.format(url))
        return []

def map_over_commits_for_file(history_data, path):
    return [get_csv(url, date, "data/{}/{}.csv".format(path, date)) for (url, date) in history_data]

# given a path, we get every version of the file from the git history
# and return each version as an array of dataframes
def get_each_commit_for_csv(path):
    filetype = 'csv'

    url = '{}.{}'.format(path, filetype)

    has_commits = True
    commit_page = 1
    files_saved = []

    while has_commits:
        history_url = create_history_url(url, commit_page)
        print("...Fetching the HISTORY at {}".format(url))
        history_data = get_history_data_from_git(history_url, url)

        num_commits = len(history_data)
        print('...{} ENTRIES found'.format(num_commits))
        if num_commits > 0:
            saved_files = map_over_commits_for_file(history_data, path)
            files_saved = files_saved + saved_files
        else:
            has_commits = False

        commit_page += 1

    return files_saved

def save_file_commits_to_database(engine, path, filetype, table_name):
    saved_files = get_each_commit_for_csv(path)
    cleaned_files = clean_data_files(saved_files)
    all_data_from_history_df = concat_saved_files(cleaned_files)
    cleaned_df = cleanup_data_frame(all_data_from_history_df)
    save_dataframe_to_database(engine, cleaned_df, table_name)

def save_singular_file_to_database(engine, path, filetype, table_name):
    url = create_regular_data_url("{}.{}".format(path, filetype))
    #spits out root/path/date.filetype
    local_path = format_local_path(LOCAL_ROOT, path, filetype)
    data = get_csv_file_from_github(url, "", local_path)
    cleaned_df = cleanup_data_frame(data)
    save_dataframe_to_database(engine, cleaned_df, table_name)

def save_version_and_date(engine, version):
    ver = semver.VersionInfo.parse(version)
    if BUMP_VERSION:
        bumped = ver.bump_patch()
    else:
        bumped = ver
    today = date.today()
    data = [[str(bumped), str(today)]]
    print(f"Saving as {data}")
    df = pd.DataFrame(data, columns = ['version', 'date'])
    with engine.connect() as conn:
        df.to_sql('coviddatafrontend', conn, if_exists='replace')

def start(engine):
    try:
        version_info = get_app_version(engine)
        version = version_info[1]
    except:
        version = "0.0.0"
    print("##### Loading data for version {}".format(version))
    config_path = './src/config.json'

    with open(config_path) as f:
        data = json.load(f)
        for file in data['files']:
            try:
                [path, filetype] = file.split('.')
                table_name = get_table_name_from_path(path)
                print("LOADING:: {}.{} and saving it into {} in your db".format(path, filetype, table_name))
                data = save_file_commits_to_database(engine, path, filetype, table_name)
            except Exception:
                print(f"ERROR:: Failed on {file}")
    #
    # with open(config_path) as f:
    #     data = json.load(f)
    #     for file in data['singular']:
    #         try:
    #             [path, filetype] = file.split('.')
    #             table_name = get_table_name_from_path(path)
    #             print("Getting data from {}.{} and saving it into {} in your db".format(path, filetype, table_name))
    #             data = save_singular_file_to_database(engine, path, filetype, table_name)
    #         except Exception:
    #             print(f"ERROR:: Failed on {file}")
    #

def execute():
    try:
        version_info = get_app_version(engine)
        version = version_info[1]
    except:
        version = "0.0.0"
    print("##### Loading data for version {}".format(version))

    file = "trends/data-by-day.csv"
    try:
        [path, filetype] = file.split('.')
        table_name = get_table_name_from_path(path)
        print("Getting data from {}.{} and saving it into {} in your db".format(path, filetype, table_name))
        data = save_singular_file_to_database(engine, path, filetype, table_name)
    except Exception:
        print(f"ERROR:: Failed on {file}")

    migrations_file = "./migrations/data-by-day.sql"
    with open(migrations_file) as f:
        with engine.connect() as conn:
            print(f)
            conn.execute(text(f.read()))

    save_version_and_date(engine, version)

execute()
# start(engine)
