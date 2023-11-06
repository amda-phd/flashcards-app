from ..models import MongoBaseModel, PyObjectId
from pydantic import Field
from typing import Optional

class CardDB(MongoBaseModel):
    topic_id: PyObjectId = Field(default_factory = PyObjectId)
    question: str = Field(...)
    answer: Optional[str] = Field(default = None)
    order: int = Field(gt=0)