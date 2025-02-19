import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function page() {
  const sesion = await auth();

  if (sesion?.user.role !== "ADMIN") {
    redirect("/");
    return null;
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[70vh] text-[8vh]">
        <div className="text-center  text-stone-500 container  items-center border-2 border-red-700 p-8 rounded-md bg-amber-50/80">
          <h1>🔐 Admin panel</h1>
          <p>{sesion?.user.name}</p>
          <p> {sesion?.user.email} </p>
          <p> {sesion?.user.role} </p>
          <img src={sesion?.user.image}></img>
        </div>
      </div>
    </>
  );
}

export default page;
