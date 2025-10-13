import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import TimePicker from 'react-time-picker';
import { Controller } from 'react-hook-form';
import { Modal } from '../../Modal/Modal.js';
export const EventModal = ({ isOpen, onClose, onSubmit, register, handleSubmit, control, errors, }) => {
    return (_jsx(Modal, { isOpen: isOpen, onClose: onClose, children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "form-wrapper", children: [_jsxs("div", { className: "time-input", children: [_jsx("div", { className: "event-popup-time", children: "Time" }), _jsx(Controller, { name: "time", control: control, render: ({ field }) => (_jsx(TimePicker, { ...field, format: "HH:mm", onChange: (time) => field.onChange(time), disableClock: true, className: "time-picker-react" })) })] }), _jsx("p", { className: "errors", children: String(errors.time?.message ?? '') }), _jsx("textarea", { ...register('text'), className: "event-textarea", placeholder: "Enter event text (Maximum 50 characters)" }), _jsx("p", { className: "errors", children: String(errors.text?.message ?? '') }), _jsxs("div", { className: "event-buttons-modal", children: [_jsx("button", { className: "event-popup-buttons", children: "Save" }), _jsx("button", { type: "button", className: "event-popup-buttons", onClick: onClose, children: "Cancel" })] })] }) }));
};
//# sourceMappingURL=EventModal.js.map