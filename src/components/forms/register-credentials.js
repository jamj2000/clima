"use client";
import { useState } from "react";
import { register } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Button from "@/components/button-form";


function RegisterForm() {
  const router = useRouter()

  const [resultado, setResultado] = useState("");
  const [tipo, setTipo] = useState("");

  async function wrapper(data) {
    const message = await register(data);
    if (message.success) {
      setTipo("success");
      // setResultado(message.success);
      // redirect("/");
      router.push("/auth/login")
    } else {
      setTipo("error");
      setResultado(message.error);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center ">
      <form action={wrapper} className="credentials">
        <div className="flex flex-col space-y-4">
          <label className="flex flex-col">
            <span className="mb-1">Nombre</span>
            <input
              type="text"
              name="name"
              placeholder="Michael Garrido"
              className="p-2 border border-gray-300 rounded"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1">Email</span>
            <input
              type="email"
              name="email"
              placeholder="Garrido@mail.com"
              className="p-2 border border-gray-300 rounded"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1">Contraseña</span>
            <input
              type="password"
              name="password"
              placeholder="******"
              className="p-2 border border-gray-300 rounded"
            />
          </label>

          <p className={`info ${tipo} text-center`}>{resultado}</p>
        </div>
        <div className="flex justify-around gap-5 mt-5">
          <Button texto="Crear cuenta" />
        </div>
      </form>
    </div>
  )
}

export default RegisterForm;
