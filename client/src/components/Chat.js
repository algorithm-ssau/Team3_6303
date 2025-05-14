import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001';

const Chat = ({ carId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const userId = useRef('user-' + Math.random().toString(36).substr(2, 9));
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Initialize chat session
        await axios.post(`${API_BASE_URL}/create_chat`, {
          userId: userId.current,
          carId
        });

        // Load chat history
        const response = await axios.get(`${API_BASE_URL}/chat_history?chatid=${carId}${userId.current}`);
        if (response.data.history) {
          setMessages(response.data.history);
        }
      } catch (error) {
        console.error('Failed to initialize chat:', error);
        setError('Не удалось подключиться к чату. Пожалуйста, попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  }, [carId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    setIsLoading(true);
    setError(null);

    // Optimistically add user message
    setMessages(prev => [...prev, { role: 'user', text: message }]);

    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        userId: userId.current,
        carId,
        message
      });

      if (response.data.response) {
        setMessages(prev => [...prev, { role: 'assistant', text: response.data.response }]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Не удалось отправить сообщение. Пожалуйста, попробуйте еще раз.');
      // Remove the optimistically added message
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 w-[380px] bg-white rounded-xl shadow-2xl transition-all duration-300 ${isMinimized ? 'h-[60px]' : 'h-[600px]'}`}>
      {/* Header */}
      <div 
        className="bg-blue-600 p-4 rounded-t-xl flex justify-between items-center cursor-pointer"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <div>
            <h3 className="text-lg font-semibold text-white">AI Помощник</h3>
            {!isMinimized && <p className="text-blue-100 text-sm">Задайте вопрос об этом автомобиле</p>}
          </div>
        </div>
        <button className="text-white hover:bg-blue-700 rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform ${isMinimized ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Chat content - only shown when not minimized */}
      {!isMinimized && (
        <>
          <div className="h-[460px] overflow-y-auto p-6 bg-gray-50">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}
            
            {messages.length === 0 && !isLoading && !error && (
              <div className="text-center text-gray-500 py-8">
                <p>Начните диалог, задав вопрос об автомобиле</p>
              </div>
            )}
            
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    rounded-2xl p-4 max-w-[80%] shadow-sm
                    ${msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white rounded-bl-none border border-gray-100'}
                  `}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white shadow-sm rounded-2xl rounded-bl-none p-4 border border-gray-100">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-white border-t rounded-b-xl">
            <div className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Введите ваш вопрос..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 flex items-center gap-2"
              >
                <span>Отправить</span>
                {isLoading && (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Chat; 