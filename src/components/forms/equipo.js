'use client'
import Boton from "@/components/boton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { readProyectos } from '@/lib/actions/proyecto'
import { readEquipo, createEquipo, updateEquipo, deleteEquipo, noAction } from '@/lib/actions/equipo'
import { CRUD } from "@/lib/constantes";

export default function FormEquipo({ id, userId, operacion }) {
  let action;
  let texto;
  let disabled;

  switch (operacion) {
    case CRUD.CREATE:
      texto = "Crear Equipo";
      action = createEquipo;
      disabled = false;
      break;
    case CRUD.READ:
      texto = "Volver";
      action = noAction;
      disabled = true;
      break;
    case CRUD.UPDATE:
      texto = "Actualizar Equipo";
      action = updateEquipo;
      disabled = false;
      break;
    case CRUD.DELETE:
      texto = "Eliminar Equipo";
      action = deleteEquipo;
      disabled = true;
      break;
    default:
  }

  const router = useRouter()

  const [isLoaded, setIsLoaded] = useState(false)
  const [equipo, setEquipo] = useState({})
  const [proyectos, setProyectos] = useState([])
  const [errores, setErrores] = useState(null)

  useEffect(() => {
    // Datos de Proyectos y Equipo
    async function fetchData() {
      const proyectos = await readProyectos({ userId, select: { id: true, nombre: true } })
      setProyectos(proyectos)

      if (id) {
        const equipo = await readEquipo({ id, include: { proyecto: true } })
        setEquipo(equipo)
      }
    }
    fetchData()

    setIsLoaded(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function wrapper(formData) {
    const errores = await action(formData);
    // console.log(errores);
    setErrores(errores)
    if (!errores) router.back()
  }

  if (isLoaded) return (
    <form action={wrapper}>
      <input type="hidden" name="id" defaultValue={id} />
      {disabled && <input type='hidden' name="proyectoId" value={equipo?.proyectoId} />}

      <div className={`text-red-700 rounded-md bg-red-50  ${errores ? 'block p-4' : 'hidden'}`}>
        <p className="uppercase mb-2 text-black">Errores detectados:</p>
        {errores
          && errores.map(({ campo, mensaje }, index) => (
            <div key={index}>
              <p className="font-light">{campo}</p>
              <p className="indent-10">{mensaje}</p>
            </div>))
        }
      </div>


      <div className="flex flex-col gap-4 justify-between items-center mb-4 md:flex-row">
        <Boton texto={texto} />
        <label className="grid grid-cols-[150px_auto] items-center gap-2">Proyecto asociado:
          {
            disabled
              ? <span className="font-bold">{equipo.proyecto?.nombre} </span>
              : <select
                name="proyectoId"
                className="border-2 border-gray-300 rounded p-2"
                value={equipo?.proyectoId}
                onChange={(e) => setEquipo({ ...equipo, proyectoId: e.target.value })}
              >
                {
                  proyectos
                    ?.map(proyecto => <option key={proyecto.id} value={proyecto.id}>  {proyecto.nombre}  </option>)
                }
              </select>
          }
        </label>
      </div>

      <fieldset disabled={disabled}>

        <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 xl:grid-cols-3">
          <div className="bg-slate-50 rounded-md p-4 grid items-center">
            <label className="grid grid-cols-[auto_140px] items-center gap-2">Nombre:

              <input
                type="text"
                name="nombre"
                value={equipo?.nombre}
                onChange={(e) => setEquipo({ ...equipo, nombre: e.target.value })}
                className="border-2 border-gray-300 rounded p-2 w-full"
              />
            </label>
          </div>

          <div className="bg-slate-50 rounded-md p-4 grid items-center">
            <label className="grid grid-cols-[auto_140px] items-center gap-2">Potencia (W)
              <input
                type="number"
                name="potencia"
                value={Number(equipo?.potencia)}
                onChange={(e) => setEquipo({ ...equipo, potencia: e.target.value })}
                className="border-2 border-gray-300 rounded p-2 w-full"
              />
            </label>
          </div>


          <div className="bg-slate-50 rounded-md p-4 grid items-center">
            <label className="grid grid-cols-[auto_140px] items-center gap-2">Factor funcimiento (%):
              <input
                type="number"
                name="factor_funcionamiento"
                value={Number(equipo?.factor_funcionamiento)}
                onChange={(e) => setEquipo({ ...equipo, factor_funcionamiento: e.target.value })}
                className="border-2 border-gray-300 rounded p-2 w-full"
              />
            </label>
          </div>
        </div>
      </fieldset>


    </form>
  );
}

