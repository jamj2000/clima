import {  loginGoogle } from "@/lib/actions/auth";

function OAuthForm() {
  return (
    <form className="container flex flex-col items-center gap-4  p-3 rounded-md ">
      <div className="flex flex-row">
        <button
          formAction={loginGoogle}
          className="bg-white/90 transition duration-500 border-4 border-sky-500 hover:bg-sky-200/90 bg-center bg-[url('/google.svg')] w-20 h-20 rounded-[50%] bg-no-repeat cursor-pointer dark:bg-gray-900/50 dark:hover:bg"
        ></button>
      </div>
    </form>
  );
}

export default OAuthForm;
