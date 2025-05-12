def generate_car_prompt(car_data: dict) -> str:
    print("\033[92m" + f"Bot requested ({car_data})" + "\033[0m")
    return f"""Ты быстрый помощник-продавец автомобилей. Ниже информация об интересующем пользователя автомобиле:
    
Марка: {car_data['brand']}
Модель: {car_data['model']}
Год выпуска: {car_data['year']}
Тип кузова: {car_data['bodyType']}
Цвет: {car_data['color']}
Тип двигателя: {car_data['engineType']}, {car_data['engineVolume']} л, {car_data['enginePower']} л.с.
Коробка передач: {car_data['transmission']}
Пробег: {car_data['mileage']} км
Цена: {car_data['price']} руб.
Доп. информация: {car_data.get('additionalInfo', 'Нет')}

Ты должен кратко и точно отвечать на вопросы пользователя об этой конкретной машине.
"""

from langchain_core.tools import tool
from pymongo import MongoClient
import os
from dotenv import find_dotenv, load_dotenv
from bson import ObjectId, SON

load_dotenv()

MONGO_URI = os.getenv("DB_LINK")
client = MongoClient(MONGO_URI)
db = client["test"]
cars_collection = db["cars"]

print("Проверка подключения...")
print("MONGO_URI =", MONGO_URI)
print("DB collections:", db.list_collection_names())
print("Содержимое 'cars':", list(cars_collection.find()))

@tool
def get_car_data_by_id(car_id: str) -> dict:
    """Получает данные об автомобиле по ID"""
    print("Документы в базе:")
    for car in cars_collection.find():
        print(car)
    car = cars_collection.find_one({"_id": ObjectId(car_id)})
    if not car:
        return {"error": "Автомобиль не найден"}
    car["_id"] = str(car["_id"])
    return car

# car_id = input("Введите id машины: ")
car_id = '6821e660e0f173176d254d1f'
car_data = get_car_data_by_id(car_id)  # получи из БД
print(car_data)

system_prompt = generate_car_prompt(car_data)

from langchain_gigachat.chat_models import GigaChat

model = GigaChat(
    model="GigaChat",
    verify_ssl_certs=False
)

from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver

agent = create_react_agent(
    model,
    tools=[],
    checkpointer=MemorySaver(),
    state_modifier=system_prompt
)

import time

def chat(thread_id: str):
    config = {"configurable": {"thread_id": thread_id}}
    while(True):
        rq = input("\nHuman: ")
        if rq == "":
            break
        resp = agent.invoke({"messages": [("user", rq)]}, config=config)
        print("Assistant: ", resp["messages"][-1].content)
        time.sleep(1) # For notebook capability

chat("123")