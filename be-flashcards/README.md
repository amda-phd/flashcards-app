# AI-powered Flashcards API

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

Uses OpenAI's ChatGPT API to generate questions and answers about a specific topic and for a given level. Created using a REST API boilerplate built by [amda](https://github.com/amda-phd).

## Usage

### Pre-requirements

In order to run this repository on your local device you'll need to have:

- Python 3.9 with `venv` environment administrator.
- MongoDB installed and running.

It will also be good to have an HTTP testing software, such as Postman or Insomnia, in order to explore the API. But the app's documentation can provide means to test the endpoint without the need to install anything else.

### Installation

1. Clone this package with

   ```bash
    git clone https://github.com/amda-phd/be_coworking_api.git
    ```

2. Move to the repo's root folder and create a `.env` file with information required to connect to your local instance of MongoDB. Make sure that you use a database that exists in your workspace. You'll also need a valid OpenAI API key and the url of the frontend client that will consume the API. The resulting file should look like:

   ```bash
    # .env
    MONGODB_HOST=localhost
    MONGODB_PORT=27017
    MONGODB_NAME=
    OPENAI_API_KEY=
    FRONTEND_URL=
   ```

1. Create the project's virtual environment by executing:

   ```bash
   python -m venv .venv
   ```

2. Activate the environment with the command:
   1. Windows: `.venv\Scripts\activate.bat`
   2. Unix and/or MacOS: `source .venv/bin/activate`
3. Once you're running the environment, install all the packages contained in the `requirements.txt` with the command:

   ```bash
   pip install -r requirements.txt
   ```

### Execution

Once all the steps described in the Installation instructions have been executed, you can run your local instance of the Coworking API by running the following command from the project's root while running the aforementioned environment:

```bash
uvicorn src.main:app --reload 
```

If you don't specify a different port, the REST API will be served from [http://localhost:8000/](http://localhost:8000/)


### Tests

Although testing coverage is still a work in progress, the current version of the testing suite for this project can be executed with the following command, again from the project's root and while running its environment:

```bash
pytest tests/
```

### OpenAPI Documentation

The project serves its own OpenAPI-compliant documentation on execution. The documentation can be accessed wia the following paths:

- [http://localhost:8000/docs](http://localhost:8000/docs) for Swagger UI version.
- [http://localhost:8000/redoc](http://localhost:8000/redoc) for ReDoc version.

Both UIs allow testing the endpoints locally.
