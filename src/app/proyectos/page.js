import { Suspense } from "react";
import Link from "next/link";
import TarjetaContenedor from "@/components/cards/contenedor";
import Proyectos from "@/components/cards/proyectos"
import SkeletonProyectos from "@/components/skeletons/proyectos";
import { auth } from "@/auth";

async function Page() {
    const { user } = await auth()

    let busqueda = ""

    return (
        <TarjetaContenedor>
            <div className="flex justify-between mb-6">
                <h1 className="text-4xl">Proyectos</h1>
                <Link
                    href="/proyectos/create"
                    className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                > Crear Proyecto
                </Link>
                {
                    user?.role === "ADMIN" &&
                    <input
                        className="ml-5 text-center"
                        defaultValue={busqueda}
                        placeholder="Busqueda de proyectos"
                    />
                }
            </div>
            <Suspense fallback={<SkeletonProyectos />}>
                <Proyectos />
            </Suspense>
        </TarjetaContenedor>
    );
}

export default Page;

