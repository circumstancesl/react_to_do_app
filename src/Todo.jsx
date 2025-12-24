import ToDoList from "./components/Tasks/ToDoList.jsx";
import {Provider} from "react-redux";
import store from "./store/store.js"

const Todo = () => {
  return (
    <Provider store={store}>
      <main>
        <ToDoList />
      </main>
    </Provider>
  );
};

export default Todo;