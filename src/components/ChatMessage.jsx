export default function ChatMessage({ message, sender }) {
  return (
    <div className={`flex items-start gap-2 mb-4 ${
      sender === 'user' ? 'flex-row-reverse' : 'flex-row'
    }`}>
      <img
        src={`/images/${sender}.png`}
        alt={sender}
        className="w-8 h-8 rounded-full"
      />
      <div className={`py-2 px-4 rounded-lg max-w-[70%] ${
        sender === 'user'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-800'
      }`}>
        {message}
      </div>
    </div>
  );
}
