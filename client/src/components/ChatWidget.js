import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/ChatWidget.css";

export default function ChatWidget({ carId, userId }) {
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [input, setInput] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Проверка авторизации
  useEffect(() => {
    // Проверяем, что userId существует и не пустой
    setIsAuthenticated(userId && userId.trim && userId.trim() !== '');
  }, [userId]);

  const initChat = async () => {
    try {
      // Fetch car data from backend
      const carResponse = await axios.get(`http://194.87.146.152:4000/api/cars/${carId}`);
      const carData = {
        ...carResponse.data,
        userId
      };

      // Initialize chat with fetched car data
      const res = await fetch("http://ai-service-petros607.amvera.io/create_chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carData),
      });
      const data = await res.json();
      if (data.chatId) {
        setChatId(data.chatId);
        setInitialized(true);
        setMessages([{
          role: "assistant",
          text: "Привет! Я ваш AI-ассистент. Чем могу помочь с этим автомобилем?"
        }]);
      }
    } catch (err) {
      console.error("Chat initialization failed:", err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !chatId) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch(`http://ai-service-petros607.amvera.io/chat?chatid=${chatId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carId, userId, message: input }),
      });
      const data = await res.json();
      const botMsg = { role: "assistant", text: data.response };
      setMessages((prev) => [...prev, botMsg]);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error("Message sending failed:", err);
      setMessages((prev) => [...prev, {
        role: "assistant",
        text: "Извините, не удалось обработать ваш запрос. Пожалуйста, попробуйте снова."
      }]);
    }
  };

  return (
    <div className="chat-widget">
      <div className="chat-header">💬 AI-Ассистент</div>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <img
              src={msg.role === "user" ? "/user-icon.svg" : "/ai-icon.svg"}
              alt={msg.role}
              className="message-icon"
            />
            <div className="text">{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {!initialized ? (
        <div className="chat-init">
          {isAuthenticated ? (
            <button onClick={initChat} className="init-button">Запустить ассистента</button>
          ) : (
            <div className="auth-message">
              <p>Авторизуйтесь, чтобы использовать AI-ассистента</p>
              <Link to="/auth" className="auth-link">Войти в аккаунт</Link>
            </div>
          )}
        </div>
      ) : (
        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Введите ваш вопрос..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>▶</button>
        </div>
      )}
    </div>
  );
} 