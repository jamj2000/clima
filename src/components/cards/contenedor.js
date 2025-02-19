
function Contenedor({ children }) {
  return (
    <div className="flex flex-col items-center justify-center text-blue-700 dark:text-blue-400 pb-20 2xl:mx-20">
      <div className="container items-center border-2 border-sky-400 dark:border-sky-700 p-4 sm:p-8 md:16 xl:32 rounded-md bg-gray-200/90 dark:bg-gray-900/90">
        {children}
      </div>
    </div>
  );
}

export default Contenedor;
