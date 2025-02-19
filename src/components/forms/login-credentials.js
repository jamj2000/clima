"use client";
import { useState } from "react";
import { login } from "@/lib/actions/auth";
import Button from "@/components/button-form";
import Link from "next/link";



function LoginForm() {
  const [resultado, setResultado] = useState("");
  const [tipo, setTipo] = useState("");

  async function wrapper(data) {
    const message = await login(data);
    if (message?.success) {
      setTipo("success");
      setResultado(message.success);
    }
    if (message?.error) {
      setTipo("error");
      setResultado(message.error);
    }
  }
  return (
    <form
      action={wrapper}
      className="credentials flex flex-col items-center text-sky-500"
    >
      <div className="flex flex-col items-center mb-4 ">
        <label className="mb-2">Email</label>
        <input
          type="email"
          name="email"
          placeholder="nombre@gmail.com"
          className="border p-2 rounded text-center"
        />
      </div>
      <div className="flex flex-col items-center mb-4">
        <label className="mb-2">Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="******"
          className="border p-2 rounded text-center"
        />
      </div>
      <div className="flex justify-around items-center gap-5 mb-5">
        <Button texto="Iniciar sesion"
          className="bg-sky-600  rounded-[10px] px-4 py-2 cursor-pointer text-white"

        />
        <Link
          href="/auth/register"
          className="bg-sky-600  rounded-[10px] px-4 py-2 cursor-pointer text-white"
        >
          Crear cuenta
        </Link>
      </div>
      <div>
        <p className={`info ${tipo} text-red-700 mb-4`}> {resultado} </p>
      </div>
    </form>
  );
}

export default LoginForm;
