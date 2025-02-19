import RegisterForm from '@/components/forms/register-credentials'
import Tarjeta from '@/components/cards/contenedor'


function page() {
  return (
    <div className="form flex flex-col items-center justify-center">
      <Tarjeta>
        <h1 className="text-4xl text-center font-bold mb-4">Registro</h1>
        <RegisterForm />
      </Tarjeta>
    </div>
  )
}

export default page