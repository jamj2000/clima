import Tarjeta from "@/components/cards/contenedor";
import FormProyecto from "@/components/forms/proyecto";
import { auth } from "@/auth";
import { CRUD } from "@/lib/constantes"

async function page({ params }) { 
  const {id} = await params
  const { user } = await auth()

  return (
    <Tarjeta>
      <h1 className="text-2xl font-bold text-center p-10">
        CREAR PROYECTO
      </h1>
      <FormProyecto id={Number(id)} userId={user.id} operacion={CRUD.CREATE} />
    </Tarjeta>
  );
}

export default page;
