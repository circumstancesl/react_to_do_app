import React, {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import './style/style.css'
import './components/Buttons/Buttons.css'
import Todo from "./Todo.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Todo />
  </StrictMode>,
)