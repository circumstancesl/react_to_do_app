import { useEffect, useState } from "react";
import TaskItem from "./TaskItem.jsx";
import Share from "../ShareWindow/Share.jsx";
import Input from "../InputForm/Input.jsx";
import Edit from "../EditWindow/Edit.jsx";
import Alert from "../AlertWindow/Alert.jsx";
import "./Tasks.css";

export default function ToDoList() {
  const STORAGE_KEY = "tasks";
  const [tasks, setTasks] = useState([]);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [isShareOpen, setShareOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);

    try {
      setTasks(data ? JSON.parse(data) : []);
    } catch {
      setTasks([]);
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, hasLoaded]);

  const addTask = (title, description) => {
    const newTask = { id: Date.now(), title, description };
    console.log(newTask);
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setTaskToDelete(null);
  };

  const updateTask = (oldTask, newTitle, newDesc) => {
    if (!newTitle.trim()) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === oldTask.id ? { ...t, title: newTitle, description: newDesc } : t
      )
    );
    setEditingTask(null);
  };

  return (
    <main>
      <Input onAdd={addTask} />

      <section className="tasks-section">
        {tasks.length === 0 && (
          <p className="tasks__empty">
            <span>No tasks</span>
          </p>
        )}

        <ul className="tasks-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={() => setTaskToDelete(task)}
              onEdit={() => setEditingTask(task)}
              onShare={() => setShareOpen(true)}
            />
          ))}
        </ul>

        <Alert
          taskToDelete={taskToDelete}
          onConfirm={() => deleteTask(taskToDelete.id)}
          onCancel={() => setTaskToDelete(null)}
        />

        {editingTask && (
          <div className="edit-window">
            <div className="edit-window__content">
              <Edit
                task={editingTask}
                onCancel={() => setEditingTask(null)}
                onSave={updateTask}
              />
            </div>
          </div>
        )}

        <Share isOpen={isShareOpen} onClose={() => setShareOpen(false)} />
      </section>
    </main>
  );
}