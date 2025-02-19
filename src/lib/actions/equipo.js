"use server";
import prisma from "@/lib/prisma";
import { z } from 'zod'
import { revalidatePath } from "next/cache";


const schema = z.object({
  // id: z.coerce.number(),
  id: z.union([z.coerce.number(), z.string().nullish()]),
  nombre: z.string().trim(),
  proyectoId: z.coerce.number(),
  factor_funcionamiento: z.coerce.number().min(1).max(5),
  potencia: z.coerce.number().min(1).max(5)
});

// type ZodReturn = { success: true, data: Equipo } | { success: false, error: ZodError }
// type ZodReturn = { success: true, data: z.infer<typeof schema> } | { success: false, error: ZodError }


function validate(formData) {

  const datos = Object.fromEntries(formData.entries())

  const result = schema.safeParse(datos)
  return result
}

export async function createEquipo(formData) {
  const result = validate(formData)

  if (!result.success) {
    const issues = result.error.issues.map(issue => ({ campo: issue.path[0], mensaje: issue.message }))
    return issues;
  }

  const { id, ...data } = result.data

  try {
    await prisma.equipo.create({ data });
    revalidatePath("/proyectos");
    revalidatePath("/equipos");
  } catch (error) {
    console.log(error);
    console.log("Error al crear el equipo: ", error);
  }
}



export async function updateEquipo(formData) {
  const result = validate(formData)

  if (!result.success) {
    const issues = result.error.issues.map(issue => ({ campo: issue.path[0], mensaje: issue.message }))
    return issues;
  }

  const { id, ...data } = result.data

  try {
    await prisma.equipo.update({ where: { id }, data });
    revalidatePath("/proyectos");
    revalidatePath("/equipos");
  } catch (error) {
    console.log("Error al actualizar el equipo: ", error);
  }

}



export async function deleteEquipo(formData) {
  const id = Number(formData.get('id'))

  try {
    await prisma.equipo.delete({ where: { id } });
    revalidatePath("/proyectos");
    revalidatePath("/equipos");
  } catch (error) {
    console.log("Error al eliminar el equipo: ", error);
  }
}



export async function readEquipo({id, include}) {
  const equipo = await prisma.equipo.findUnique({
    where: { id },
    include
  })
  
  return equipo
}


export async function noAction() {
  'use server'
  return
}
