const { z } = require("zod");

const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .optional(),

  status: z.enum([
    "TODO",
    "IN_PROGRESS",
    "DONE",
  ]),

  progress: z
    .number()
    .min(0)
    .max(100),

  dueDate: z
    .string()
    .optional(),
});

module.exports = {
  taskSchema,
};