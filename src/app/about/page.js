import Tarjeta from "@/components/cards/contenedor";

export const dynamic = "force-static";

function About() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Tarjeta>
        <h1 className=" text-[4vh]">Sobre mí:</h1>
        <div className=" text-[2vh]">
          ¡Hola, soy Jose Manuel Garrido González, un desarrollador junior
          apasionado. Enfoco mi energía en crear una aplicacion web para el
          ciclo de climatologia utilizando Next.js y Tailwind. ¡Busco
          simplificar y enriquecer la experiencia de juego! Cada línea de código
          es un paso en mi aprendizaje, ¡y estoy emocionado por compartir esta
          aventura contigo! 🚀
          <div className="container bg-contain rounded-[50%] bg-no-repeat bg-center bg-[url('/icono.png')] w-full h-72"></div>
        </div>


        <h1 className="text-3xl font-bold mb-8">Contacto</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-4">
              Si tienes alguna pregunta o comentario, no dudes en ponerte en
              contacto con nosotros a través de nuestras redes sociales:
            </p>
            <ul className="flex flex-col space-y-4">
              <li>
                <a
                  href="https://twitter.com/ejemplo"
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/ejemplo"
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/ejemplo"
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/ejemplo"
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-lg mb-4">
              También puedes contactarnos por correo electrónico:
            </p>
            <p className="text-blue-500 hover:text-blue-700 transition duration-300">
              <a href="mailto:garrridocurso37@gmail.com">
                garrridocurso37@gmail.com
              </a>
            </p>
          </div>
        </div>


      </Tarjeta>
    </div>
  );
}

export default About;
