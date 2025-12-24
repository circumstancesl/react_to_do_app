import { useEffect, useState } from "react";
import TaskItem from "./TaskItem.jsx";
import Share from "../ShareWindow/Share.jsx";
import Input from "../InputForm/Input.jsx";
import Edit from "../EditWindow/Edit.jsx";
import Alert from "../AlertWindow/Alert.jsx";
import { useSelector, useDispatch } from "react-redux";
import {addTodo, deleteTodo, updateTodo, setTodo, reorderTodos, togglePin} from "../../store/todoSlice.js";
import "./Tasks.css";

export default function ToDoList() {
  const STORAGE_KEY = "tasks";
  const tasks = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [isShareOpen, setShareOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);

  const pinnedTasks = tasks.filter(t => t.pinned);
  const normalTasks = tasks.filter(t => !t.pinned);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);

    try {
      dispatch(setTodo(data ? JSON.parse(data) : []));
    } catch {
      dispatch(setTodo([]));
    }

    setHasLoaded(true);
  }, [dispatch]);

  useEffect(() => {
    if (!hasLoaded) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, hasLoaded]);

  const handleAddTask = (title, description) => {
    const newTask = { id: Date.now(), title, description };
    dispatch(addTodo(newTask));
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTodo(id));
    setTaskToDelete(null);
  };

  const handleUpdateTask = (oldTask, newTitle, newDesc) => {
    if (!newTitle.trim()) return;
    dispatch(updateTodo({ id: oldTask.id, title: newTitle, description: newDesc }));
    setEditingTask(null);
  };

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDrop = (index) => {
    if (dragIndex === null || dragIndex === index) return;

    dispatch(reorderTodos({ fromIndex: dragIndex, toIndex: index }));
    setDragIndex(null);
  };

  return (
    <main>
      <Input onAdd={handleAddTask} />

      <section className="tasks-section">
        {tasks.length === 0 && (
          <p className="tasks__empty">
            <span>No tasks</span>
          </p>
        )}

        <ul className="tasks-list">
          {pinnedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              isPinned
              onPin={() => dispatch(togglePin(task.id))}
            />
          ))}

          {normalTasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
              onPin={() => dispatch(togglePin(task.id))}
              onDelete={() => setTaskToDelete(task)}
              onEdit={() => setEditingTask(task)}
              onShare={() => setShareOpen(true)}
            />
          ))}
        </ul>

        <Alert
          taskToDelete={taskToDelete}
          onConfirm={() => handleDeleteTask(taskToDelete.id)}
          onCancel={() => setTaskToDelete(null)}
        />

        {editingTask && (
          <div className="edit-window">
            <div className="edit-window__content">
              <Edit
                task={editingTask}
                onCancel={() => setEditingTask(null)}
                onSave={handleUpdateTask}
              />
            </div>
          </div>
        )}

        <Share isOpen={isShareOpen} onClose={() => setShareOpen(false)}/>
      </section>
    </main>
  );
}