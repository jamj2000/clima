import { logout } from "@/lib/actions/auth";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function FormLogout() {
    const sesion = await auth();

    if (!sesion?.user)
        redirect("/auth/login");

    const { user } = sesion;
    console.log(sesion);

    return (
        <form className="container flex flex-col items-center gap-4 text-blue-500">
        {user.image ? (
                <img
                    src={user.image}
                    alt={`Imagen de ${user.name}`}
                    className="rounded-full w-20 h-20"
                />
            ) : (
                <img
                    src="/user.svg"
                    alt={`Imagen de ${user.name}`}
                    className="rounded-full w-20 h-20 flex justify-center items-center bg-white/50 dark:bg-blue-800/80 bg-no bg-center  "
                />
            )}

            <label className="text-center">
                Nombre
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    readOnly
                    className="w-full text-black bg-gray-100 text-center rounded-full"
                />
            </label>
            <label className="text-center">
                Email
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    readOnly
                    className="w-full text-black bg-gray-100 text-center rounded-full"
                />
            </label>
    
            <button
                formAction={logout}
                className="bg-sky-600 bg-center bg-no-repeat rounded-[10px] w-32 h-10 cursor-pointer text-white"
            >
                Cerrar sesion
            </button>
        </form>
    )
}

export default FormLogout