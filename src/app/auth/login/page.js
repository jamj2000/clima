import FormCredentials from "@/components/forms/login-credentials";
import FormOAuth from "@/components/forms/login-oauth";
import Tarjeta from "@/components/cards/contenedor";

const errors = new Map();
errors.set("OAuthSignin", "Error al construir una URL de autorización.");
errors.set(
  "OAuthCallback",
  "Error al manejar la respuesta de un proveedor de OAuth."
);
errors.set(
  "OAuthCreateAccount",
  "No se pudo crear un usuario proveedor de OAuth en la base de datos."
);
errors.set(
  "EmailCreateAccount",
  "No se pudo crear un usuario de proveedor de correo electrónico en la base de datos."
);
errors.set(
  "Callback",
  "Error en la ruta del controlador de devolución de llamada de OAuth."
);
errors.set(
  "OAuthAccountNotLinked",
  "Este email ya está registrado con otro proveedor, o ya esta vinculado a una cuenta con nuestros servicios"
);
errors.set("EmailSignin", "Comprueba tu dirección de correo electrónico.");
errors.set(
  "CredentialsSignin",
  "Fallo al iniciar sesion. Verifique que los datos que proporcionó sean correctos."
);
errors.set(
  "SessionRequired",
  "Error al iniciar sesión. Verifique que los detalles que proporcionó sean correctos."
);
errors.set("Default", "No se puede iniciar sesión.");

async function Page({ searchParams }) {
  const { error, callbackUrl } = await searchParams;
  // Usamos globalThis para almacenar variable global
  // La usaremos en los actions de login
  globalThis.callbackUrl = decodeURIComponent(callbackUrl ?? '%2Fproyectos');

  return (
    <div className="flex flex-col items-center justify-center">
      <Tarjeta>
        <h1 className="text-4xl text-center font-bold mb-4">Iniciar sesión</h1>
        {error && <h3 className="text-red-700">{errors.get(error)}</h3>}
        <FormCredentials />
        <FormOAuth error={error} />
      </Tarjeta>
    </div>
  );
}

export default Page;
