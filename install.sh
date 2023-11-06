#!/bin/bash

cd be-flashcards

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

cd ../fe-flashcards
npm install

# Deactivate virtual environment
deactivate

echo "Packages installed successfully!"