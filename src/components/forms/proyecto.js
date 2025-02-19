'use client'
import DropImagen from "@/components/imagen";
import Image from "next/image";
import Boton from "@/components/boton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CRUD, COPY } from '@/lib/constantes'
import { readProyecto, createProyecto, updateProyecto, deleteProyecto, copyProyecto, noAction } from '@/lib/actions/proyecto'
import { readLocalidades } from "@/lib/actions/localidad";

import {
  presion,

  p_sat_agua_ext_ver,
  hum_absol_ext_ver,
  entalpia_ext_ver_sens,
  entalpia_ext_ver_lat,
  volum_espe_ext_ver,
  p_sat_agua_ext_inv,
  hum_absol_ext_inv,
  entalpia_ext_inv_sens,
  entalpia_ext_inv_lat,
  volum_espe_ext_inv,

  p_sat_agua_int_ver,
  hum_absol_int_ver,
  entalpia_int_ver_sens,
  entalpia_int_ver_lat,
  volum_espe_int_ver,
  p_sat_agua_int_inv,
  hum_absol_int_inv,
  entalpia_int_inv_sens,
  entalpia_int_inv_lat,
  volum_espe_int_inv,
} from "@/lib/calculos"



function calcular(localidad) {
  const {
    altitud,
    temp_ext_ver, hum_ext_ver, temp_ext_inv, hum_ext_inv,
  } = localidad

  const temp_int_ver = 25;
  const temp_int_inv = 21;
  const hum_int_ver = 50;
  const hum_int_inv = 50;

  const _presion = presion(altitud)

  const _p_sat_agua_ext_ver = p_sat_agua_ext_ver(temp_ext_ver)
  const _hum_absol_ext_ver = hum_absol_ext_ver(hum_ext_ver, _p_sat_agua_ext_ver, _presion)
  const _entalpia_ext_ver_sens = entalpia_ext_ver_sens(temp_ext_ver, _hum_absol_ext_ver)
  const _entalpia_ext_ver_lat = entalpia_ext_ver_lat(_hum_absol_ext_ver)
  const _volum_espe_ext_ver = volum_espe_ext_ver(temp_ext_ver, _hum_absol_ext_ver, _presion)
  const _p_sat_agua_int_ver = p_sat_agua_int_ver(temp_int_ver)
  const _hum_absol_int_ver = hum_absol_int_ver(hum_int_ver, _p_sat_agua_int_ver, _presion)
  const _entalpia_int_ver_sens = entalpia_int_ver_sens(temp_int_ver, _hum_absol_int_ver)
  const _entalpia_int_ver_lat = entalpia_int_ver_lat(_hum_absol_int_ver)
  const _volum_espe_int_ver = volum_espe_int_ver(temp_int_ver, _hum_absol_int_ver, _presion)

  const _p_sat_agua_ext_inv = p_sat_agua_ext_inv(temp_ext_inv)
  const _hum_absol_ext_inv = hum_absol_ext_inv(hum_ext_inv, _p_sat_agua_ext_inv, _presion)
  const _entalpia_ext_inv_sens = entalpia_ext_inv_sens(temp_ext_inv, _hum_absol_ext_inv)
  const _entalpia_ext_inv_lat = entalpia_ext_inv_lat(_hum_absol_ext_inv)
  const _volum_espe_ext_inv = volum_espe_ext_inv(temp_ext_inv, _hum_absol_ext_inv, _presion)
  const _p_sat_agua_int_inv = p_sat_agua_int_inv(temp_int_inv)
  const _hum_absol_int_inv = hum_absol_int_inv(hum_int_inv, _p_sat_agua_int_inv, _presion)
  const _entalpia_int_inv_sens = entalpia_int_inv_sens(temp_int_inv, _hum_absol_int_inv)
  const _entalpia_int_inv_lat = entalpia_int_inv_lat(_hum_absol_int_inv)
  const _volum_espe_int_inv = volum_espe_int_inv(temp_int_inv, _hum_absol_int_inv, _presion)

  return {
    _presion,

    _p_sat_agua_ext_ver,
    _hum_absol_ext_ver,
    _entalpia_ext_ver_sens,
    _entalpia_ext_ver_lat,
    _volum_espe_ext_ver,
    _p_sat_agua_int_ver,
    _hum_absol_int_ver,
    _entalpia_int_ver_sens,
    _entalpia_int_ver_lat,
    _volum_espe_int_ver,

    _p_sat_agua_ext_inv,
    _hum_absol_ext_inv,
    _entalpia_ext_inv_sens,
    _entalpia_ext_inv_lat,
    _volum_espe_ext_inv,
    _p_sat_agua_int_inv,
    _hum_absol_int_inv,
    _entalpia_int_inv_sens,
    _entalpia_int_inv_lat,
    _volum_espe_int_inv,
  }

}



