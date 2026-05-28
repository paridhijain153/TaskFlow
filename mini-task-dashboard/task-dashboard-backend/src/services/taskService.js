const prisma = require("../prisma/prismaClient");

const createTask = async (taskData) => {
  const task = await prisma.task.create({
    data: taskData,
  });

  return task;
};

const getAllTasks = async (userId) => {
  const tasks = await prisma.task.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return tasks;
};

const getTaskById = async (taskId, userId) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  return task;
};

const updateTask = async (taskId, userId, updateData) => {
  // Check ownership first
  const existingTask = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!existingTask) {
    throw new Error("Task not found or unauthorized");
  }

  const updatedTask = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: updateData,
  });

  return updatedTask;
};

const deleteTask = async (taskId, userId) => {
  // Check ownership first
  const existingTask = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!existingTask) {
    throw new Error("Task not found or unauthorized");
  }

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