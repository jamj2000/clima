"use server";
// npm i --save-dev @types/bcryptjs
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { signIn, signOut } from "@/auth";

declare global {
  var callbackUrl: string;
}

// REGISTER
export async function register(formData: FormData) {
  const { name, email, password } = Object.fromEntries (formData.entries())

  // Comprobamos si el usuario ya está registrado
  const user = await prisma.user.findUnique({   where: { email }   })

  if (user) {
    return { error: "El email ya está registrado" };
  }

  // Encriptamos password
  const hashedPassword = await bcrypt.hash(password as string, 10);

  // Guardamos credenciales en base datos
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "Registro correcto" };
}



// LOGIN credentials
export async function login(formData: FormData) {
  const { email, password } = Object.fromEntries (formData.entries())

  // Comprobamos si el usuario está registrado
  const user = await prisma.user.findUnique({   where: { email }   })

  if (!user) {
    return { error: "Usuario no registrado." };
  }

  // Comparamos password
  const matchPassword = await bcrypt.compare(password as string, user.password);

  if (user && matchPassword) {
    // && user.emailVerified

    await signIn("credentials", { email, password, redirectTo: globalThis.callbackUrl});
    // return { success: "Inicio de sesión correcto" }
  } else {
    return { error: "Credenciales incorrectas." };
  }
}



// LOGIN google
export async function loginGoogle() {
  try {
    await signIn("google", { redirectTo: globalThis.callbackUrl });
  } catch (error) {
    throw error;
  }
}



// LOGOUT
export async function logout() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    throw error;
  }
}

// GET USER BY ID
export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    return user
  } catch (error) {
    throw error;
  }
}


// GET USER BY EMAIL
export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    return user
  } catch (error) {
    throw error;
  }
}