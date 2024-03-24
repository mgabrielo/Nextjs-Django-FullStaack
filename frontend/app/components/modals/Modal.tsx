"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import CloseIcon from "../icons/CloseIcon";

interface ModalProps {
  label?: string;
  content?: any;
  isOpen?: boolean;
  close?: () => void;
}
const Modal: FC<ModalProps> = ({ label, content, isOpen, close }) => {
  const [showModal, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      if (close !== undefined) {
        close();
      }
    }, 300);
  }, [close]);

  return showModal ? (
    <div className="flex items-center  justify-center inset-0 fixed z-50 bg-black/60">
      <div className="relative w-[85%] md:w-[75%] lg:w-[700px] my-4 h-auto">
        <div
          className={`translaate duration-600 h-full translate-y-0 opacity-100`}
        >
          <div className="w-full h-auto rounded-xl relative flex flex-col bg-white">
            <header className="flex items-center p-4 my-2 rounded-t justify-center relative border-b">
              <h2 className="text-lg font-semibold">{label}</h2>
              <div
                onClick={handleClose}
                className="p-2 absolute left-3 hover:bg-gray-300 rounded-full cursor-pointer"
              >
                <CloseIcon />
              </div>
            </header>
            <section className="p-5">{content}</section>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
