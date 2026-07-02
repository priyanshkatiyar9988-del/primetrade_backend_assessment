import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../../services/taskService";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await getTasks();

      const data = res.data?.data || res.data?.tasks || res.data;

      setTasks(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load tasks");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await deleteTask(id);
      toast.success("Task deleted");
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="dashboard">

      <nav className="navbar">
        <h2>Task Manager</h2>

        <div className="nav-right">
          <span>👋 {user?.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-header">
        <div>
          <h1>Welcome Back 👋</h1>
          <p>Manage your daily tasks efficiently.</p>
        </div>

        <Link to="/tasks/create">
          <button className="create-btn">+ Create Task</button>
        </Link>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : tasks.length === 0 ? (
        <div className="empty">
          <h2>No Tasks Found</h2>
          <p>Create your first task.</p>
        </div>
      ) : (
        <div className="task-grid">

          {tasks.map((task) => (

            <div className="task-card" key={task._id}>

              <h3>{task.title}</h3>

              <p>{task.description}</p>

              <div className="task-buttons">

                <Link to={`/tasks/${task._id}`}>
                  <button className="view">View</button>
                </Link>

                <Link to={`/tasks/edit/${task._id}`}>
                  <button className="edit">Edit</button>
                </Link>

                <button
                  className="delete"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default Dashboard;