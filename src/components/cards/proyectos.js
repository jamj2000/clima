import TarjetaProyecto from "@/components/cards/proyecto";
import { auth } from "@/auth";
import { readProyectos } from "@/lib/actions/proyecto";


async function Proyectos() {
  const { user } = await auth();
  // console.log("USUARIO: ",  user);


  let proyectos = {}

  if (user?.role === "ADMIN")
    proyectos = await readProyectos()
  else {
    proyectos = await readProyectos({ userId: user?.id })
  }

  //   await new Promise((resolve) => setTimeout(resolve, 4000))

  return (

    <div className="flex flex-wrap gap-5 sm:gap-10 items-center justify-center">
      {proyectos
        .sort((a, b) => a.nombre.localeCompare(b.nombre.toLowerCase()))     // Ordenamos por nombre
        .map((proyecto) => (
          <TarjetaProyecto key={proyecto.id} proyecto={proyecto} />
        ))}
    </div>

  );

}

export default Proyectos;
