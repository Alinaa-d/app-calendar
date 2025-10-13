import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import './Modal.css';
import { createPortal } from 'react-dom';
const modalElement = document.getElementById('root');
export const Modal = ({ isOpen, children, onClose }) => {
    if (!isOpen || !modalElement) {
        return null;
    }
    return createPortal(_jsx("div", { className: "modal-container", children: _jsx("div", { className: "modal-wrapper", children: _jsx("div", { className: "modal-content", children: children }) }) }), modalElement);
};
//# sourceMappingURL=Modal.js.map