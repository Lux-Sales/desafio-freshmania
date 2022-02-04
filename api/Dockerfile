FROM python:3.6.8-alpine3.9

ENV PYTHONUNBUFFERED 1  

RUN mkdir /code

WORKDIR /code

ADD ./app.py /code/
ADD ./requirements.txt /code/
RUN pip install -r requirements.txt

EXPOSE 5000

ENV FLASK_APP=app
ENV FLASK_ENV=development

CMD ["flask", "run", "--host", "0.0.0.0"]