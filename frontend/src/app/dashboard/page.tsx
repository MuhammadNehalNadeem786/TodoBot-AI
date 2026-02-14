'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import TaskList from '../../components/tasks/TaskList';
import ChatWindow from '../../components/common/chat/ChatWindow';
import { useAuth } from '../../hooks/useAuth';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [chatOpen, setChatOpen] = useState(false);
  const [tasksRefreshKey, setTasksRefreshKey] = useState(0);

  const closeChat = () => {
    setChatOpen(false);
    setTasksRefreshKey((k) => k + 1);
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('auth_user');
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.05),_transparent_60%)] text-white flex flex-col">
        
        {/* Navbar */}
        <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-black/60 backdrop-blur-xl">
          <div className="text-lg font-semibold tracking-wide">
            Todo<span className="text-zinc-500">.</span>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <Link
              href="/dashboard/chat"
              className="text-zinc-400 hover:text-white transition"
            >
              Chat
            </Link>

            <span className="text-zinc-400">
              Welcome, <span className="text-white font-medium">{user?.username}</span>
            </span>

            <button
              onClick={async () => {
                await logout();
                router.push('/login');
              }}
              className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white hover:bg-white hover:text-black transition"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Main */}
        <main className="flex-grow px-6 py-12">
          <div className="max-w-5xl mx-auto">
            
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-4xl font-bold tracking-tight">
                Task Dashboard
              </h1>
              <p className="text-zinc-400 mt-3">
                Manage your tasks and stay productive
              </p>
            </div>

            {/* Task List Card */}
            <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl p-6">
              <TaskList userId={user?.id || ''} refreshKey={tasksRefreshKey} />
            </div>
          </div>
        </main>

        {/* Floating Chat Button */}
        <button
          type="button"
          onClick={() => setChatOpen(true)}
          className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-2xl hover:scale-105 transition"
          aria-label="Open chat assistant"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>

        {/* Chat Modal */}
        {chatOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              onClick={closeChat}
            />

            <div className="fixed bottom-6 right-6 z-50 flex h-[520px] w-[420px] max-w-[calc(100vw-3rem)] flex-col rounded-2xl border border-white/10 bg-black/90 shadow-2xl overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <span className="text-sm font-semibold">
                  AI Assistant
                </span>

                <button
                  type="button"
                  onClick={closeChat}
                  className="rounded-md p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 min-h-0 flex flex-col">
                <ChatWindow
                  userId={user?.id || ''}
                  embedded
                  onResponse={(res) => {
                    if (res.tool_calls?.length)
                      setTasksRefreshKey((k) => k + 1);
                  }}
                />
              </div>

            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
