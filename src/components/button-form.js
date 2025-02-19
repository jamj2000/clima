"use client";
import { useFormStatus } from "react-dom";

function Button({ texto }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-sky-600  rounded-[10px] px-4 py-2 cursor-pointer text-white"
    >
      {texto}
    </button>
  );
}

export default Button;
