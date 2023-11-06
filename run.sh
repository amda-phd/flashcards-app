#!/bin/bash

cd be-flashcards

# Activate virtual environment
source .venv/bin/activate

# Start FastAPI backend
uvicorn src.main:app --reload &

# Start React frontend
cd ../fe-flashcards
npm dev

# Deactivate virtual environment
deactivate