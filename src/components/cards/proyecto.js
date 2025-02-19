import Link from "next/link";
import { auth } from "@/auth";
import Image from "next/image";
import prisma from "@/lib/prisma";

async function TarjetaProyecto({ proyecto }) {
  const sesion = await auth();
  let nombre = "Desconocido";

  if (proyecto?.userId) {
    const {name} = await prisma.user.findUnique({
      select: { name: true },
      where: { id: proyecto.userId }
    });
    nombre = name;
  }

  // await new Promise( (resolve) => { setTimeout( resolve, 4000) })

  return (
    <div className="w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/proyectos/manage/${proyecto?.id}`}>
        {/* Con Image:  Imagenes externas requieren configuración en next.config.mjs */}
        <Image
          width={320} height={192}
          priority={true}          // Permite precargar imágenes responsivas
          src={proyecto?.imagen || "/project-image-default.jpg"}
          alt="Logo de proyecto"
          className="rounded-t-lg w-full h-auto object-cover"
        />
        {/* Con img: Imágenes externas No requieren configuración en next.config.mjs */}
        {/* <img width={320} height={192}
          src={proyecto?.imagen || "/project-image-default.jpg"}
          className="rounded-t-lg w-full h-auto object-cover"  /> */}

      </Link>
      <div className="p-5 bg-slate-100 rounded-b-lg ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {proyecto?.nombre}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2 h-12">
          {proyecto?.comentarios
            ? proyecto.comentarios
            : "Sin comentarios..."}
        </p>

        {sesion?.user.role === "ADMIN" &&
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Creado por: {nombre}
          </p>
        }

        <div className="flex justify-around gap-2">
          <Link href={`/proyectos/view/${proyecto?.id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Ver
          </Link>

          <Link href={`/proyectos/update/${proyecto?.id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
          >
            Editar
          </Link>

          <Link href={`/proyectos/delete/${proyecto?.id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-red focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Borrar
          </Link>

          {sesion?.user.role === "ADMIN" &&
            <Link href={`/proyectos/copy/${proyecto?.id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Copiar
            </Link>
          }
        </div>
      </div>
    </div>
  );

}

export default TarjetaProyecto;
