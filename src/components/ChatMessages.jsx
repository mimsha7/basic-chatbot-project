import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

export default function ChatMessages({ chatMessages }) {
  const chatMessageRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessageRef.current;
    containerElem.scrollTop = containerElem.scrollHeight;
  }, [chatMessages]);

  return (
    <div 
      className="flex-1 overflow-y-auto p-4 pb-24 scrollbar-hide"
      ref={chatMessageRef}
    >
      <div className="max-w-3xl mx-auto">
        {chatMessages.map((chatMessage) => (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        ))}
      </div>
    </div>
  );
}
