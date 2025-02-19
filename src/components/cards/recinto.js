import Link from "next/link";

export default async function TarjetaRecinto({ recinto }) {
  // await new Promise( (resolve) => { setTimeout( resolve, 4000) })

  return (
    <>
      <div className=" w-full max-w-xs rounded-lg bg-gradient-to-tr dark:from-sky-100 dark:to-sky-400 from-gray-300 to-blue-500 p-0.5 shadow-lg">
        
        <div className="bg-gray-100 dark:bg-gray-900/90 p-7 rounded-md">
          <h1 className="font-bold text-xl mb-2"> {recinto?.nombre ?? "Sin definir"}  </h1>

          <div className="flex justify-around flex-col">
            <div className="flex gap-4">
              <p> {"Longitud: " + recinto?.longitud ?? "Sin definir"} </p>
              <p> {"Anchura: " + recinto?.anchura ?? "Sin definir"} </p>
              <p> {"Altura: " + recinto?.altura ?? "Sin definir"} </p>
            </div>

            <p> {"Temperatura verano: " + recinto?.temp_ver_relativa ?? "Sin definir"} </p>
            <p> {"Humedad verano: " + recinto?.hum_ver_relativa ?? "Sin definir"} </p>
            <p> {"Temperatura invierno: " + recinto?.temp_inv_relativa ?? "Sin definir"} </p>
            <p> {"Humedad invierno: " + recinto?.hum_inv_relativa ?? "Sin definir"} </p>
            <p> {recinto?.ida.toUpperCase() ?? "Sin definir"}</p>
          </div>
        </div>



        <div className="flex justify-around gap-2 py-4">
          <Link href={`/recintos/view/${recinto?.id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Ver
          </Link>

        <Link href={`/recintos/update/${recinto?.id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
          >
            Editar
          </Link>
          <Link href={`/recintos/delete/${recinto?.id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Borrar
          </Link>

        </div>
      </div>
    </>
  );
}


