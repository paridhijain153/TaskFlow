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
    <div className="min-h-screen bg-[#f5f7fb]">

      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">
              Total Tasks
            </p>

            <h2 className="text-4xl font-bold mt-3 text-indigo-600">
              {tasks.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">
              In Progress
            </p>

            <h2 className="text-4xl font-bold mt-3 text-yellow-500">
              {inProgressTasks.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">
              Completed
            </p>

            <h2 className="text-4xl font-bold mt-3 text-green-500">
              {completedTasks.length}
            </h2>
          </div>

        </div>

        {/* Task Form */}
        <TaskForm fetchTasks={fetchTasks} />

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

          {/* Todo Column */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 min-h-[600px]">

            <div className="flex items-center justify-between mb-6">

              <h3 className="text-2xl font-bold text-blue-600">
                Todo
              </h3>

              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                {todoTasks.length}
              </span>

            </div>

            {
              todoTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-24 text-gray-400">
                  <p className="text-6xl mb-4">📋</p>
                  <p>No tasks available</p>
                </div>
              ) : (
                todoTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    fetchTasks={fetchTasks}
                  />
                ))
              )
            }

          </div>

          {/* In Progress Column */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 min-h-[600px]">

            <div className="flex items-center justify-between mb-6">

              <h3 className="text-2xl font-bold text-yellow-500">
                In Progress
              </h3>

              <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
                {inProgressTasks.length}
              </span>

            </div>

            {
              inProgressTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-24 text-gray-400">
                  <p className="text-6xl mb-4">🚀</p>
                  <p>No active tasks</p>
                </div>
              ) : (
                inProgressTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    fetchTasks={fetchTasks}
                  />
                ))
              )
            }

          </div>

          {/* Completed Column */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 min-h-[600px]">

            <div className="flex items-center justify-between mb-6">

              <h3 className="text-2xl font-bold text-green-600">
                Completed
              </h3>

              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                {completedTasks.length}
              </span>

            </div>

            {
              completedTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-24 text-gray-400">
                  <p className="text-6xl mb-4">✅</p>
                  <p>No completed tasks</p>
                </div>
              ) : (
                completedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    fetchTasks={fetchTasks}
                  />
                ))
              )
            }

          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;