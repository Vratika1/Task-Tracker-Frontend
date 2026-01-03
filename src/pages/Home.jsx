import { useEffect, useState, useMemo } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import FilterSort from "../components/FilterSort";

const Home = () => {

  const [tasks, setTasks] = useState([]);          
  const [statusFilter, setStatusFilter] = useState("All");  
  const [priorityFilter, setPriorityFilter] = useState("All"); 
  const [sortOrder, setSortOrder] = useState("asc");         

  // Fetch tasks once on page rerender
  useEffect(() => {
    const getTasks = async () => {
      try {
        const { data } = await fetchTasks(); 
        setTasks(data);                      
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    getTasks();
  }, []); 

  // Filter + Sort tasks using useMemo
  const filteredAndSortedTasks = useMemo(() => {
    let updatedTasks = [...tasks];

    if (statusFilter !== "All") {
      updatedTasks = updatedTasks.filter(task => task.status === statusFilter);
    }

    if (priorityFilter !== "All") {
      updatedTasks = updatedTasks.filter(task => task.priority === priorityFilter);
    }

    updatedTasks.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return updatedTasks;
  }, [tasks, statusFilter, priorityFilter, sortOrder]);

  // CRUD functions
  const addTask = async (task) => {
    try {
      const { data } = await createTask(task);
      setTasks(prev => [...prev, data]); 
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const updateOne = async (id, updatedData) => {
    try {
      const { data } = await updateTask(id, updatedData);
      setTasks(prev => prev.map(task => task._id === id ? data : task));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="home-container">
  
        <h1 className="task-tracker-heading">Task Tracker</h1>

          <div className="main-home-cont">

            <div className="taskform-section">
              <TaskForm onAdd={addTask} />
            </div>

          
            <div className="tasks-section">
                <FilterSort
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  priorityFilter={priorityFilter}
                  setPriorityFilter={setPriorityFilter}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                />

                <TaskList
                  tasks={filteredAndSortedTasks}
                  onUpdate={updateOne}
                  onDelete={removeTask}
                />
            </div>

            
          </div>  
    </div>

  );
};

export default Home;
