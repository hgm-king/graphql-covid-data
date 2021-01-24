FROM python:3.7.0

COPY requirements.txt requirements.txt

RUN python -V
RUN pip3 install -r requirements.txt

WORKDIR "/app"

COPY . ./app

CMD ["python3", "/app/src/covid-data.py"]
