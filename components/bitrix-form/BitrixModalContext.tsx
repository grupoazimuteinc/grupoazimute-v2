'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface BitrixModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const BitrixModalContext = createContext<BitrixModalContextType | undefined>(undefined);

export function BitrixModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <BitrixModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </BitrixModalContext.Provider>
  );
}

export function useBitrixModal() {
  const context = useContext(BitrixModalContext);
  if (context === undefined) {
    throw new Error('useBitrixModal must be used within a BitrixModalProvider');
  }
  return context;
}
