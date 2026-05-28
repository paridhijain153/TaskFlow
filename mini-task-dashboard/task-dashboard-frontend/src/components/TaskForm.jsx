import { useState } from "react";
import toast from "react-hot-toast";

import api from "../services/api";

const TaskForm = ({ fetchTasks }) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    // Validation
    if (!title || !description || !deadline) {

      toast.error("Please fill all fields");

      return;
    }

    try {

      setLoading(true);

      await api.post("/tasks", {
        title,
        description,
        dueDate: deadline,
        status: "TODO",
        progress: 0,
      });

      // Reset fields
      setTitle("");
      setDescription("");
      setDeadline("");

      // Refresh tasks
      fetchTasks();

      toast.success(
        "Task created successfully"
      );

    } catch (error) {

      toast.error(
        error?.response?.data?.errors?.[0]?.message ||
        error?.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Create New Task
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* Title */}
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none"
        />

        {/* Description */}
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          rows="4"
          className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none resize-none"
        />

        {/* Deadline */}
        <input
          type="date"
          value={deadline}
          onChange={(e) =>
            setDeadline(e.target.value)
          }
          className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none"
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl transition font-semibold shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading
            ? "Creating..."
            : "Create Task"}
        </button>

      </form>
    </div>
  );
};

export default TaskForm;