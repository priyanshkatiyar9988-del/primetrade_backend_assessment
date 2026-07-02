import api from "./api";

export const getUsers = () => {
  return api.get("/api/users");
};

export const deleteUser = (id) => {
  return api.delete(`/api/users/${id}`);
};