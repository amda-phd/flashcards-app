from fastapi.testclient import TestClient
from fastapi.encoders import jsonable_encoder
import pytest
import json
import pytest_asyncio

from src.main import app
from src.db import connect_to_mongodb

@pytest.fixture
def test_db():
    return connect_to_mongodb(app, testing = True)

@pytest_asyncio.fixture
async def seed_db(test_db):
    f = open("tests/seed.json")
    data = json.load(f)
    for key in data:
        collection = test_db[key]
        await collection.insert_many(jsonable_encoder(data[key]))
    return

@pytest.fixture
def client():
    return TestClient(app)

## Running this test first is a bit important, as it happens before the test_db() fixture is called, triggering the 503 error
def test_unhealthy_db(client):
    response = client.get("/health")
    assert response.status_code == 503
    assert response.json()["detail"] == "MongoDB unavailable"

@pytest.mark.asyncio
async def test_healthy_db(client, test_db):
    pre_docs = await test_db["health"].count_documents({})
    assert pre_docs == 0
    response = client.get("/health")
    assert response.status_code == 200
    post_docs = await test_db["health"].count_documents({})
    assert post_docs == pre_docs + 1
    data = response.json()
    assert data["health"] == 'ok'
