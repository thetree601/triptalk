import React from 'react';

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  variant?: 'danger' | 'warning' | 'info' | 'success';
  actions?: 'single' | 'dual';
  title?: string;
  content?: string;
  dualActionFirstText?: string;
  dualActionSecondText?: string;
  onDualActionFirst?: () => void;
  onDualActionSecond?: () => void;
}

export function Modal({ 
  isOpen = true, 
  onClose, 
  children, 
  variant = 'info',
  actions = 'single',
  title,
  content,
  dualActionFirstText,
  dualActionSecondText,
  onDualActionFirst,
  onDualActionSecond
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        {content && <p className="mb-6">{content}</p>}
        {children}
        {actions === 'dual' && (
          <div className="flex gap-3 justify-end">
            <button 
              onClick={onDualActionFirst}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {dualActionFirstText}
            </button>
            <button 
              onClick={onDualActionSecond}
              className={`px-4 py-2 rounded-md ${
                variant === 'danger' 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {dualActionSecondText}
            </button>
          </div>
        )}
        {actions === 'single' && (
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-md ${
                variant === 'danger'
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
