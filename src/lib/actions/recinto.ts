"use server";
import prisma from "@/lib/prisma";
import { z } from 'zod'
import { Recinto } from "@prisma/client";
import { revalidatePath } from "next/cache";

const schema = z.object({
  // id: z.coerce.number(),
  id: z.union([z.coerce.number(), z.string().nullish()]),
  nombre: z.coerce.string().trim(),
  proyectoId: z.coerce.number(),
  temp_ver_relativa: z.coerce.number(),
  temp_inv_relativa: z.coerce.number(),
  hum_ver_relativa: z.coerce.number().min(30).max(70),
  hum_inv_relativa: z.coerce.number().min(30).max(70),
  longitud: z.coerce.number(),
  anchura: z.coerce.number(),
  altura: z.coerce.number(),
  volumen: z.coerce.number(),
  ida: z.string().trim(),

  // Cerramiento 1
  orientacion_c_1: z.string().trim(),
  ubicacion_c_1: z.string().trim(),
  color_c_1: z.string().trim(),
  temperatura_ver_c_1: z.coerce.number(),
  temperatura_inv_c_1: z.coerce.number(),
  superficie_c_1: z.coerce.number(),
  tipo_vidrio_c_1: z.string().trim(),
  superficie_vidrio_c_1: z.coerce.number(),
  superficie_puertas_c_1: z.coerce.number(),

  // Cerramiento 2
  orientacion_c_2: z.string().trim(),
  ubicacion_c_2: z.string().trim(),
  color_c_2: z.string().trim(),
  temperatura_ver_c_2: z.coerce.number(),
  temperatura_inv_c_2: z.coerce.number(),
  superficie_c_2: z.coerce.number(),
  tipo_vidrio_c_2: z.string().trim(),
  superficie_vidrio_c_2: z.coerce.number(),
  superficie_puertas_c_2: z.coerce.number(),

  // Cerramiento 3
  orientacion_c_3: z.string().trim(),
  ubicacion_c_3: z.string().trim(),
  color_c_3: z.string().trim(),
  temperatura_ver_c_3: z.coerce.number(),
  temperatura_inv_c_3: z.coerce.number(),
  superficie_c_3: z.coerce.number(),
  tipo_vidrio_c_3: z.string().trim(),
  superficie_vidrio_c_3: z.coerce.number(),
  superficie_puertas_c_3: z.coerce.number(),

  // Cerramiento 4
  orientacion_c_4: z.string().trim(),
  ubicacion_c_4: z.string().trim(),
  color_c_4: z.string().trim(),
  temperatura_ver_c_4: z.coerce.number(),
  temperatura_inv_c_4: z.coerce.number(),
  superficie_c_4: z.coerce.number(),
  tipo_vidrio_c_4: z.string().trim(),
  superficie_vidrio_c_4: z.coerce.number(),
  superficie_puertas_c_4: z.coerce.number(),

  // Techo
  orientacion_techo: z.string().trim(),
  ubicacion_techo: z.string().trim(),
  temperatura_ver_techo: z.coerce.number(),
  temperatura_inv_techo: z.coerce.number(),
  superficie_techo: z.coerce.number(),
  tipo_vidrio_techo: z.string().trim(),

  // Suelo
  ubicacion_suelo: z.string().trim(),
  temperatura_ver_suelo: z.coerce.number(),
  temperatura_inv_suelo: z.coerce.number(),
  superficie_suelo: z.coerce.number(),
});

// type ZodReturn = { success: true, data: Recinto } | { success: false, error: ZodError }
type ZodReturn = { success: true, data: z.infer<typeof schema> } | { success: false, error: ZodError }


function validate(formData: FormData): ZodReturn {
  const datos = Object.fromEntries(formData.entries())

  const result = schema.safeParse(datos)
  return result
}


export async function createRecinto(formData: FormData) {
  const result = validate(formData)

  if (!result.success) {
    const issues = result.error.issues.map(issue => ({ campo: issue.path[0], mensaje: issue.message }))
    return issues;
  }

  const { id, ...data } = result.data

  try {
    await prisma.recinto.create({ data });
    revalidatePath("/proyectos");
    revalidatePath("/recintos");
  } catch (error) {
    console.log("Error al crear el cerramiento: ", error);
  }
}



export async function updateRecinto(formData: FormData) {
  const result = validate(formData)

  if (!result.success) {
    const issues = result.error.issues.map(issue => ({ campo: issue.path[0], mensaje: issue.message }))
    return issues;
  }

  const { id, ...data } = result.data

  try {
    await prisma.recinto.update({ where: {id}, data });
    revalidatePath("/proyectos");
    revalidatePath("/recintos");
  } catch (error) {
    console.log("Error al actualizar el cerramiento: ", error);
  }

}



export async function deleteRecinto(formData: FormData) {
  const id = Number(formData.get("id"));

  try {
    await prisma.recinto.delete({    where: { id }   });
    revalidatePath("/proyectos");
    revalidatePath("/recintos");
  } catch (error) {
    console.log("Error al eliminar el cerramiento: ", error);
  }
}


// READ ACTIONS
type Props = {
  id?: number,
  userId?: string,
  include?: { proyectos?: true }
} 

export async function readRecinto({id, include}: Props) {
  const recinto = await prisma.recinto.findUnique({
    where: { id },
    include
  })
  
  return recinto
}



export async function noAction() {
  'use server'
  return
}
