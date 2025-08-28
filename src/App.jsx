import { useState } from 'react'
import ChatMessages from './components/ChatMessages'
import ChatInput from './components/ChatInput'
import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState([
    { 
      message: "hello chatbot", 
      sender: "user",
      id: '1'
    },
    { 
      message: "Hello! How can I help you?", 
      sender: "robot",
      id: '2'
    }
  ]);

  return (
    <div className="flex flex-col h-screen bg-white">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput 
        chatMessages={chatMessages} 
        setChatMessages={setChatMessages} 
      />
    </div>
  )
}

export default App
