import { useState } from "react";

export default function TaskItem({ task, onDelete, onEdit, onShare }) {
  const [showTools, setShowTools] = useState(false);

  return (
    <li className="task">
      <div
        className="task__content"
        onClick={() => setShowTools(!showTools)}
      >
        <div className="task__body">
          <p className="task__title">{task.title}</p>
          <p className="task__description">{task.description}</p>
        </div>
        <button
          className="button button--delete button--icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <img src="/src/assets/img/delete.svg" alt="delete" />
        </button>
      </div>

      {showTools && (
        <div className="task__tools">
          <button className="button button--share button--icon" onClick={onShare}>
            <img src="/src/assets/img/share.svg" alt="share" />
          </button>
          <button className="button button--info">i</button>
          <button className="button button--edit button--icon" onClick={onEdit}>
            <img src="/src/assets/img/edit.svg" alt="edit" />
          </button>
        </div>
      )}
    </li>
  );
}
