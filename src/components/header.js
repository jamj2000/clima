import Link from "next/link";
import Menu from "@/components/menu"
import { auth } from "@/auth";
import Image from "next/image";



export default async function Nav() {
  const sesion = await auth();

  return (
    <header className="flex justify-between px-10 w-screen bg-sky-400 dark:bg-gray-900 items-center font-bold p-2 sticky top-0 z-50 border-b-[3px] border-blue-400/90 dark:border-sky-600">
      <div className="flex items-center gap-2 lg:gap-10">
        <div className="lg:order-last">
          <Menu />
        </div>
        <div>
          <Logo />
        </div>
      </div>

      <div>
        <Login sesion={sesion}/>
      </div>
    </header>
  );
}


function Logo() {
  return (
    <nav className="bg-sky-400 border-gray-200 dark:bg-transparent">
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto">
        <div>
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              height={48} width={48}
              src="/cli-logo.svg"
              alt="FloWeather Logo"
            />
            <span className="hidden sm:block self-center text-2xl font-semibold whitespace-nowrap text-gray-900 dark:text-gray-100/80">
              FloWeather
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}


function Login({sesion}) {

  if (sesion) return (
      <Link href="/auth/logout">
        <button className="px-4 py-2 flex gap-2 items-center rounded-lg bg-white/80 dark:bg-blue-400/80 transition duration-500 hover:bg-white hover:shadow-xl ">
          <img
            src={sesion.user?.image ? sesion?.user.image : "/user.svg"}
            className="w-6 rounded-[50%]"
            alt="FloWeather Logo"
          /> Logout
        </button>
      </Link> )

  return (
      <Link href="/auth/login">
        <button className="px-4 py-2 flex gap-2 items-center rounded-lg bg-white/80 dark:bg-blue-400/80  transition duration-500 hover:bg-white hover:shadow-xl 	">
          <img
            src={"/logo-login.png"}
            className="w-6"
            alt="FloWeather Logo"
          /> Login
        </button>
      </Link>
  )

}