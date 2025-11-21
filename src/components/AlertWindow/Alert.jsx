import "./Alert.css"

function Alert({ taskToDelete, onConfirm, onCancel }) {
  if (!taskToDelete) return null;

  return (
    <div className="alert">
      <div className="alert__content">
        <p className="alert__text">Delete this task?</p>
        <div className="alert__buttons">
          <button className="button button--confirm" onClick={onConfirm}>
            Yes
          </button>
          <button className="button button--cancel" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Alert;