export function FormProyecto({ id, userId, operacion }) {

  let action;
  let texto;
  let disabled;

  switch (operacion) {
    case CRUD.CREATE:
      texto = "Crear Proyecto";
      action = createProyecto;
      disabled = false;
      break;
    case CRUD.READ:
      texto = "Volver";
      action = noAction;
      disabled = true;
      break;
    case CRUD.UPDATE:
      texto = "Actualizar Proyecto";
      action = updateProyecto;
      disabled = false;
      break;
    case CRUD.DELETE:
      texto = "Eliminar Proyecto";
      action = deleteProyecto;
      disabled = true;
      break;
    case COPY:
      texto = "Copiar Proyecto";
      action = copyProyecto;
      disabled = false;
      break;
    default:
  }

  const router = useRouter()

  const [isLoaded, setIsLoaded] = useState(false)
  const [localidades, setLocalidades] = useState([])
  const [proyecto, setProyecto] = useState({})
  const [localidad, setLocalidad] = useState({})
  const [errores, setErrores] = useState(null)
  const [calculo, setCalculo] = useState(calcular(localidad))

  useEffect(() => {
    // Para poder usar la rueda del ratón dentro de los inputs de tipo number
    const inputs = document.querySelectorAll("input[type='number']")
    inputs.forEach(input => input.addEventListener('wheel', () => { }));

    // Datos de Localidades y Proyecto
    async function fetchData() {
      const localidades = await readLocalidades()
      setLocalidades(localidades)
      setLocalidad(localidades[0])

      if (id) {
        const proyecto = await readProyecto({ id, include: { localidad: { include: { zona_climatica: true } } } })
        if (operacion == COPY) {
          setProyecto({ ...proyecto, nombre: proyecto.nombre + ' - Copia', fecha: new Date() })
        }
        else {
          setProyecto(proyecto)
        }
        setLocalidad(proyecto.localidad)
      }

    }
    fetchData()

    setIsLoaded(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    setCalculo(calcular(localidad))
  }, [localidad])

  function updateLocalidad(e) {
    setLocalidad(localidades.find(localidad => localidad.id == e.target.value))
    const resultado = calcular(localidad)
    setCalculo(resultado)
  }

  async function wrapper(formData) {
    const errores = await action(formData);
    // console.log(errores);
    setErrores(errores)
    if (!errores) router.back()
  }

  if (isLoaded) return (
    <form action={wrapper}>
      <input type="hidden" name="id" defaultValue={id} />
      <input type="hidden" name="userId" defaultValue={userId} />

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
      </div>


      <fieldset disabled={disabled}>

        <details open className="mt-4 p-4 border rounded shadow-md">
          <summary className="font-bold">PROYECTO:
            <input
              type="text"
              name="nombre"
              maxLength={50}
              defaultValue={proyecto?.nombre}
              className="border-2 border-gray-300 rounded ml-2 p-2 text-center"
            />
          </summary>


          <div className="mt-4 p-4 border rounded shadow-md grid gap-4 md:grid-cols-[auto_160px]">
            <div className="relative">
              <label className="font-bold">Localidad:

                <select name="localidadId" className="text-left border-2 border-gray-300 rounded p-2 w-full"
                  value={localidad.id}
                  onChange={updateLocalidad} >
                  {
                    localidades
                      .map(localidad => <option key={localidad.id} value={localidad.id}>{localidad.nombre} </option>)
                  }
                </select>
              </label>

            </div>
            <div>
              <label className="font-bold">Fecha de Proyecto:
                <input
                  className="border-2 border-gray-300 rounded p-2 w-full"
                  type="date"
                  name="fecha"
                  defaultValue={proyecto?.fecha?.toISOString().split("T")[0]}
                />
              </label>
            </div>
          </div>
        </details>

        <details open className="mt-4 p-4 border rounded shadow-md">
          <summary>DATOS: </summary>

          <div className="mt-4 grid gap-1 items-stretch sm:grid-cols-1 md:grid-cols-[300px_auto] xl:grid-cols-[500px_auto]">
            <div className="mb-2">
              <div className="flex justify-center">
                <input type="hidden" name="imagen" defaultValue={proyecto?.imagen} />
                <DropImagen
                  imgUrl={proyecto?.imagen || "/project-image-default.jpg"}
                  alt="Logo de proyecto"
                  className="w-120 h-72 rounded object-cover"
                />
              </div>
            </div>
            <div className="bg-slate-50 rounded-md p-4">
              <textarea
                name="comentarios"
                placeholder="Comentarios"
                title="Añadir comentario del proyecto"
                maxLength={300}
                defaultValue={proyecto?.comentarios}
                className="border-2 border-gray-300 rounded p-2 w-full h-24"
              />
            </div>
          </div>

          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 x  l:grid-cols-4">
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  Numero personas:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Numero de personas"
                  />
                </div>

                <input
                  type="number"
                  name="numero_personas"
                  step={1}
                  max={1000}
                  min={0}
                  defaultValue={proyecto?.numero_personas}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  Ocupacion de las personas:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Este campo identifica la ocupacion de las personas"
                  />
                </div>

                <select
                  name="ocupacion_personas"
                  // defaultValue={proyecto?.ocupacion_personas} // No usamos defaultValue sino value, para actualizar select
                  value={proyecto?.ocupacion_personas}
                  onChange={(e) => setProyecto({ ...proyecto, ocupacion_personas: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="sedentario">Sedentaria</option>
                  <option value="activo">Activa</option>
                </select>
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  Carga sensible por persona:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="w por persona"
                  />
                </div>

                <input
                  type="number"
                  name="w_persona"
                  step={0.01}
                  defaultValue={proyecto?.w_persona}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  Caudales por IDA:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Caudales por IDA"
                  />
                </div>

                <input
                  type="number"
                  name="caudales_ida"
                  step={0.01}
                  defaultValue={proyecto?.caudales_ida}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  Caudales de aire m3:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Caudales de aire m3"
                  />
                </div>

                <input
                  type="number"
                  name="caudales_aire"
                  step={0.01}
                  defaultValue={proyecto?.caudales_aire}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  Tipo lámpara:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Permite introducir el tipo de lámpara"
                  />
                </div>

                <select
                  name="tipo_lampara"
                  // defaultValue={proyecto?.tipo_lampara} // No usamos defaultValue sino value, para actualizar select
                  value={proyecto?.tipo_lampara}
                  onChange={(e) => setProyecto({ ...proyecto, tipo_lampara: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="fluorescente">Fluorescente</option>
                  <option value="led">LED</option>
                </select>
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  Potencia luminica:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Permite introducir la potencia luminica"
                  />
                </div>

                <input
                  type="number"
                  name="potencia_lampara"
                  step={0.01}
                  defaultValue={proyecto?.potencia_lampara}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  Factor seguridad:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Permite introducir el valor de seguridad"
                  />
                </div>

                <input
                  type="number"
                  name="valor_seguridad"
                  defaultValue={proyecto?.valor_seguridad}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  Carga latente por persona:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="permite introducir el valor de carga latente"
                  />
                </div>

                <input
                  type="number"
                  name="carga_latente"
                  defaultValue={proyecto?.carga_latente}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  ODA:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Valor de ODA"
                  />
                </div>

                <select
                  name="oda"
                  // defaultValue={proyecto?.oda} // No usamos defaultValue sino value, para actualizar select
                  value={proyecto?.oda}
                  onChange={(e) => setProyecto({ ...proyecto, oda: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="oda1">ODA 1</option>
                  <option value="oda2">ODA 2</option>
                  <option value="oda3">ODA 3</option>
                </select>
              </label>
            </div>
          </div>
        </details>


        <details className="mt-4 p-4 border rounded shadow-md">
          <summary>MÉTRICAS BASE</summary>
          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 xl:grid-cols-4">
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  Temperatura (Verano):
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Valor de temperatura verano"
                  />
                </div>

                <input
                  readOnly
                  type="number"
                  name="temp_ext_ver"
                  value={localidad?.temp_ext_ver}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  Humedad (Verano):
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Valor de humedad verano"
                  />
                </div>

                <input
                  readOnly
                  type="number"
                  name="hum_ext_ver"
                  value={localidad?.hum_ext_ver}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  Temperatura (Invierno):
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Valor de temperatura invierno"
                  />
                </div>

                <input
                  readOnly
                  type="number"
                  name="temp_ext_inv"
                  value={localidad?.temp_ext_inv}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  Humedad (Invierno):
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Valor de humedad invierno"
                  />
                </div>

                <input
                  readOnly
                  type="number"
                  name="hum_ext_inv"
                  value={localidad?.hum_ext_inv}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>


            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  Altitud:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Valor de altitud"
                  />
                </div>

                <input
                  readOnly
                  type="number"
                  name="altitud"
                  value={localidad?.altitud}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>


            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  Presion:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Valor de altitud"
                  />
                </div>

                <input
                  readOnly
                  type="number"
                  name="presion"
                  value={calculo._presion.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  Zona climatica:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Valor de zona climatica"
                  />
                </div>

                <input
                  readOnly
                  name="zona_climatica"
                  value={localidad?.zona_climatica?.id}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

          </div>


          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 xl:grid-cols-4">
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  us/um:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Valor de us/um"
                  />
                </div>

                <input
                  readOnly
                  type="number"
                  name="us_um"
                  value={localidad?.zona_climatica?.exterior?.us_um}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  uc:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Valor de uc"
                  />
                </div>

                <input
                  readOnly
                  type="number"
                  name="uc"
                  value={localidad?.zona_climatica?.exterior?.uc}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  ut/umd:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Valor de ut/umd"
                  />
                </div>

                <input
                  readOnly
                  type="number"
                  name="ut_umd"
                  value={localidad?.zona_climatica?.exterior?.ut_umd}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  uh:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Valor de uh"
                  />
                </div>

                <input
                  readOnly
                  type="number"
                  name="uh"
                  value={localidad?.zona_climatica?.exterior?.uh}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  up:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Valor de up"
                  />
                </div>

                <input
                  readOnly
                  type="number"
                  name="up"
                  value={localidad?.zona_climatica?.exterior?.up}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  uph:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Valor de uph"
                  />
                </div>

                <input
                  readOnly
                  type="number"
                  name="uph"
                  value={localidad?.zona_climatica?.exterior?.uph}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  upv:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Valor de upv"
                  />
                </div>

                <input
                  readOnly
                  type="number"
                  name="upv"
                  value={localidad?.zona_climatica?.exterior?.upv}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  uphv:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Valor de uphv"
                  />
                </div>

                <input
                  readOnly
                  type="number"
                  name="uphv"
                  value={localidad?.zona_climatica?.exterior?.uphv}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
          </div>

          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 xl:grid-cols-4">
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  TPH:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Valor de TPH"
                  />
                </div>

                <input
                  readOnly
                  type="number"
                  name="tph"
                  value={localidad?.zona_climatica?.interior?.TPH}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  TPV:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Valor de TPV"
                  />
                </div>

                <input
                  readOnly
                  type="number"
                  name="tpv"
                  value={localidad?.zona_climatica?.interior?.TPV}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between items-center">
                  TPHV:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title="Valor de TPV / TPH"
                  />
                </div>

                <input
                  readOnly
                  type="number"
                  name="tphv"
                  value={localidad?.zona_climatica?.interior?.TPHV}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
          </div>
        </details>


        <details className="mt-4 p-4 border rounded shadow-md">
          <summary>VERANO en el EXTERIOR</summary>
          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 xl:grid-cols-4">

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Saturación del agua:

                <input
                  readOnly
                  type="number"
                  name="p_sat_agua_ext_ver"
                  step={0.01}
                  value={calculo._p_sat_agua_ext_ver.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Humedad absoluta:

                <input
                  readOnly
                  type="number"
                  name="hum_absol_ext_ver"
                  step={0.01}
                  value={calculo._hum_absol_ext_ver.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Entalpia sens:

                <input
                  readOnly
                  type="number"
                  name="entalpia_ext_ver_sens"
                  step={0.01}
                  value={calculo._entalpia_ext_ver_sens.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>


            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Entalpia lat:

                <input
                  readOnly
                  type="number"
                  name="entalpia_ext_ver_lat"
                  step={0.01}
                  value={calculo._entalpia_ext_ver_lat.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>


            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Volumen específico:

                <input
                  readOnly
                  type="number"
                  name="volum_espe_ext_ver"
                  step={0.01}
                  value={calculo._volum_espe_ext_ver.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>


          </div>
        </details>


        <details className="mt-4 p-4 border rounded shadow-md">
          <summary>VERANO en el INTERIOR</summary>
          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 xl:grid-cols-4">

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Saturación del agua:

                <input
                  readOnly
                  type="number"
                  name="p_sat_agua_int_ver"
                  step={0.01}
                  value={calculo._p_sat_agua_int_ver.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Humedad absoluta:

                <input
                  readOnly
                  type="number"
                  name="hum_absol_int_ver"
                  step={0.01}
                  value={calculo._hum_absol_int_ver.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Entalpia sens:

                <input
                  readOnly
                  type="number"
                  name="entalpia_int_ver_sens"
                  step={0.01}
                  value={calculo._entalpia_int_ver_sens.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>


            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Entalpia lat:

                <input
                  readOnly
                  type="number"
                  name="entalpia_int_ver_lat"
                  step={0.01}
                  value={calculo._entalpia_int_ver_lat.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>


            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Volumen específico:

                <input
                  readOnly
                  type="number"
                  name="volum_espe_int_ver"
                  step={0.01}
                  value={calculo._volum_espe_int_ver.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>


          </div>
        </details>


        <details className="mt-4 p-4 border rounded shadow-md">
          <summary>INVIERNO en el EXTERIOR</summary>
          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 xl:grid-cols-4">

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Saturación del agua:

                <input
                  readOnly
                  type="number"
                  name="p_sat_agua_ext_inv"
                  step={0.01}
                  value={calculo._p_sat_agua_ext_inv.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Humedad absoluta:

                <input
                  readOnly
                  type="number"
                  name="hum_absol_ext_inv"
                  step={0.01}
                  value={calculo._hum_absol_ext_inv.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Entalpia sens:

                <input
                  readOnly
                  type="number"
                  name="entalpia_ext_inv_sens"
                  step={0.01}
                  value={calculo._entalpia_ext_inv_sens.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>


            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Entalpia lat:

                <input
                  readOnly
                  type="number"
                  name="entalpia_ext_inv_lat"
                  step={0.01}
                  value={calculo._entalpia_ext_inv_lat.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>


            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Volumen específico:

                <input
                  readOnly
                  type="number"
                  name="volum_espe_ext_inv"
                  step={0.01}
                  value={calculo._volum_espe_ext_inv.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>


          </div>
        </details>


        <details className="mt-4 p-4 border rounded shadow-md">
          <summary>INVIERNO en el INTERIOR</summary>
          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 xl:grid-cols-4">

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Saturación del agua:

                <input
                  readOnly
                  type="number"
                  name="p_sat_agua_int_inv"
                  step={0.01}
                  value={calculo._p_sat_agua_int_inv.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Humedad absoluta:

                <input
                  readOnly
                  type="number"
                  name="hum_absol_int_inv"
                  step={0.01}
                  value={calculo._hum_absol_int_inv.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Entalpia sens:

                <input
                  readOnly
                  type="number"
                  name="entalpia_int_inv_sens"
                  step={0.01}
                  value={calculo._entalpia_int_inv_sens.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>


            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Entalpia lat:

                <input
                  readOnly
                  type="number"
                  name="entalpia_int_inv_lat"
                  step={0.01}
                  value={calculo._entalpia_int_inv_lat.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>


            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Volumen específico:

                <input
                  readOnly
                  type="number"
                  name="volum_espe_int_inv"
                  step={0.01}
                  value={calculo._volum_espe_int_inv.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>


          </div>
        </details>


      </fieldset>

    </form>
  );
}



export default FormProyecto;
