FROM python:latest

WORKDIR "/app"

COPY requirements.txt requirements.txt

RUN python -V
RUN pip3 install -r requirements.txt

COPY . .

CMD ["python3", "./src/covid-data.py"]
