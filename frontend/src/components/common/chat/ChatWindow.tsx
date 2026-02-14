'use client';

import { useChat } from '@/hooks/useChat';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import type { ChatMessage as ChatMessageType } from '@/types/chat';
import type { ChatResponse } from '@/types/chat';

export interface ChatWindowControlledProps {
  embedded?: boolean;
  chatLayout?: 'full';
  messages: ChatMessageType[];
  loading: boolean;
  loadingMessages: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
  retry: () => Promise<void>;
}

export interface ChatWindowUncontrolledProps {
  userId: string;
  embedded?: boolean;
  onResponse?: (response: ChatResponse) => void;
}

type ChatWindowProps = ChatWindowControlledProps | ChatWindowUncontrolledProps;

function isControlled(props: ChatWindowProps): props is ChatWindowControlledProps {
  return 'messages' in props && 'sendMessage' in props;
}

export default function ChatWindow(props: ChatWindowProps) {
  const controlled = isControlled(props);
  const embedded = props.embedded ?? false;
  const hookResult = useChat({
    userId: controlled ? undefined : props.userId,
    onResponse: controlled ? undefined : props.onResponse,
    loadConversationList: controlled ? undefined : !embedded,
  });

  const messages = controlled ? props.messages : hookResult.messages;
  const loading = controlled ? props.loading : hookResult.loading;
  const loadingMessages = controlled ? props.loadingMessages : hookResult.loadingMessages;
  const error = controlled ? props.error : hookResult.error;
  const sendMessage = controlled ? props.sendMessage : hookResult.sendMessage;
  const retry = controlled ? props.retry : hookResult.retry;

  const isFullLayout = controlled && props.chatLayout === 'full';
  const wrapperClass = embedded
    ? 'flex flex-col h-full min-h-0 rounded-none bg-gray-900 overflow-hidden'
    : isFullLayout
      ? 'flex flex-col flex-1 min-h-0 bg-gray-900 overflow-hidden'
      : 'flex flex-col h-[calc(100vh-12rem)] min-h-[400px] rounded-2xl bg-gray-900 shadow-xl border border-gray-700 overflow-hidden';

  return (
    <div className={wrapperClass}>
      {/* Messages */}
      <div
        className={`flex-1 min-h-0 overflow-y-auto overflow-x-hidden ${
          isFullLayout ? 'px-2 sm:px-4 py-4 sm:py-6' : 'p-4'
        } space-y-6`}
      >
        {loadingMessages && (
          <p className="text-gray-400 text-sm text-center py-12">Loading conversation...</p>
        )}
        {!loadingMessages && messages.length === 0 && !loading && !error && (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <h2 className="text-xl font-semibold text-white mb-2">How can I help you today?</h2>
            <p className="text-gray-400 text-sm max-w-sm">
              Try &quot;Create a task called Purchase Groceries&quot; or &quot;List my tasks&quot;
            </p>
          </div>
        )}
        {!loadingMessages &&
          messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} layout={isFullLayout ? 'chatgpt' : 'default'} />
          ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-gray-800 px-4 py-3 text-gray-300 text-sm">
              <span className="animate-pulse">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Error + retry */}
      {error && (
        <div className="shrink-0 mx-2 sm:mx-4 mb-2 p-3 rounded-xl bg-red-900/30 border border-red-700 flex items-center justify-between gap-3">
          <p className="text-sm text-red-200 flex-1 min-w-0">{error}</p>
          <button
            type="button"
            onClick={retry}
            className="shrink-0 rounded-lg bg-red-800 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* Input */}
      <div
        className={`shrink-0 ${
          isFullLayout ? 'w-full p-3 sm:p-4 bg-black/50 backdrop-blur-md' : ''
        }`}
      >
        <ChatInput
          onSubmit={sendMessage}
          disabled={loading}
          layout={isFullLayout ? 'chatgpt' : 'default'}
        />
      </div>
    </div>
  );
}
