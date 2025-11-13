import React from "react";
import "./Share.css";

function Share({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <section className="share-window" onClick={onClose}>
      <div className="share-window__content" onClick={(e) => e.stopPropagation()}>
        <button className="button--sharebox">
          <img src="/src/assets/img/copy.svg" alt="Copy" />
        </button>
        <button className="button--sharebox">
          <img src="/src/assets/img/vk.svg" alt="VK" />
        </button>
        <button className="button--sharebox">
          <img src="/src/assets/img/telegram.svg" alt="Telegram" />
        </button>
        <button className="button--sharebox">
          <img src="/src/assets/img/whatsapp.svg" alt="WhatsApp" />
        </button>
        <button className="button--sharebox">
          <img src="/src/assets/img/facebook.svg" alt="Facebook" />
        </button>
      </div>
    </section>
  );
}

export default Share;
