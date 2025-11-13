import { useState } from "react";
import "./Edit.css";

function Edit({ task, onCancel, onSave }) {
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description);

  return (
    <>
      <div className="edit-window__inputs">
        <input
          className="input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="input"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="edit-window__buttons">
        <button
          className="button button--cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="button button--confirm"
          onClick={() => onSave(task, title, desc)}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default Edit;