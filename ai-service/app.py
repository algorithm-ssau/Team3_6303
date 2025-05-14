from flask import Flask, request, jsonify
import time

from ai_module import generate_car_prompt, create_agent, init_model

app = Flask(__name__)
model = init_model()

chat_sessions = {}  # {chat_id: {"agent": ..., "created_at": ...}}
chat_logs = {}      # {chat_id: [{"role": "user"/"assistant", "text": "..."}]}
SESSION_TTL = 600


@app.route("/chat", methods=["POST"])
def chat():
    """
    Обработка сообщений от пользователя в рамках чата.
    Получает сообщение от пользователя, передаёт его агенту и возвращает ответ.
    Запрос JSON:
        {
            "userId": "<user_id>",
            "carId": "<car_id>",
            "message": "<вопрос пользователя>",
            "chatId": "<идентификатор чата>"
        }
    Ответ JSON:
        {
            "response": "<ответ агента>"
        }
    Returns:
        flask.Response: JSON-ответ с ответом агента или ошибкой.
    """
    data = request.json
    user_id = data.get("userId")
    car_id = data.get("carId")
    chat_id = data.get("chatId")

    if not user_id or not car_id or not chat_id:
        return jsonify({"error": "Не указан userId, carId или chatId"}), 400

    question = data.get("message")

    if not question or len(question.strip()) == 0:
        return jsonify({"error": "Пустое сообщение."}), 400

    session = chat_sessions.get(chat_id)
    if session is None:
        return jsonify({"error": "Сессия чата не найдена. Сначала инициализируйте чат."}), 400

    agent = session.get("agent")
    config = {"configurable": {"thread_id": chat_id}}

    response = agent.invoke({"messages": [("user", question)]}, config=config)
    answer = response["messages"][-1].content

    chat_logs.setdefault(chat_id, []).append({"role": "user", "text": question})
    chat_logs[chat_id].append({"role": "assistant", "text": answer})

    time.sleep(1)

    return jsonify({"response": answer})


@app.route("/create_chat", methods=["POST"])
def create_chat():
    """
    Создание новой сессии чата.
    Инициализирует нового агента на основе данных автомобиля и пользователя.
    Запрос JSON:
        {
            "userId": "<user_id>",
            "carId": "<car_id>",
            ... // дополнительные данные для промпта
        }
    Ответ JSON:
        {
            "chatId": "<идентификатор чата>"
        }
    Returns:
        flask.Response: JSON с chatId или сообщением об ошибке.
    """
    clean_expired_sessions()

    if check_chat_limit():
        return jsonify({"error": "Превышен лимит чатов для веб-приложения"}), 429

    data = request.json
    user_id = data.get("userId")
    car_id = data.get("carId")

    if not user_id or not car_id:
        return jsonify({"error": "Не указан userId или carId"}), 400

    chat_id = f"{car_id}{user_id}"

    if chat_id in chat_sessions:
        return jsonify({"chatId": chat_id})

    prompt = generate_car_prompt(data)
    chat_sessions[chat_id] = {
        "agent": create_agent(model, prompt),
        "created_at": time.time()
    }

    return jsonify({"chatId": chat_id})


@app.route("/chat_history", methods=["GET"])
def chat_history():
    """
    Получение истории чата по chatId.
    Параметры запроса:
        chatid: идентификатор чата или "all" для получения всей истории.
    Ответ JSON:
        {
            "history": [...],
            "allhistory": {...}
        }
    Returns:
        flask.Response: История сообщений в чате.
    """
    chat_id = request.args.get("chatid")

    if chat_id == "all":
        return jsonify({"allhistory": chat_logs})

    history = chat_logs.get(chat_id, [])
    return jsonify({"history": history})


def clean_expired_sessions():
    """
    Удаляет устаревшие сессии чатов, превышающие TTL.
    """
    now = time.time()
    expired = [
        chat_id for chat_id, data in chat_sessions.items()
        if now - data["created_at"] > SESSION_TTL
    ]
    for chat_id in expired:
        del chat_sessions[chat_id]


def check_chat_limit():
    """
    Проверяет превышение лимита активных чатов.
    Returns:
        bool: True, если лимит превышен.
    """
    return len(chat_sessions) > 5


if __name__ == "__main__":
    app.run(port=5001)
