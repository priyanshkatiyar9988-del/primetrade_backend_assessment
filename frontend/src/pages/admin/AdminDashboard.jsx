import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getTasks } from "../../services/taskService";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();

      const data = res.data?.data || res.data?.tasks || res.data;

      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="admin-dashboard">

      {/* Navbar */}

      <div className="admin-navbar">

        <h2>Admin Dashboard</h2>

        <div className="admin-right">

          <span>Welcome, {user?.name}</span>

          <button onClick={logout}>Logout</button>

        </div>

      </div>

      {/* Stats */}

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Tasks</h3>
          <h1>{tasks.length}</h1>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <h1>
            {tasks.filter(t => t.status === "completed").length}
          </h1>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <h1>
            {tasks.filter(t => t.status !== "completed").length}
          </h1>
        </div>

      </div>

      {/* Quick Actions */}

      <div className="admin-actions">

        <Link to="/tasks/create">
          <button>Create Task</button>
        </Link>

        <Link to="/admin/tasks">
          <button>Manage Tasks</button>
        </Link>

        <Link to="/admin/users">
          <button>Manage Users</button>
        </Link>

      </div>

      {/* Recent Tasks */}

      <div className="recent-tasks">

        <h3>Recent Tasks</h3>

        {
          tasks.slice(0,5).map(task=>(
            <div className="recent-card" key={task._id}>

              <div>

                <h4>{task.title}</h4>

                <p>{task.description}</p>

              </div>

              <Link to={`/tasks/${task._id}`}>
                <button>View</button>
              </Link>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default AdminDashboard;