FROM python:3.9.5-slim-buster as base
EXPOSE 80
FROM base as python-deps
RUN pip install pipenv
RUN apt-get update && apt-get install -y --no-install-recommends gcc

COPY Pipfile .
COPY Pipfile.lock .
RUN PIPENV_VENV_IN_PROJECT=1 pipenv install --deploy

FROM base AS runtime

COPY --from=python-deps /.venv /.venv
ENV PATH="/.venv/bin:$PATH"
WORKDIR /app
COPY src/ .

ENTRYPOINT [ "python", "server.py" ]