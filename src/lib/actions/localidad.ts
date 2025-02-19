"use server";
import prisma from "@/lib/prisma";
import { Localidad, Zona } from "@prisma/client";
import { z } from 'zod'


const schema = z.object({
    id: z.coerce.number(),
    nombre: z.string().trim(),
    temp_ext_ver: z.coerce.number(),
    hum_ext_ver: z.coerce.number(),
    temp_ext_inv: z.coerce.number(),
    hum_ext_inv: z.coerce.number(),
    altitud: z.coerce.number(),
    zonaId: z.string().trim()   
});

type ZodReturn = { success: true, data: Localidad } | { success: false, error: ZodError }


function validate(formData: FormData): ZodReturn {

  const datos = Object.fromEntries(formData.entries())

  const result = schema.safeParse(datos)
  return result
}


// READ ACTIONS

export async function readLocalidades() {
  const localidades = await prisma.localidad.findMany({
    include: {
      zona_climatica: true
    }
  })
  
  return localidades
}


type Props = {
  id: number,
  include?: { zona_climatica?: true }
}

export async function readLocalidad({id, include}: Props ) {
  const localidad = await prisma.localidad.findUnique({
    where: { id },
    include
  })
  
  return localidad
}
