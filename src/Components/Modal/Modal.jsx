import React from 'react';
import './Modal.css';
import { createPortal } from 'react-dom';

const modalElement = document.getElementById('root');
export const Modal = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="modal-container">
            <div className="modal-wrapper">
                <div className="modal-content">{children}</div>
            </div>
        </div>,
        modalElement
    );
};
