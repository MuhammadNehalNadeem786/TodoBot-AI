'use client';

import { useState, useCallback, FormEvent } from 'react';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  layout?: 'default' | 'chatgpt';
}

export default function ChatInput({
  onSubmit,
  disabled = false,
  placeholder = 'Message...',
  layout = 'default',
}: ChatInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const trimmed = value.trim();
      if (!trimmed || disabled) return;
      onSubmit(trimmed);
      setValue('');
    },
    [value, disabled, onSubmit]
  );

  const isChatGpt = layout === 'chatgpt';

  return (
    <form
      onSubmit={handleSubmit}
      className={
        isChatGpt
          ? 'flex items-center gap-3 p-4 bg-gray-900/90 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-lg'
          : 'flex items-center gap-3 p-4 bg-black border-t border-gray-700'
      }
    >
      {/* Input Field */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`flex-1 rounded-2xl px-4 py-3 text-sm text-white transition 
          bg-black/70 placeholder-gray-300
          border border-gray-600
          focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1
          disabled:bg-gray-800 disabled:cursor-not-allowed
          backdrop-blur-sm
          ${isChatGpt ? 'bg-black/50 border-gray-600 focus:ring-gray-400' : ''}
        `}
        aria-label="Chat message"
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className={`rounded-2xl px-4 py-3 text-sm font-medium text-white
          bg-gradient-to-b from-gray-700 to-gray-800
          hover:from-gray-600 hover:to-gray-700
          shadow-lg hover:shadow-xl
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200 transform hover:scale-105
          flex items-center justify-center
        `}
      >
        {isChatGpt ? (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9 2zm0 0v-8"
            />
          </svg>
        ) : (
          'Send'
        )}
      </button>
    </form>
  );
}
