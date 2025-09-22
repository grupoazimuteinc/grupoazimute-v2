"use client";

import { useState } from "react";
import BitrixForm from "./BitrixForm";

export default function StyledModalTwo() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <a
        onClick={openModal}
        className="text-white hover:text-[#F07D00] cursor-pointer"
      >
        +55 47 99994-5165
      </a>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-4">Formulário de Contato</h2>
            <BitrixForm />
          </div>
        </div>
      )}
    </>
  );
}
