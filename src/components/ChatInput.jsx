import { useState } from 'react';
import { Chatbot } from '../utils/chatbot';

export default function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    setInputText(e.target.value);
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) 
      return;
    
    setIsLoading(true);
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];
    setChatMessages(newChatMessages);
    
    try {
      const response = await Chatbot.getResponse(inputText);
      setChatMessages([
        ...newChatMessages,
        {
          message: response,
          sender: 'robot',
          id: crypto.randomUUID()
        }
      ]);
      setInputText(''); // Clear input after successful send
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      setChatMessages([
        ...newChatMessages,
        {
          message: "Sorry, I encountered an error while processing your request.",
          sender: 'robot',
          id: crypto.randomUUID()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-100">
      <div className="flex max-w-3xl gap-2 mx-auto">
        <input
          type="text"
          placeholder={isLoading ? "Getting response..." : "Type your message to Chatbot"}
          value={inputText}
          disabled={isLoading}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#198754]"
        />
        <button 
          onClick={handleSendMessage}
          disabled={isLoading}
          className={`px-4 py-2 text-white rounded-lg transition-colors 
          ${
            isLoading 
            ? 'bg-[#0e5132] cursor-not-allowed' 
            : 'bg-[#198754] hover:bg-[#2ac67d]'
          }`
         }
        >
        {isLoading 
          ? 'Sending...' 
          : 'Send'
        }
        </button>
      </div>
    </div>
  );
}
