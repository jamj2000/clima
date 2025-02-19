import Tarjeta from "@/components/cards/contenedor";
import FormRecinto from "@/components/forms/recinto"
import { auth } from "@/auth";
import { CRUD } from "@/lib/constantes"

async function page({ params }) { 
  const {id} = await params
  const { user } = await auth()

  return (
    <Tarjeta>
      <h1 className="text-2xl font-bold text-center p-10">
        ELIMINAR RECINTO
      </h1>
      <FormRecinto id={Number(id)} userId={user.id} operacion={CRUD.DELETE} />    
    </Tarjeta>
  );
}

export default page;
