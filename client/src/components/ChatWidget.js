import React, { useRef, useState } from "react";
import axios from "axios";
import "./ChatWidget.css";

export default function ChatWidget({ carId, userId }) {
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [input, setInput] = useState("");
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef(null);

  const initChat = async () => {
    try {
      // Fetch car data from backend
      const carResponse = await axios.get(`http://localhost:4000/api/cars/${carId}`);
      const carData = {
        ...carResponse.data,
        userId
      };

      // Initialize chat with fetched car data
      const res = await fetch("http://localhost:5001/create_chat", {
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
          text: "Hello! I'm your AI assistant. How can I help you with this car?"
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
      const res = await fetch(`http://localhost:5001/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carId, userId, message: input, chatId }),
      });
      const data = await res.json();
      const botMsg = { role: "assistant", text: data.response };
      setMessages((prev) => [...prev, botMsg]);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error("Message sending failed:", err);
      setMessages((prev) => [...prev, {
        role: "assistant",
        text: "Sorry, I couldn't process your message. Please try again."
      }]);
    }
  };

  return (
    <div className="chat-widget">
      <div className="chat-header">💬 AI Assistant</div>
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
          <button onClick={initChat} className="init-button">Start AI Assistant</button>
        </div>
      ) : (
        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>▶</button>
        </div>
      )}
    </div>
  );
} 