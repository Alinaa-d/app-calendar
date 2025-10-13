import React from 'react';

export type ModalProps = {
    isOpen: boolean;
    children: React.ReactNode;
    onClose?: () => void;
};