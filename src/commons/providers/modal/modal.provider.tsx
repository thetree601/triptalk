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

  const ModalPortal = () => {
    if (!isOpen || !content) return null;
    
    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative">
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
