from ..models import MongoBaseModel
from pydantic import Field
from enum import Enum

class LevelsEnum(str, Enum):
    beginner = "beginner"
    medium = "medium"
    advanced = "advanced"

class TopicDB(MongoBaseModel):
    name: str = Field(min_length=3, max_length=120)
    level: LevelsEnum = Field(default=LevelsEnum.beginner)