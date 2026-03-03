import { useState } from "react";
import api from "../api/axios";
import "../styles/taskForm.css";

function TaskForm({ onAdd, onUpdate, editingTask }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [hoverPriorityText, setHoverPriorityText] = useState(
    "Fill title to preview AI priority"
  );
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const getDueDaysByPriority = (priority) => {
    if (priority === "HIGH") return 1;
    if (priority === "MEDIUM") return 3;
    return 7;
  };

  const fetchPrioritySuggestion = async () => {
    const response = await api.post("/ai/suggest-priority", {
      title: title,
    });
    return response.data.result;
  };

  const handleSubmit = () => {
    setSubmitAttempted(true);

    const nextErrors = {
      title: title.trim() ? "" : "Title is required",
      description: description.trim() ? "" : "Description is required",
    };

    setErrors(nextErrors);

    if (nextErrors.title || nextErrors.description) {
      return;
    }

    onAdd({
      title,
      description,
      dueDate: dueDate || null
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setAiSuggestion("");
    setSubmitAttempted(false);
    setErrors({ title: "", description: "" });
  };

  const handleSuggestPriority = async () => {
    if (!title.trim()) {
      setErrors((prev) => ({ ...prev, title: "Title is required" }));
      return;
    }

    try {
      const result = await fetchPrioritySuggestion();
      setAiSuggestion(result);
      setHoverPriorityText(
        `AI Priority: ${result} | If date empty: ${getDueDaysByPriority(result)} day(s)`
      );
    } catch (error) {
      setHoverPriorityText("Could not fetch AI priority");
      console.error("AI error:", error);
    }
  };

  const handleSuggestHover = async () => {
    if (!title.trim()) {
      setHoverPriorityText("Enter title to preview AI priority");
      return;
    }

    if (aiSuggestion) {
      setHoverPriorityText(
        `AI Priority: ${aiSuggestion} | If date empty: ${getDueDaysByPriority(aiSuggestion)} day(s)`
      );
      return;
    }

    setHoverPriorityText("Checking AI priority...");

    try {
      const result = await fetchPrioritySuggestion();
      setAiSuggestion(result);
      setHoverPriorityText(
        `AI Priority: ${result} | If date empty: ${getDueDaysByPriority(result)} day(s)`
      );
    } catch (error) {
      setHoverPriorityText("Could not fetch AI priority");
    }
  };

  return (
    <div className="task-form-container">

      <h3 className="task-form-title">
        {editingTask ? "Edit Task" : "Add Task"}
      </h3>

      <input
        className={`task-input ${errors.title ? "task-input-error" : ""}`}
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (errors.title) {
            setErrors((prev) => ({ ...prev, title: "" }));
          }
          if (aiSuggestion) {
            setAiSuggestion("");
            setHoverPriorityText("Fill title to preview AI priority");
          }
        }}
      />
      {errors.title && <p className="task-input-error-text">{errors.title}</p>}

      <input
        className={`task-input ${errors.description ? "task-input-error" : ""}`}
        type="text"
        placeholder="Task description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          if (errors.description) {
            setErrors((prev) => ({ ...prev, description: "" }));
          }
        }}
      />
      {errors.description && (
        <p className="task-input-error-text">{errors.description}</p>
      )}

      <input
        className="task-input"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      {submitAttempted && !dueDate && (
        <p className="task-date-note-error">
          Due date is optional. AI auto-sets: HIGH = 1 day, MEDIUM = 3 days, LOW = 7 days.
        </p>
      )}

      <div className="task-form-buttons">
        <button
          className="task-btn task-btn-primary"
          onClick={handleSubmit}
        >
          Add Task
        </button>

        <div className="task-btn-tooltip-wrap">
          <button
            className="task-btn task-btn-ai"
            onClick={handleSuggestPriority}
            onMouseEnter={handleSuggestHover}
          >
            Suggest Priority (AI)
          </button>
          <span className="task-btn-tooltip">{hoverPriorityText}</span>
        </div>
      </div>

    </div>
  );
}

export default TaskForm;
