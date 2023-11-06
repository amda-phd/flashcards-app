from bson import ObjectId
from fastapi import APIRouter, Request, HTTPException, status
from typing import List

from ..db.models.cards import CardDB
from ..db.models import PyObjectId
from ..openai import get_answer

router = APIRouter()

@router.get(
    "",
    description="Retrieve all the questions for a given topic",
    responses = {
        404: { "description": "The requested topic cannot be found in the database" }
    }
)
async def list_questions(topic_id: str, request: Request) -> List[CardDB]:
    if (await request.app.mongodb["topics"].count_documents({ "_id": topic_id })) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"The topic with id {topic_id} cannot be found in our database")
    
    raw_response = request.app.mongodb["cards"].find({ "topic_id": ObjectId(topic_id) }).sort("order")
    results = [CardDB(**raw_card) async for raw_card in raw_response]
    return results

@router.put(
    "/{id}/answer",
    description="Request an AI-generated answer for a question and store it in the database",
    responses = {
        404: { "description": "The requested card cannot be found in the database" },
        421: { "description": "The card already contains an AI-generated answer and it won't be overwritten" },
        502: { "description": "An error occurred during with the communication with OpenAI's API" },
        503: { "description": "An error occured in the communication with the MongoDB" }
    }
)
async def obtain_answer(id: str, request: Request) -> CardDB:
    card = await request.app.mongodb["cards"].find_one({ "_id": ObjectId(id) })
    if card is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"The card with id {id} cannot be found in our database")
    if card["answer"] is not None:
        raise HTTPException(status_code=status.HTTP_421_MISDIRECTED_REQUEST, detail="This card already contains an AI-generated answer. You can access it through the GET method upon this same address")
    
    topic = await request.app.mongodb["topics"].find_one({ "_id": str(card["topic_id"]) })
    if topic is None:
        topic_id = card["topic_id"]
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"The topic with id {topic_id} cannot be found in our database")

    try:
        answer = await get_answer(card["question"], topic["name"], topic["level"])
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Something went wrong with the communication with OpenAI"
        )

    await request.app.mongodb["cards"].update_one({ "_id": ObjectId(id) }, { "$set": { "answer": answer } })
    updated_card = await request.app.mongodb["cards"].find_one({ "_id": ObjectId(id) })
    if updated_card["answer"] is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Something went wrong with the database communication")
    return CardDB(**updated_card)

@router.get(
    "/{id}/answer",
    description="Get previously generated answer for a question from the database",
    responses = {
        404: { "description": "The requested card cannot be found in the database" },
        421: { "description": "The card doesn't contain any AI-generated answer, so it has to be generated first" }
    }
)
async def find_answer(id: str, request: Request) -> CardDB:
    card = await request.app.mongodb["cards"].find_one({ "_id": ObjectId(id) })
    if card is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"The card with id {id} cannot be found in our database")
    if card["answer"] is None:
        raise HTTPException(status_code=status.HTTP_421_MISDIRECTED_REQUEST, detail="This card doesn't contain an AI-generated answer yet. Request one through the PUT method upon this same address")
    
    return CardDB(**card)