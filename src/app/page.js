import Tarjeta from "@/components/cards/contenedor";


export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Tarjeta>
          <h2 className="text-xl mb-4">
            Bienvenido a nuestra aplicación de climatización
          </h2>
          <p className="mb-2">
            Aquí puedes encontrar herramientas y recursos para optimizar el
            clima interior de tus espacios.
          </p>
          <p className="mb-2">Nuestros servicios incluyen:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Asesoramiento sobre sistemas de climatización eficientes.</li>
            <li>Pronósticos detallados sobre el clima interior y exterior.</li>
            <li>Control y ajuste remoto de la temperatura y humedad.</li>
            <li>Información sobre ahorro energético y sostenibilidad.</li>
          </ul>
          <p className="mb-4">
            Empieza hoy mismo a mejorar el ambiente de tus espacios con nuestra
            aplicación.
          </p>
  
        </Tarjeta>
      </div>
    </>
  );
}
