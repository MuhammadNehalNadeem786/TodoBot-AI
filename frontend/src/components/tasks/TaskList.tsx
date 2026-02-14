'use client';

import { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { useTasks } from '../../hooks/useTasks';
import { Task } from '../../types/task';

interface TaskListProps {
  userId: string;
  refreshKey?: number;
}

export default function TaskList({ userId, refreshKey }: TaskListProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const {
    tasks,
    loading,
    error,
    addTask,
    updateTaskById,
    toggleCompletion,
    removeTask,
    fetchTasks,
  } = useTasks();

  useEffect(() => {
    if (typeof refreshKey === 'number' && refreshKey > 0) {
      fetchTasks();
    }
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-14">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden text-white">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
        <div>
          <h3 className="text-lg font-semibold">
            Your Tasks
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            Create, update and track your work. In chat you can say
            &nbsp;"delete task 5" or "complete task 5".
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(prev => !prev);
            setEditingTask(null);
          }}
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200 transition shadow-lg"
        >
          {showForm ? 'Cancel' : '+ Add Task'}
        </button>
      </div>

      {/* Form Section */}
      {(showForm || editingTask) && (
        <div className="px-6 py-6 border-b border-white/10 bg-black/40">
          <TaskForm
            userId={userId}
            initialData={editingTask ?? undefined}
            onSubmit={async data => {
              if (editingTask) {
                await updateTaskById(editingTask.id, data);
                setEditingTask(null);
              } else {
                await addTask(data);
                setShowForm(false);
              }
            }}
            onCancel={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
          />
        </div>
      )}

      {/* Empty State */}
      {tasks.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-zinc-500 text-sm">
            No tasks yet. Start by adding your first task ✨
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-white/10">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleCompletion}
              onDelete={() => removeTask(task.id)}
              onEdit={() => {
                setEditingTask(task);
                setShowForm(false);
              }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
