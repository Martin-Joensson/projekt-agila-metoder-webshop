"use client";

import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({
  isOpen,
  onConfirm,
  onClose,
  title,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    //Checks when the value for onOpen changes to see whether it should render itself or not, as well as binding necessary events
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;
    modalRef.current?.focus();

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
      previousActiveElement.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  /*createPortal is a React function that renders a component outside its normal DOM hierarchy.
   Instead of rendering as a child of the current component it renders into a different DOM node— e.g. document.body.
   It generally avoids css related issues, and in the DOM hierarchy it should be up front not a child of something.
  */
  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <dialog
        ref={modalRef}
        open
        className="fixed z-50 inset-0 m-auto bg-transparent p-4 border-0"
        onClick={(e) => e.currentTarget === e.target && onClose()}
      >
        <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          {title && (
            <header>
              <h2 className="text-lg font-bold">{title}</h2>
            </header>
          )}
          <div className={title ? "mt-4" : ""}>{children}</div>

          <footer className="flex gap-3 mt-6 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-700"
            >
              Confirm
            </button>
          </footer>
        </div>
      </dialog>
    </>,
    document.body,
  );
}
