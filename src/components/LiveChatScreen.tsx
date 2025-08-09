import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import { Send, Paperclip, Phone, Video, Star } from 'lucide-react';
import { ChatMessage, Expert } from '../types';

interface LiveChatScreenProps {
  onBack: () => void;
  expert?: Expert;
}

export default function LiveChatScreen({ onBack, expert }: LiveChatScreenProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: 'expert1',
      senderName: 'Ahmed Al-Mechanic',
      senderType: 'expert',
      message: 'Hello! I\'m Ahmed, a certified automotive expert. How can I help you today?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentExpert: Expert = expert || {
    id: 'expert1',
    name: 'Ahmed Al-Mechanic',
    specialization: 'Engine & Transmission',
    rating: 4.9,
    isOnline: true
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'user1',
      senderName: 'You',
      senderType: 'user',
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate expert response
    setTimeout(() => {
      const expertResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: currentExpert.id,
        senderName: currentExpert.name,
        senderType: 'expert',
        message: 'I understand your concern. Can you provide more details about when this issue started?',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, expertResponse]);
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header title="Live Chat" showBack onBack={onBack} showNotifications={false} />
      
      {/* Expert Info */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary font-semibold">
              {currentExpert.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{currentExpert.name}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{currentExpert.specialization}</span>
              <div className="flex items-center">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 ml-1">{currentExpert.rating}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-green-500 text-white rounded-full">
              <Phone size={16} />
            </button>
            <button className="p-2 bg-blue-500 text-white rounded-full">
              <Video size={16} />
            </button>
          </div>
        </div>
        {currentExpert.isOnline && (
          <div className="flex items-center mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-green-600">Online now</span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderType === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.senderType === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}
            >
              <p className="text-sm">{message.message}</p>
              <p className={`text-xs mt-1 ${
                message.senderType === 'user' ? 'text-white/70' : 'text-gray-500'
              }`}>
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-3 bg-primary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}