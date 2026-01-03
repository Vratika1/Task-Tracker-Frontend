import { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    status: "Pending"
  });

  const isValid = form.title && form.dueDate;

  const handleChange = ({ target: { name, value } }) =>
    setForm(prev => ({ ...prev, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    // Make a new task object
    const newTask = {
      ...form,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Pass it to parent
    await onAdd(newTask);

    // Reset form
    setForm({ title: "", description: "", priority: "Low", dueDate: "", status: "Pending" });
  };

  return (
    <div className="task-tracker-container">
     

      <form onSubmit={handleSubmit} className="task-form">
        <h2 className="form-heading">Add New Task</h2>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter task description"
            rows={4}
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={!isValid}>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
