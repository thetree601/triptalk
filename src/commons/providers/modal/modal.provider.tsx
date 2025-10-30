'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalContextType {
  isOpen: boolean;
  content: React.ReactNode | null;
  openModal: (content?: React.ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const openModal = (modalContent?: React.ReactNode) => {
    if (modalContent) {
      setContent(modalContent);
    }
    setIsOpen(true);
  };
  
  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
  };

  // debug helper removed per request

  const ModalPortal = () => {
    if (!isOpen || !content) return null;
    
    return createPortal(
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2147483646,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
          pointerEvents: 'auto',
        }}
        aria-modal={true as unknown as undefined}
        role="dialog"
      >
        <div
          style={{
            position: 'relative',
            zIndex: 2147483647,
            backgroundColor: '#ffffff',
            borderRadius: 8,
            padding: 24,
            maxWidth: 480,
            width: '100%',
            marginLeft: 16,
            marginRight: 16,
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)'
          }}
        >
          {content}
        </div>
      </div>,
      document.body
    );
  };

  return (
    <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>
      {children}
      <ModalPortal />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
