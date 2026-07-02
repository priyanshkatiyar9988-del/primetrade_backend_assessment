import api from "./api";

// Get all tasks
export const getTasks = () => {
  return api.get("/tasks");
};

// Get single task
export const getTaskById = (id) => {
  return api.get(`/tasks/${id}`);
};

// Create task
export const createTask = (data) => {
  return api.post("/tasks", data);
};

// Update task
export const updateTask = (id, data) => {
  return api.put(`/tasks/${id}`, data);
};

// Delete task
export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};