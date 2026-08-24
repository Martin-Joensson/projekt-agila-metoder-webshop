"use client";

import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

type BaseModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

type PendingModalProps = BaseModalProps & {
  isPending: boolean;
  pendingText: string;
}

type ModalProps =
  | BaseModalProps
  | PendingModalProps;


export function Modal({
  isOpen,
  onConfirm,
  onClose,
  title,
  children,
  ...rest

}: ModalProps) {

  const isPending = "isPending" in rest ? rest.isPending : false;
  const pendingText = isPending ? rest.pendingText : "";


  const dialogRef = useRef<HTMLDialogElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Open / close the dialog based on the isOpen prop
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) previousActiveElement.current = document.activeElement as HTMLElement;
    //If the isOpen prop is true, check if it's not already open and open it.
    // if isOpen is false, close the dialog
    isOpen ? (!dialog.open && dialog.showModal()) : dialog.close();
  }, [isOpen]);

  const handleClose = () => {
    previousActiveElement.current?.focus();
    if (isOpen) onClose()
  }

  if (!isOpen) return null;

  /*createPortal is a React function that renders a component outside its normal DOM hierarchy.
   Instead of rendering as a child of the current component it renders into a different DOM node— e.g. document.body.
   It generally avoids css related issues, and in the DOM hierarchy, it should be up front not a child of a component that uses it.
  */
  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      className="modal | fixed inset-0 m-auto bg-transparent p-0 border-0 backdrop:bg-black/50 backdrop:backdrop-blur-sm"
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
            {isPending ? pendingText : "Confirm"}
          </button>
        </footer>
      </div>
    </dialog>,
    document.body,);
}
