import { Task } from '../../types/task';

interface TaskCardProps {
  task: Task;
  onToggle: (taskId: number) => void;
  onDelete: () => void;
  onEdit: () => void;
}

export default function TaskCard({
  task,
  onToggle,
  onDelete,
  onEdit,
}: TaskCardProps) {
  return (
    <li className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl px-5 py-5 shadow-lg hover:shadow-2xl hover:border-white/20 transition">
      <div className="flex items-start justify-between gap-4">
        
        {/* Left Section */}
        <div className="flex items-start gap-4">
          
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-black text-white focus:ring-white/20"
          />

          <div>
            {/* ID + Title */}
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold border border-white/15 bg-white/5 text-zinc-300"
                title="Use in chat: e.g. 'delete task 5' or 'complete task 5'"
              >
                ID {task.id}
              </span>

              <p
                className={`text-sm font-medium ${
                  task.completed
                    ? 'line-through text-zinc-500'
                    : 'text-white'
                }`}
              >
                {task.title}
              </p>
            </div>

            {/* Description */}
            {task.description && (
              <p
                className={`mt-2 text-sm ${
                  task.completed
                    ? 'line-through text-zinc-600'
                    : 'text-zinc-400'
                }`}
              >
                {task.description}
              </p>
            )}

            {/* Date */}
            <p className="mt-3 text-xs text-zinc-600">
              Updated {new Date(task.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          
          <button
            onClick={onEdit}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-white/15 text-zinc-300 hover:bg-white hover:text-black transition"
          >
            Edit
          </button>

          <button
            onClick={onDelete}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition"
          >
            Delete
          </button>

        </div>
      </div>
    </li>
  );
}
