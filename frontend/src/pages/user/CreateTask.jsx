import { useState } from "react";
import { createTask } from "../../services/taskService";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const CreateTask = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createTask(formData);

      toast.success("Task Created Successfully 🎉");

      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create task"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-task-page">

      <div className="task-form-card">

        <div className="task-header">
          <h2>Create New Task</h2>
          <p>Organize your work by adding a new task.</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Task Title</label>

            <input
              type="text"
              name="title"
              placeholder="Enter task title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Description</label>

            <textarea
              rows="6"
              name="description"
              placeholder="Write task description..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="task-buttons">

            <Link to={user?.role === "admin" ? "/admin/dashboard" : "/"}>
              <button
                type="button"
                className="cancel-btn"
              >
                Cancel
              </button>
            </Link>

            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Task"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CreateTask;