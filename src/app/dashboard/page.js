import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Tarjeta from "@/components/cards/contenedor";

async function page() {
  const sesion = await auth();
  if (sesion?.user.role !== "ADMIN") redirect("/");
  return (
    <>
      <Tarjeta>
        <div className="flex flex-col items-center h-full">
          <div>
            <h1 className="text-2xl">🔐 Admin panel</h1>
            <p>{sesion?.user.name}</p>
            <p>{sesion?.user.email}</p>
            <p>{sesion?.user.role}</p>
            <div className="flex w-full justify-center">
              {sesion?.user.image ? (
                <img src={sesion.user.image} alt={sesion.user.name} />
              ) : (
                <img
                  src="/user.svg"
                  alt="Imagen por defecto"
                  className="h-10"
                />
              )}
            </div>
          </div>
        </div>
      </Tarjeta>
    </>
  );
}

export default page;
