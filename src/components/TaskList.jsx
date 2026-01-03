import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  return (
    <>
     <div className="task-list-grid">
        {tasks.length === 0 && <p className="no-tasks">No tasks found</p>}

        {tasks.map(task => (
            <TaskItem
            key={task._id}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
            />
        ))}
    </div>
    </>
  );
};

export default TaskList;
