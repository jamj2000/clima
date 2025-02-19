"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";
// import { Proyecto, Recinto, Equipo } from "@prisma/client";
import { z } from 'zod'



const schema = z.object({
  id: z.union([z.coerce.number(), z.string().nullish()]),
  nombre: z.string().trim().min(1),   // al menos una letra
  localidadId: z.coerce.number(),
  userId: z.string().trim(),
  comentarios: z.string().trim(),
  imagen: z.string().nullable(),
  fecha: z.coerce.date(),
  temp_ext_ver: z.coerce.number(),
  temp_ext_inv: z.coerce.number(),
  hum_ext_ver: z.coerce.number(),
  hum_ext_inv: z.coerce.number(),
  temp_terreno_ver: z.coerce.number().optional(),
  temp_terreno_inv: z.coerce.number().optional(),
  altitud: z.coerce.number(),
  presion: z.coerce.number(),
  zona_climatica: z.string().trim(),
  oda: z.string().trim(),

  us_um: z.coerce.number(),
  uc: z.coerce.number(),
  ut_umd: z.coerce.number(),
  uh: z.coerce.number(),
  up: z.coerce.number(),
  uph: z.coerce.number(),
  upv: z.coerce.number(),
  uphv: z.coerce.number(),
  tph: z.coerce.number(),
  tpv: z.coerce.number(),
  tphv: z.coerce.number(),

  numero_personas: z.coerce.number(),
  w_persona: z.coerce.number(),
  carga_latente: z.coerce.number(),
  ocupacion_personas: z.string().trim(),
  caudales_ida: z.coerce.number(),
  caudales_aire: z.coerce.number(),
  tipo_lampara: z.string().trim(),
  potencia_lampara: z.coerce.number(),
  valor_seguridad: z.coerce.number(),

  factorFuncionamiento: z.coerce.number().optional(),
  temp_int_ver: z.coerce.number().optional(),
  temp_int_inv: z.coerce.number().optional(),
  hum_int_ver: z.coerce.number().optional(),
  hum_int_inv: z.coerce.number().optional(),

  p_sat_agua_ext_ver: z.coerce.number(),
  hum_absol_ext_ver: z.coerce.number(),
  entalpia_ext_ver_sens: z.coerce.number(),
  entalpia_ext_ver_lat: z.coerce.number(),
  volum_espe_ext_ver: z.coerce.number(),
  p_sat_agua_ext_inv: z.coerce.number(),
  hum_absol_ext_inv: z.coerce.number(),
  entalpia_ext_inv_sens: z.coerce.number(),
  entalpia_ext_inv_lat: z.coerce.number(),
  volum_espe_ext_inv: z.coerce.number(),

  p_sat_agua_int_ver: z.coerce.number(),
  hum_absol_int_ver: z.coerce.number(),
  entalpia_int_ver_sens: z.coerce.number(),
  entalpia_int_ver_lat: z.coerce.number(),
  volum_espe_int_ver: z.coerce.number(),
  p_sat_agua_int_inv: z.coerce.number(),
  hum_absol_int_inv: z.coerce.number(),
  entalpia_int_inv_sens: z.coerce.number(),
  entalpia_int_inv_lat: z.coerce.number(),
  volum_espe_int_inv: z.coerce.number(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
})


type ZodReturn = { success: true, data: z.infer<typeof schema> } | { success: false, error: ZodError }



function validate(formData: FormData): ZodReturn {
  const datos = Object.fromEntries(formData.entries())

  const result = schema.safeParse(datos)
  return result
}



async function imgCreate(file: File) {
  // console.log(file);

  const fileBuffer = await file.arrayBuffer();

  let mime = file.type;
  let encoding = "base64";
  let base64Data = Buffer.from(fileBuffer).toString("base64");
  let fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

  try {
    // width: 600, aspect-ratio: 600/360
    const result = await cloudinary.uploader.upload(fileUri, {
      invalidate: true,
      folder: "galeria",
      public_id: file.name.split(".").slice(0, -1).join("."),
      aspect_ratio: "600:360",
      width: 600,
      crop: "fill",
      gravity: "center",
    });
    // console.log(result);
    return result.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
}



export async function createProyecto(formData: FormData) {
  const result = validate(formData)

  if (!result.success) {
    const issues = result.error.issues.map(issue => ({ campo: issue.path[0], mensaje: issue.message }))
    return issues;
  }

  const { id, ...data } = result.data

  const imageFile = formData.get("file") as File;

  if (imageFile && imageFile.size > 0) {
    data.imagen = await imgCreate(imageFile);
  }

  try {
    await prisma.proyecto.create({ data });
    revalidatePath("/proyectos");
  } catch (error) {
    console.log("Error al crear el proyecto:", error);
  }

}



export async function updateProyecto(formData: FormData) {
  const result = validate(formData)

  if (!result.success) {
    const issues = result.error.issues.map(issue => ({ campo: issue.path[0], mensaje: issue.message }))
    return issues;
  }

  const { id, ...data } = result.data

  const imageFile = formData.get("file") as File;

  if (imageFile && imageFile.size > 0) {
    data.imagen = await imgCreate(imageFile);
  }

  try {
    await prisma.proyecto.update({
      where: { id },
      data
    });
    revalidatePath("/proyectos");
  } catch (error) {
    console.log("Error al actualizar el proyecto:", error);
  }

}



export async function deleteProyecto(formData: FormData) {
  const id = Number(formData.get("id"));

  try {
    await prisma.proyecto.delete({
      where: { id }
    });
    revalidatePath("/proyectos");
  } catch (error) {
    console.log("Error al eliminar el proyecto: ", error);
  }

}



export async function copyProyecto(formData: FormData) {
  const result = validate(formData)

  if (!result.success) {
    const issues = result.error.issues.map(issue => ({ campo: issue.path[0], mensaje: issue.message }))
    return issues;
  }

  const { id, ...data } = result.data

  const imageFile = formData.get("file") as File;

  if (imageFile && imageFile.size > 0) {
    data.imagen = await imgCreate(imageFile);
  }


  try {
    await prisma.proyecto.create({ data });
    revalidatePath("/proyectos");
  } catch (error) {
    console.log("Error al copiar el proyecto:", error);
  }


}



// READ ACTIONS


type Props1 = {
  id: number | undefined,
  include?: { equipos?: true, recintos?: true, localidad?: true }
}


export async function readProyecto({ id, include }: Props1) {
  const proyecto = await prisma.proyecto.findUnique({
    where: { id },
    include
  })

  return proyecto
}


type Props2 = {
  userId?: string,
  include?: { equipos?: true, recintos?: true },
  select?: unknown
} 

export async function readProyectos({ userId, include, select }: Props2 = {}) {
  const proyectos = await prisma.proyecto.findMany({
    where: { userId },
    include
  })

  return proyectos
}



export async function noAction() {
  'use server'
  return
}
