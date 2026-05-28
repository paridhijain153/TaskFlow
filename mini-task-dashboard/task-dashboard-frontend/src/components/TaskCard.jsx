
import { useState } from "react";
import api from "../services/api";

const TaskCard = ({ task, fetchTasks }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [progress, setProgress] = useState(
    Number(task.progress) || 0
  );

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${task.id}`);

      fetchTasks();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const handleUpdate = async () => {
    let updatedStatus = "TODO";

    if (progress === 100) {
      updatedStatus = "COMPLETED";
    } else if (progress > 0) {
      updatedStatus = "IN_PROGRESS";
    }

    try {
      await api.put(`/tasks/${task.id}`, {
        ...task,
        progress,
        status: updatedStatus,
      });

      setIsEditing(false);

      fetchTasks();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-gray-50 border rounded-xl p-4 mb-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">
        {task.title}
      </h3>

      <p className="text-gray-600 text-sm mt-2">
        {task.description}
      </p>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full ${
              (task.progress || 0) === 100
                ? "bg-green-500"
                : "bg-blue-500"
            }`}
            style={{
              width: `${task.progress || 0}%`,
            }}
          ></div>
        </div>

        <p className="text-sm text-gray-600 mt-2">
          Progress: {task.progress || 0}%
        </p>
      </div>

      {/* Due Date + Status */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </span>

        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            task.status === "TODO"
              ? "bg-blue-100 text-blue-600"
              : task.status === "IN_PROGRESS"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {task.status}
        </span>
      </div>

      {/* EDIT MODE */}
      {isEditing && (
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium">
            Update Progress: {progress}%
          </label>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) =>
              setProgress(Number(e.target.value))
            }
            className="w-full"
          />

          <button
            onClick={handleUpdate}
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
          >
            Save Progress
          </button>
        </div>
      )}

      {/* BUTTONS */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>

        <button
          onClick={handleDelete}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;