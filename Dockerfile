FROM python:3.9.5-slim-buster as base
# Uncomment to test locally
EXPOSE 80  
# EXPOSE $PORT 
COPY /api/src /app
COPY /api/requirements.txt /app/requirements.txt

# for pipenv
# RUN pip install pipenv 
RUN apt-get update && apt-get install -y --no-install-recommends gcc
WORKDIR /app
#COPY Pipfile .
#COPY Pipfile.lock .
#RUN PIPENV_VENV_IN_PROJECT=1 pipenv install --deploy
RUN pip install -r requirements.txt
# for local 
#ENTRYPOINT [ "python", "server.py" ]  
# for heroku
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", $PORT]