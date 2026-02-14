'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import ChatWindow from '@/components/common/chat/ChatWindow';
import { useAuth } from '@/hooks/useAuth';
import { useChat } from '@/hooks/useChat';

export default function ChatPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    messages,
    loading,
    loadingMessages,
    error,
    conversationId,
    conversations,
    sendMessage,
    retry,
    startNewConversation,
    setCurrentConversationId,
    deleteConversation,
  } = useChat({ userId: user?.id, loadConversationList: true });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('auth_user');
      }
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleDeleteConversation = async (e: React.MouseEvent, convId: number) => {
    e.stopPropagation();
    if (window.confirm('Delete this conversation?')) {
      await deleteConversation(convId);
      setSidebarOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated || !user?.id) return null;

  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col bg-black text-white overflow-hidden">

        {/* Top Bar */}
        <header className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/70 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className="lg:hidden p-2 rounded-lg text-zinc-400 hover:bg-white/10"
            >
              ☰
            </button>

            <Link href="/dashboard/chat" className="text-lg font-semibold">
              Chat Bot
            </Link>

            <Link
              href="/dashboard"
              className="hidden sm:block text-sm text-zinc-400 hover:text-white transition"
            >
              Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-3 text-sm text-zinc-400">
            <span>{user.username}</span>
            <Link
              href="/dashboard"
              className="p-2 rounded-md hover:bg-white/10 transition"
            >
              ←
            </Link>
          </div>
        </header>

        <div className="flex-1 flex min-h-0">

          {/* Sidebar */}
          <aside
            className={`
              flex flex-col bg-black/60 backdrop-blur-xl border-r border-white/10
              w-[280px] sm:w-[30%] max-w-sm
              fixed lg:relative inset-y-0 left-0 z-30
              transform transition-transform duration-200
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
          >
            <div className="p-4 border-b border-white/10">
              <h2 className="text-xs uppercase tracking-wider text-zinc-500">
                Conversations
              </h2>
            </div>

            <button
              onClick={() => { startNewConversation(); setSidebarOpen(false); }}
              className="mx-4 mt-4 rounded-lg bg-white text-black px-4 py-2 text-sm font-medium hover:bg-zinc-200 transition"
            >
              + New Chat
            </button>

            <div className="flex-1 overflow-y-auto mt-4 px-3 space-y-1">
              {conversations.length === 0 && !loadingMessages && (
                <p className="text-sm text-zinc-500 px-2 py-4">
                  No conversations yet
                </p>
              )}

              {conversations.map((c) => (
                <div
                  key={c.id}
                  className={`group flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer transition ${
                    conversationId === c.id
                      ? 'bg-white/10'
                      : 'hover:bg-white/5'
                  }`}
                  onClick={() => {
                    setCurrentConversationId(c.id);
                    setSidebarOpen(false);
                  }}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      CHAT {c.id}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {new Date(c.updated_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  <button
                    onClick={(e) => handleDeleteConversation(e, c.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-red-400 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10 text-xs text-zinc-500">
              {user.username}
            </div>
          </aside>

          {/* Overlay (mobile) */}
          {sidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black/70 z-20"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Chat Area */}
          <main className="flex-1 flex flex-col min-w-0 min-h-0 bg-black">
            <ChatWindow
              messages={messages}
              loading={loading}
              loadingMessages={loadingMessages}
              error={error}
              sendMessage={sendMessage}
              retry={retry}
              chatLayout="full"
            />
          </main>

        </div>
      </div>
    </ProtectedRoute>
  );
}
