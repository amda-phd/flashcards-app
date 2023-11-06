# Flashcards!

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

Use AI to enhance your learning.

## Install

We provide the `install.sh` script that allows quickly installing the packages and libraries that each of the components of this app require to run. However, if you want to install things manually, open a terminal window in this root folder and type:

1. `cd be-flashcards`
2. `python3 -m venv .venv` 
3. `source .venv/bin/activate`
4. `pip install -r requirements.txt`
5. `cd ../fe-flashcards`
6. `npm install` or `yarn`

## Run

We provide the `run.sh` script that allows quickly running the packages that form this app. Don't forget to create the `.env` files for each of the packages, as instructed in the individual packages' README files before you run anything.

In order to run the app locally, type:

1. `cd be-flashcards`
2. `source .venv/bin/activate`
3. `uvicorn src.main:app --reload`
4. `cd ../fe-flashcards`
5. `npm dev` or `yarn dev`
