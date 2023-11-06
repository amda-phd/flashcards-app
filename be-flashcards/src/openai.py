from decouple import config
import openai

from .db.models.topics import TopicDB, LevelsEnum

openai.api_key = config("OPENAI_API_KEY", cast=str)

def questions_to_json(text):
    questions = text.split('\n')
    result = []

    for i, question in enumerate(questions, start=1):
        if question:
            result.append({
                "order": i,
                "question": question.replace(f"{i}. ", "").strip()
            })

    return result

async def create_questions(topic: TopicDB):
    completion = await openai.ChatCompletion.acreate(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": f"Create ten questions to help me study about the topic {topic.name}. Assume that my knowledge of this topic is of {topic.level} level"
            }
        ]
    )
    return questions_to_json(completion.choices[0].message.content)

async def get_answer(question: str, topic: str, level: LevelsEnum):
    completion = await openai.ChatCompletion.acreate(model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": f"Provide an answer between 50 and 100 words for the following question about the topic {topic}. Assume that the audience's knowledge of this topic is of {level} level: {question}"
            }
        ])
    return completion.choices[0].message.content