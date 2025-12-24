import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    setTodo(state, action) {
      return action.payload;
    },

    addTodo(state, action) {
      state.push({
        id: Date.now(),
        ...action.payload
      });
    },

    deleteTodo(state, action) {
      const index = state.findIndex(task => task.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },

    updateTodo(state, action) {
      const { id, title, description } = action.payload;
      const task = state.find(todo => todo.id === id);

      if (task) {
        task.title = title;
        task.description = description;
      }
    },

    togglePin(state, action) {
      const taskId = action.payload;

      const targetTask = state.find(task => task.id === taskId);
      if (!targetTask) return;

      const pinnedTasksCount = state.filter(task => task.pinned).length;

      if (!targetTask.pinned && pinnedTasksCount >= 3) return;

      targetTask.pinned = !targetTask.pinned;
    },


    reorderTodos(state, action) {
      const { fromIndex, toIndex } = action.payload;

      const pinnedTasks = state.filter(task => task.pinned);
      const unpinnedTasks = state.filter(task => !task.pinned);

      const [movedTask] = unpinnedTasks.splice(fromIndex, 1);
      unpinnedTasks.splice(toIndex, 0, movedTask);

      return [...pinnedTasks, ...unpinnedTasks];
    },

  },
});

export const {
  addTodo,
  deleteTodo,
  updateTodo,
  setTodo,
  togglePin,
  reorderTodos
} = todoSlice.actions;

export default todoSlice.reducer;
