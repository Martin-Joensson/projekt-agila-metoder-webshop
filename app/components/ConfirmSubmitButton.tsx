"use client";

import { useRef, useState } from "react";
import { Modal } from "@/components/Modal";

export function ConfirmSubmitButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const confirmSubmit = () => {
    setIsModalOpen(false);
    formRef.current?.requestSubmit();
  };

  return (
    <>
      <button
        className="bg-amber-500 w-fit m-auto p-2 mbs-3 rounded-xl hover:bg-amber-800 ease-in duration-200 cursor-pointer"
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          formRef.current = event.currentTarget.form;
          setIsModalOpen(true);
        }}
      >
        Submit
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmSubmit}
        title="Confirm product"
      >
        Are you sure you want to submit this product?
      </Modal>
    </>
  );
}
