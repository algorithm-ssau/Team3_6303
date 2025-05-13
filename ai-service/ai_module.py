def generate_car_prompt(car_data):
    return f"""Ты быстрый помощник-продавец автомобилей. Ниже информация об интересующем пользователя автомобиле:
            Марка: {car_data.get("brand")}
            Модель: {car_data.get("model")}
            Год выпуска: {car_data.get("year")}
            Тип кузова: {car_data.get("bodyType")}
            Цвет: {car_data.get("color")}
            Тип двигателя: {car_data.get("engineType")}, {car_data.get("engineVolume")} л, {car_data.get("enginePower")} л.с.
            Коробка передач: {car_data.get("transmission")}
            Пробег: {car_data.get("mileage")} км
            Цена: {car_data.get("price")} руб.
            Доп. информация: {car_data.get("additionalInfo", "Нет")}
        Ты должен кратко и точно отвечать на вопросы пользователя об этой конкретной машине.
        Если пользователь начнет задавать вопросы не про автомобильную сферу, 
        скажи ему, что ты помощник-продавец только автомобилей, обсуждаешь только эту тему!
        Ни в коем случае, не отвечай на вопросы не про автомобильную тему!"""

from langchain_gigachat.chat_models import GigaChat
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver

def init_model():
    model = GigaChat(
            model="GigaChat",
            verify_ssl_certs=False
        )
    return model

def create_agent(model, prompt):
    return create_react_agent(
        model,
        tools=[],
        checkpointer=MemorySaver(),
        state_modifier=prompt
    )
