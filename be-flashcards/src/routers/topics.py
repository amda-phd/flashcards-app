from fastapi import APIRouter, Body, Request, status, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from typing import List
from bson import ObjectId

from ..db.models.topics import TopicDB
from ..openai import create_questions

router = APIRouter()

@router.get("", description="List all the topics available along with their levels")
async def list_topics(request: Request) -> List[TopicDB]:
    raw_response = request.app.mongodb["topics"].find({})
    results = [TopicDB(**raw_topic) async for raw_topic in raw_response]
    return results

@router.post(
    "",
    description="Create new topic in the database along with ten ai-generated questions about it in the cards collection",
    status_code=201,
    responses = {
        201: { "description": "Topic processed and questions obtained and stored correctly" },
        502: { "description": "An error occurred during with the communication with OpenAI's API" }
    }
)
async def create_topic(request: Request, topic: TopicDB = Body(...)) -> TopicDB:
    try:
        questions = await create_questions(topic)
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Something went wrong with the communication with OpenAI"
        )
    
    topic = jsonable_encoder(topic)
    new_topic = await request.app.mongodb["topics"].insert_one(topic)
    topic_id = new_topic.inserted_id
    created_topic = await request.app.mongodb["topics"].find_one({
        "_id": topic_id
    })

    for question in questions:
        question["topic_id"] = ObjectId(topic_id)
        question["answer"] = None
    await request.app.mongodb["cards"].insert_many(questions)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_topic)
