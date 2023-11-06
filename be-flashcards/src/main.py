from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from decouple import config

from .db import connect_to_mongodb, close_mongodb_connection, ping_mongodb
from .routers.topics import router as topics_router
from .routers.cards import router as cards_router

origins = [
    config('FRONTEND_URL', default="http://localhost" ,cast=str)
]

app = FastAPI(
    title = "AI-powered flashcards API",
    description = "An API that produces questions and answers about the topic that you want to learn. Beware! AI-powered answers."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.on_event("startup")
def on_startup():
    connect_to_mongodb(app)

@app.on_event("shutdown")
def on_shutdown():
    close_mongodb_connection(app)

@app.get(
    "/health",
    description = "Check the server's and MongoDB connection integrity",
    responses = {
        200: { "description": "Server and database reachable" },
        500: { "description": "Server unreachable" },
        503: { "description": "Database unreachable" }
    })
async def health(request: Request):
    try:
        await ping_mongodb(request.app.mongodb)
        return JSONResponse(content=jsonable_encoder({ "health": "ok" }))
    except Exception as e:
        print(e)
        raise HTTPException(status_code=503, detail="MongoDB unavailable")

app.include_router(topics_router, prefix="/topics")
app.include_router(cards_router, prefix="/cards")