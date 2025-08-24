import React from 'react';
import Button from './Button';
import '../styles/ConfirmationModal.css';

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <Button type="cancel-button" text="Não" action={onClose} />
          <Button type="confirm-button" text="Sim" action={onConfirm} />
        </div>
      </div>
    </div>
  );
}