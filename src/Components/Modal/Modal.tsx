import * as React from 'react';
import './Modal.css';
import { createPortal } from 'react-dom';
import type { ModalProps } from './Modal.model.js';

const modalElement = document.getElementById('root');
export const Modal = ({ isOpen, children, onClose }: ModalProps) => {
    if (!isOpen || !modalElement) {
        return null;
    }

    return createPortal(
        <div className="modal-container">
            <div className="modal-wrapper">
                <div className="modal-content">{children}</div>
            </div>
        </div>,
        modalElement
    );
};
