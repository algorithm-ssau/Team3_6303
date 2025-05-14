from fastapi import FastAPI, Request, Query, Body, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel, RootModel
from typing import Optional, List, Dict, Union
from fastapi.middleware.cors import CORSMiddleware

import time
import os
from dotenv import load_dotenv

from ai_module import generate_car_prompt, create_agent, init_model

app = FastAPI()
load_dotenv()

# Разрешаем CORS со всех доменов, IP и портов
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # <- ВСЕ источники
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CREDENTIALS = os.getenv("CREDENTIALS")
model = init_model(CREDENTIALS)

chat_sessions: Dict[str, dict] = {}
chat_logs: Dict[str, List[Dict[str, str]]] = {}
SESSION_TTL = 600

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(chatid: str = Query(...), request: ChatRequest = Body(...)):
    if not chatid:
        raise HTTPException(status_code=400, detail="Параметр chatid обязателен.")

    question = request.message.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Пустое сообщение.")

    session = chat_sessions.get(chatid)
    if session is None:
        raise HTTPException(status_code=400, detail="Сессия чата не найдена. Сначала инициализируйте чат.")

    agent = session.get("agent")
    config = {"configurable": {"thread_id": chatid}}

    response = agent.invoke({"messages": [("user", question)]}, config=config)
    answer = response["messages"][-1].content

    chat_logs.setdefault(chatid, []).append({"role": "user", "text": question})
    chat_logs[chatid].append({"role": "assistant", "text": answer})

    time.sleep(1)

    return JSONResponse(content={"response": answer})

class CreateChatRequest(RootModel[dict]):
    pass

@app.post("/create_chat")
async def create_chat(data: CreateChatRequest):
    clean_expired_sessions()
    
    if check_chat_limit():
        raise HTTPException(status_code=429, detail="Превышен лимит чатов для веб-приложения")

    user_id = data.root.get("userId")
    car_id = data.root.get("_id")

    if not user_id or not car_id:
        raise HTTPException(status_code=400, detail="Не указан userId или carId")

    chat_id = f"{car_id}{user_id}"

    if chat_id in chat_sessions:
        return JSONResponse(content={"chatId": chat_id})

    prompt = generate_car_prompt(data.root)
    chat_sessions[chat_id] = {
        "agent": create_agent(model, prompt),
        "created_at": time.time()
    }

    return JSONResponse(content={"chatId": chat_id})


@app.get("/chat_history")
async def chat_history(chatid: str = Query(...)):
    if chatid == "all":
        return JSONResponse(content={"allhistory": chat_logs})

    history = chat_logs.get(chatid, [])
    return JSONResponse(content={"history": history})


def clean_expired_sessions():
    now = time.time()
    expired = [
        chat_id for chat_id, data in chat_sessions.items()
        if now - data["created_at"] > SESSION_TTL
    ]
    for chat_id in expired:
        del chat_sessions[chat_id]


def check_chat_limit() -> bool:
    return len(chat_sessions) > 5


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", port=5001, reload=True)
