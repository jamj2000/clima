import { Suspense } from "react";
import Link from "next/link";
import TarjetaContenedor from "@/components/cards/contenedor"
import Equipos from "@/components/cards/equipos"
import SkeletonEquipos from "@/components/skeletons/equipos";

async function Page() {

    return (
        <TarjetaContenedor>
            <div className="flex justify-between mb-6">
                <h1 className="text-4xl">Equipos</h1>
                <Link
                    href="/equipos/create"
                    className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                > Crear Equipo
                </Link>

            </div>
            <Suspense fallback={<SkeletonEquipos />}>
                <Equipos />
            </Suspense>
        </TarjetaContenedor>
    );
}

export default Page;
