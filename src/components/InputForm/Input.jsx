import { useState } from "react";
import "./Input.css";

function Input({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !description.trim()) return;

    onAdd(title.trim(), description.trim());
    setTitle("");
    setDescription("");
  };

  return (
    <section className="form-section">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__inputs">
          <input
            className="input"
            type="text"
            name="title"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="input"
            type="text"
            name="description"
            placeholder="About..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="button button--add button--icon" type="submit">
          <img src="/src/assets/img/add.svg" alt="add" />
        </button>
      </form>
    </section>
  );
}

export default Input;