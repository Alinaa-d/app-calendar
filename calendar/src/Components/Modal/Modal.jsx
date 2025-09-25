import React from 'react';
import './Modal.css';
import {createPortal} from "react-dom";

const modalElement = document.getElementById('modal')
export const Modal = ({
                          show,
                          children
                      }) => {
    if (!show) return null;

    return createPortal(
        (
            <div className="modal">
                <div className="modal-wrapper">
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            </div>
        ), modalElement
    )

}