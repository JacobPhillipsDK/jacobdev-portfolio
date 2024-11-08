import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ModalProps = {
    children: ReactNode;
    onClose: () => void;
    className?: string;
};

const Modal = ({ children, onClose, className = '' }: ModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className={cn("bg-white dark:bg-gray-800 rounded-lg p-4", className)}>
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;