import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";

import api from "../services/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");

      setTasks(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const todoTasks = tasks.filter(
    (task) => task.status === "TODO"
  );

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <TaskForm fetchTasks={fetchTasks} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-5 min-h-[500px]">
            <h3 className="text-lg font-semibold mb-4 text-blue-600">
              Todo ({todoTasks.length})
            </h3>
            {todoTasks.map((task) => (
 <TaskCard
  key={task.id}
  task={task}
  fetchTasks={fetchTasks}
/>
))}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 min-h-[500px]">
            <h3 className="text-lg font-semibold mb-4 text-yellow-600">
              In Progress ({inProgressTasks.length})
            </h3>
            {inProgressTasks.map((task) => (
  <TaskCard
  key={task.id}
  task={task}
  fetchTasks={fetchTasks}
/>
))}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 min-h-[500px]">
            <h3 className="text-lg font-semibold mb-4 text-green-600">
              Completed ({completedTasks.length})
            </h3>
            {completedTasks.map((task) => (
  <TaskCard
  key={task.id}
  task={task}
  fetchTasks={fetchTasks}
/>
))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;