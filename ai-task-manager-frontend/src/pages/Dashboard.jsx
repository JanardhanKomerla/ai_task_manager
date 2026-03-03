import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Layout from "../layout/Layout";
import StatCard from "../components/StatCard";
import "../styles/dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [stats, setStats] = useState(null);

  const [sortBy, setSortBy] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [sortBy, statusFilter, categoryFilter, priorityFilter]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = [];

      if (sortBy) query.push(`sortBy=${sortBy}`);
      if (statusFilter) query.push(`status=${statusFilter}`);
      if (categoryFilter) query.push(`category=${categoryFilter}`);
      if (priorityFilter) query.push(`priority=${priorityFilter}`);

      const queryString = query.length ? `?${query.join("&")}` : "";

      const response = await api.get(`/tasks${queryString}`);
      setTasks(response.data);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get("/tasks/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      await api.post("/tasks", {
        ...taskData,
        status: "TODO",
      });
      fetchTasks();
      fetchStats();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
      fetchStats();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = async (id, updatedData) => {
    try {
      await api.put(`/tasks/${id}`, {
        title: updatedData.title,
        description: updatedData.description,
        status: updatedData.status,
      });
      setEditingTask(null);
      fetchTasks();
      fetchStats();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleToggleTask = async (task) => {
    try {
      const newStatus =
        task.status === "COMPLETED" ? "TODO" : "COMPLETED";

      await api.put(`/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
        status: newStatus,
      });

      fetchTasks();
      fetchStats();
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  return (
  <Layout onLogout={handleLogout}>
    <div className="dashboard-container">

      <TaskForm
        onAdd={handleAddTask}
        onUpdate={handleUpdateTask}
        editingTask={editingTask}
      />

      

      {/* Stats Cards */}
      {stats && (
        <div className="stats-container">
          <StatCard
            title="Total Tasks"
            value={stats.total}
            onClick={() => {
              setPriorityFilter("");
              setStatusFilter("");
            }}
          />

          <StatCard
            title="Completed"
            value={stats.completed}
            onClick={() => setStatusFilter("COMPLETED")}
          />

          <StatCard
            title="High Priority"
            value={stats.highPriority}
            onClick={() => setPriorityFilter("HIGH")}
          />

          <StatCard
            title="Medium Priority"
            value={stats.mediumPriority}
            onClick={() => setPriorityFilter("MEDIUM")}
          />

          <StatCard
            title="Low Priority"
            value={stats.lowPriority}
            onClick={() => setPriorityFilter("LOW")}
          />
        </div>
      )}

      {loading && (
        <p className="dashboard-loading">
          Loading tasks...
        </p>
      )}

      {error && (
        <p className="dashboard-error">
          {error}
        </p>
      )}
      {/* Filters */}
      <div className="dashboard-filters">
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort: Default</option>
          <option value="priority">Sort by Priority</option>
          <option value="dueDate">Sort by Due Date</option>
        </select>

        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="TODO">TODO</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>

        <select onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="WORK">WORK</option>
          <option value="PERSONAL">PERSONAL</option>
          <option value="FINANCE">FINANCE</option>
          <option value="GENERAL">GENERAL</option>
        </select>
      </div>

      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
        onToggle={handleToggleTask}
      />
      
    </div>
  </Layout>
);
}

export default Dashboard;
