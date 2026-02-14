import { useState, useEffect } from 'react';
import { CreateTaskRequest, Task } from '../../types/task';

interface TaskFormProps {
  userId: string;
  onSubmit: (taskData: CreateTaskRequest) => void;
  onCancel: () => void;
  initialData?: Task;
}

export default function TaskForm({
  userId,
  onSubmit,
  onCancel,
  initialData,
}: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description ?? '');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (title.length > 255) {
      setError('Title must be 255 characters or less');
      return;
    }

    if (description.length > 1000) {
      setError('Description must be 1000 characters or less');
      return;
    }

    setError('');
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      user_id: userId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-white">

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-400 font-medium">{error}</p>
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block text-xs text-zinc-400 mb-2 tracking-wide">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="e.g. Finish dashboard UI"
          className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-white placeholder-zinc-500
                     focus:border-white/40 focus:ring-2 focus:ring-white/10 outline-none transition"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs text-zinc-400 mb-2 tracking-wide">
          Description
        </label>
        <textarea
          rows={4}
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Optional details about this task…"
          className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-white placeholder-zinc-500
                     focus:border-white/40 focus:ring-2 focus:ring-white/10 outline-none transition resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/10 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200 transition shadow-lg"
        >
          {initialData ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
}
