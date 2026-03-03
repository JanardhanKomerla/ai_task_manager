import "../styles/taskList.css";

function TaskList({ tasks, onDelete, onEdit, onToggle }) {

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const getPriorityClass = (priority) => {
    if (priority === "HIGH") return "priority-high";
    if (priority === "MEDIUM") return "priority-medium";
    return "priority-low";
  };

  return (
    <div className="task-list">
      <h3>Your Tasks</h3>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`task-card ${isOverdue(task.dueDate) ? "overdue" : ""}`}
          >
            <div className="task-header">
              <h4
                className={`task-title ${
                  task.status === "COMPLETED" ? "completed" : ""
                }`}
              >
                {task.title}
              </h4>

              <span
                className={`priority-badge ${getPriorityClass(task.priority)}`}
              >
                {task.priority}
              </span>
            </div>

            <p className="task-description">{task.description}</p>

            <div className="task-meta">
              <div>Status: {task.status}</div>
              <div>Category: {task.category}</div>
              <div>
                Due:{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>

            <div className="task-buttons">
              <button
                className={`btn ${
                  task.status === "COMPLETED"
                    ? "btn-undo"
                    : "btn-complete"
                }`}
                onClick={() => onToggle(task)}
              >
                {task.status === "COMPLETED" ? "Undo" : "Complete"}
              </button>

              <button
                className="btn btn-edit"
                onClick={() => onEdit(task)}
              >
                Edit
              </button>

              <button
                className="btn btn-delete"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            </div>

            {isOverdue(task.dueDate) &&
              task.status !== "COMPLETED" && (
                <p className="overdue-text">
                  ⚠ This task is overdue
                </p>
              )}
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;