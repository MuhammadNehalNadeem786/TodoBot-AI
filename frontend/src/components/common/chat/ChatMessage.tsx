'use client';

import type { ChatMessage as ChatMessageType } from '@/types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
  layout?: 'default' | 'chatgpt';
}

export default function ChatMessage({ message, layout = 'default' }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isChatGpt = layout === 'chatgpt';

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} ${isChatGpt ? 'px-2' : 'px-4'}`}
      data-role={message.role}
    >
      <div
        className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 break-words text-[15px] leading-relaxed transition 
          ${
            isChatGpt
              ? isUser
                ? 'bg-gray-700 text-white shadow-lg' // user message (dark accent)
                : 'bg-black/70 text-white border border-gray-700 shadow-md' // assistant message
              : isUser
                ? 'bg-gray-700 text-white shadow-md' // default user
                : 'bg-gray-800 text-white border border-gray-700 shadow-md' // default assistant
          }
        `}
        style={{
          backdropFilter: isChatGpt && !isUser ? 'blur(4px)' : undefined,
        }}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
