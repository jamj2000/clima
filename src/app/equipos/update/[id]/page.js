import Tarjeta from "@/components/cards/contenedor";
import FormEquipo from "@/components/forms/equipo"
import { auth } from "@/auth";
import { CRUD } from "@/lib/constantes"

async function page({ params }) { 
  const {id} = await params
  const { user } = await auth()

  return (
    <Tarjeta>
      <h1 className="text-2xl font-bold text-center p-10">
        EDITAR EQUIPO
      </h1>
      <FormEquipo id={Number(id)} userId={user.id} operacion={CRUD.UPDATE} />    
    </Tarjeta>
  );
}

export default page;
