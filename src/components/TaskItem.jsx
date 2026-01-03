import { FiCheck, FiTrash2 } from "react-icons/fi";


const TaskItem = ({ task, onUpdate, onDelete }) => {
  const toggleStatus = () =>
    onUpdate(task._id, {
      status: task.status === "Pending" ? "Completed" : "Pending"
    });

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

  return (
    <div className={`task-card ${task.status === "Completed" ? "completed" : ""}`}>
      
      {/* Task Info */}
      <div className="task-info">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-desc">{task.description}</p>

        <div className="task-meta">
          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
          <span className="due-date">{formatDate(task.dueDate)}</span>
        </div>

        <div className="task-dates">
          <span>Created: {formatDate(task.createdAt)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="task-actions">
        <button
          className={`btn-toggle ${task.status === "Completed" ? "completed" : "pending"}`}
          onClick={toggleStatus}
          title="Toggle Status"
        >
          <FiCheck />
        </button>

        <button className="btn-delete" onClick={() => onDelete(task._id)} title="Delete">
          <FiTrash2 />
        </button>
      </div>

    </div>
  );
};

export default TaskItem;

