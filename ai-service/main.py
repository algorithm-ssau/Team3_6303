stuff_database = [
    {
        "name": "iPhone 8 mini",
        "price": 300,
        "memory": 128,
        "ram": 8,
        "camera": 12,
        "description": "Самая дешевая модель iPhone",
    },
    {
        "name": "iPhone 14",
        "price": 1000,
        "memory": 128,
        "ram": 8,
        "camera": 12,
        "description": "Телефон будущего, уже сегодня!",
    },
    {
        "name": "Samsung Galaxy S23",
        "price": 900,
        "memory": 256,
        "ram": 12,
        "camera": 108,
        "description": "Камера такая острая, что сможет увидеть даже ваши ошибки",
    },
    {
        "name": "Google Pixel 7",
        "price": 850,
        "memory": 128,
        "ram": 8,
        "camera": 16,
        "description": "Для тех, кто хочет получить стоковый Android и хорошие фотки",
    },
    {
        "name": "OnePlus 9T",
        "price": 700,
        "memory": 128,
        "ram": 8,
        "camera": 48,
        "description": "Зарядка быстрее, чем ваш кофе",
    },
    {
        "name": "Xiaomi Mi 12",
        "price": 600,
        "memory": 128,
        "ram": 6,
        "camera": 64,
        "description": "Бюджетный флагман для ценителей вкуса",
    },
    {
        "name": "Sony Xperia 3",
        "price": 1100,
        "memory": 256,
        "ram": 12,
        "camera": 20,
        "description": "Телефон для тех, кто скучал по кнопке для камеры",
    },
    {
        "name": "Huawei P60",
        "price": 800,
        "memory": 128,
        "ram": 8,
        "camera": 50,
        "description": "Для любителей ночной съемки и без Google Play",
    },
    {
        "name": "Nokia 10 PureView",
        "price": 750,
        "memory": 128,
        "ram": 6,
        "camera": 48,
        "description": "Nokia вернулась, и у неё есть змейка!",
    },
    {
        "name": "LG Velvet 2",
        "price": 650,
        "memory": 128,
        "ram": 8,
        "camera": 32,
        "description": "Потому что жизнь хороша",
    },
    {
        "name": "Asus ROG Phone 6",
        "price": 1000,
        "memory": 512,
        "ram": 16,
        "camera": 64,
        "description": "Играй как профи, заряжай как новичок",
    },
    {
        "name": "Motorola Edge Plus",
        "price": 700,
        "memory": 128,
        "ram": 8,
        "camera": 108,
        "description": "Край к краю, пиксель к пикселю",
    },
    {
        "name": "Realme X4 Pro",
        "price": 450,
        "memory": 128,
        "ram": 8,
        "camera": 48,
        "description": "Экономия без потерь в качестве",
    },
    {
        "name": "Oppo Find X4",
        "price": 900,
        "memory": 256,
        "ram": 12,
        "camera": 50,
        "description": "Найди X, но без математики",
    },
    {
        "name": "BlackBerry Secure",
        "price": 1200,
        "memory": 128,
        "ram": 8,
        "camera": 12,
        "description": "Для тех, кто ещё помнит, что такое физическая клавиатура",
    },
    {
        "name": "Fairphone 4",
        "price": 500,
        "memory": 64,
        "ram": 4,
        "camera": 12,
        "description": "Этичный выбор для заботливого потребителя",
    },
]

from typing import Dict

from langchain_core.tools import tool


@tool
def get_all_phone_names() -> str:
    """Возвращает названия моделей всех телефонов через запятую"""
    # Подсвечивает вызов функции зеленым цветом
    print("\033[92m" + "Bot requested get_all_phone_names()" + "\033[0m")
    return ", ".join([stuff["name"] for stuff in stuff_database])


@tool
def get_phone_data_by_name(name: str) -> Dict:
    """
    Возвращает цену в долларах, характеристики и описание телефона по точному названию модели.

    Args:
        name (str): Точное название модели телефона.

    Returns:
        Dict: Словарь с информацией о телефоне (цена, характеристики и описание).
    """
    # Подсвечивает вызов функции зеленым цветом
    print("\033[92m" + f"Bot requested get_phone_data_by_name({name})" + "\033[0m")
    for stuff in stuff_database:
        if stuff["name"] == name.strip():
            return stuff

    return {"error": "Телефон с таким названием не найден"}

@tool
def create_order(name: str, phone: str) -> None:
    """
    Создает новый заказ на телефон.

    Args:
        name (str): Название телефона.
        phone (str): Телефонный номер пользователя.

    Returns:
        str: Статус заказа.
    """
    # Подсвечивает вызов функции зеленым цветом
    print("\033[92m" + f"Bot requested create_order({name}, {phone})" + "\033[0m")
    print(f"!!! NEW ORDER !!! {name} {phone}")

system_prompt = "Ты бот-продавец телефонов, сначала сразу посмотри список всех доступных телефонов. Твоя задача продать телефон пользователю, получив от него заказ. Если тебе не хватает каких-то данных, запрашивай их у пользователя."
tools = [get_all_phone_names, get_phone_data_by_name, create_order]

import getpass
import os
from dotenv import find_dotenv, load_dotenv
from langchain_gigachat.chat_models import GigaChat

load_dotenv(find_dotenv())

if "GIGACHAT_CREDENTIALS" not in os.environ:
    os.environ["GIGACHAT_CREDENTIALS"] = getpass.getpass("Введите ключ авторизации GigaChat API: ")

model = GigaChat(
    model="GigaChat",
    verify_ssl_certs=False
)

from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver

agent = create_react_agent(model,
                           tools=tools,
                           checkpointer=MemorySaver(),
                           state_modifier=system_prompt)

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
