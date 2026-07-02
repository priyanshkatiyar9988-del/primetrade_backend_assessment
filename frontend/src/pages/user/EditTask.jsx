import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getTaskById, updateTask } from "../../services/taskService";
import toast from "react-hot-toast";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchTask = async () => {
    try {
      const res = await getTaskById(id);

      const data = res.data?.data || res.data?.task || res.data;

      setFormData({
        title: data.title,
        description: data.description,
      });
    } catch (error) {
      toast.error("Failed to load task");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

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

      await updateTask(id, formData);

      toast.success("Task Updated Successfully 🎉");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="loading-page">
        <h2>Loading Task...</h2>
      </div>
    );
  }

  return (
    <div className="edit-task-page">

      <div className="edit-task-card">

        <div className="edit-header">
          <h2>Edit Task</h2>
          <p>Update your task information.</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Task Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="input-group">
            <label>Description</label>

            <textarea
              rows="6"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              required
            />
          </div>

          <div className="edit-buttons">

            <Link to="/">
              <button
                type="button"
                className="cancel-btn"
              >
                Cancel
              </button>
            </Link>

            <button
              className="update-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Task"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditTask;