import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getTaskById, deleteTask } from "../../services/taskService";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const ViewTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {
    try {
      const res = await getTaskById(id);

      const data = res.data?.data || res.data?.task || res.data;

      setTask(data);
    } catch (error) {
      toast.error("Failed to load task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await deleteTask(id);
      toast.success("Task deleted successfully");
       if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (loading)
    return (
      <div className="loading-page">
        <h2>Loading Task...</h2>
      </div>
    );

  if (!task)
    return (
      <div className="loading-page">
        <h2>Task Not Found</h2>
      </div>
    );

  return (
    <div className="view-task-page">

      <div className="view-task-card">

        <div className="view-header">

          <h2>{task.title}</h2>

          <span className={`status ${task.status?.toLowerCase() || "pending"}`}>
            {task.status || "Pending"}
          </span>

        </div>

        <div className="task-info">

          <h4>Description</h4>

          <p>{task.description}</p>

        </div>

        <div className="task-meta">

          <div>
            <strong>Created</strong>
            <p>{new Date(task.createdAt).toLocaleString()}</p>
          </div>

          <div>
            <strong>Updated</strong>
            <p>{new Date(task.updatedAt).toLocaleString()}</p>
          </div>

        </div>

        <div className="view-buttons">

          <Link to={`/tasks/edit/${task._id}`}>
            <button className="edit-btn">
              Edit
            </button>
          </Link>

          <button
            className="delete-btn"
            onClick={handleDelete}
          >
            Delete
          </button>

          <button
            className="back-btn"
            onClick={() => navigate(user?.role === "admin" ? "/admin/dashboard" : "/")}
          >
            Back
          </button>

        </div>

      </div>

    </div>
  );
};

export default ViewTask;