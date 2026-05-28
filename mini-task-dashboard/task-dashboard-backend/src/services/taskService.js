const prisma = require("../prisma/prismaClient");

const createTask = async (taskData) => {
  const task = await prisma.task.create({
    data: taskData,
  });

  return task;
};

const getAllTasks = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return tasks;
};


const getTaskById = async (taskId) => {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  return task;
};

const updateTask = async (taskId, updateData) => {
  const updatedTask = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: updateData,
  });

  return updatedTask;
};

const deleteTask = async (taskId) => {
  const deletedTask = await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  return deletedTask;
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};