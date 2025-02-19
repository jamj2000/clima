import { Suspense } from "react";
import Link from "next/link";
import TarjetaContenedor from "@/components/cards/contenedor"
import Recintos from "@/components/cards/recintos"
import SkeletonRecintos from "@/components/skeletons/recintos";


async function Page() {

 
    return (
        <TarjetaContenedor>
            <div className="flex justify-between mb-6">
                <h1 className="text-4xl">Recintos</h1>
                <Link
                    href="/recintos/create"
                    className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                > Crear recinto
                </Link>
            </div>

            <Suspense fallback={<SkeletonRecintos />}>
                <Recintos />
            </Suspense>
        </TarjetaContenedor>
    );
}

export default Page;

