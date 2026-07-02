import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  getUsers,
  deleteUser as deleteUserService,
} from "../../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await getUsers();

      const data = res.data?.users || res.data?.data || res.data;

      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete User
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUserService(id);

      toast.success("User deleted successfully");

      fetchUsers(); // Refresh List
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>Manage Users</h2>

        <Link to="/admin/dashboard">
          <button className="back-btn">
            ← Back to Dashboard
          </button>
        </Link>
      </div>

      <input
        className="search-box"
        placeholder="Search User..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <h3>Loading Users...</h3>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4">No Users Found</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>
                    <span
                      className={
                        user.role === "admin"
                          ? "badge admin"
                          : "badge user"
                      }
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;