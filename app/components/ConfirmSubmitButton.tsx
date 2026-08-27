"use client";

import { useRef, useState } from "react";
import { Modal } from "@/components/Modal";
import { useFormStatus } from "react-dom";
import { redirect } from "next/navigation";

export function ConfirmSubmitButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const confirmSubmit = () => {
    const form = formRef.current;

    if (!form || !form.checkValidity()) {
      form?.reportValidity();
      setIsModalOpen(false);
      return;
    }

    setIsModalOpen(false);
    form.requestSubmit();
  };

  return (
    <>
      <button
        className="bg-amber-500 w-fit m-auto p-2 mbs-3 rounded-xl hover:bg-amber-800 ease-in duration-200 cursor-pointer"
        type="submit"
        onClick={(event) => {
          event.preventDefault();

          const form = event.currentTarget.form;

          if (!form) return;

          formRef.current = form;

          if (!form.checkValidity()) {
            form.reportValidity();
            return;
          }

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

export function CancelButton() {
  redirect("/");
}

export default function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex items-center justify-center gap-2 border rounded-lg py-2 px-4 bg-accent border-neutral-200 cursor-pointer hover:bg-warning transition-colors"
      type="submit"
      disabled={pending}
      aria-busy={pending}
    >
      {pending ? (
        <>
          <span
            className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
          <span>Saving...</span>
        </>
      ) : (
        "Save"
      )}
    </button>
  );
}
