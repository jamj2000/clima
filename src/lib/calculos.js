
// TODAS LAS FUNCIONES

const funciones = {
  // PROYECTO
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

  // RECINTO
}

export default funciones;




// FUNCIONES PARA PROYECTO

export function presion(altitud) {
  let total =
    101325 *
    Math.pow(
      1 - (0.0065 / (15 + 273.15)) * altitud,
      9.807 / 0.2883419 / 0.0065 / 1000
    );
  return total;
}

export function p_sat_agua_ext_ver(temp_ext_ver) {
  let total = Math.exp(
    -5800.2206 * Math.pow(temp_ext_ver + 273.15, -1) +
    1.3914993 -
    0.048640239 * (temp_ext_ver + 273.15) +
    0.000041764768 * Math.pow(temp_ext_ver + 273.15, 2) -
    0.000000014452093 * Math.pow(temp_ext_ver + 273.15, 3) +
    6.5459673 * Math.log(temp_ext_ver + 273.15)
  );
  return total;
}

export function hum_absol_ext_ver(
  hum_ext_ver,
  p_sat_agua_ext_ver,
  presion
) {
  let total =
    (1000 * 0.62198 * (hum_ext_ver / 100) * p_sat_agua_ext_ver) /
    (presion - (hum_ext_ver / 100) * p_sat_agua_ext_ver);
  return total;
}

export function entalpia_ext_ver_sens(temp_ext_ver, hum_absol_ext_ver) {
  let total =
    (1.006 * temp_ext_ver +
      (hum_absol_ext_ver / 1000) * (1.89 * temp_ext_ver)) *
    1000;

  return total;
}

export function entalpia_ext_ver_lat(hum_absol_ext_ver) {
  let total = (hum_absol_ext_ver / 1000) * 2501.3 * 1000;
  return total;
}

export function volum_espe_ext_ver(
  temp_ext_ver,
  hum_absol_ext_ver,
  presion
) {
  let total =
    (0.2870551882 *
      (temp_ext_ver + 273.15) *
      (1 + (1.6078 * hum_absol_ext_ver) / 1000)) /
    (presion / 1000);
  return total;
}

export function p_sat_agua_ext_inv(temp_ext_inv) {
  let total = Math.exp(
    -5800.2206 * Math.pow(temp_ext_inv + 273.15, -1) +
    1.3914993 -
    0.048640239 * (temp_ext_inv + 273.15) +
    0.000041764768 * Math.pow(temp_ext_inv + 273.15, 2) -
    0.000000014452093 * Math.pow(temp_ext_inv + 273.15, 3) +
    6.5459673 * Math.log(temp_ext_inv + 273.15)
  );
  return total;
}

export function hum_absol_ext_inv(
  hum_ext_inv,
  p_sat_agua_ext_inv,
  presion
) {
  let total =
    (1000 * 0.62198 * (hum_ext_inv / 100) * p_sat_agua_ext_inv) /
    (presion - (hum_ext_inv / 100) * p_sat_agua_ext_inv);
  return total;
}

export function entalpia_ext_inv_sens(temp_ext_inv, hum_absol_ext_inv) {
  let total =
    (1.006 * temp_ext_inv +
      (hum_absol_ext_inv / 1000) * (1.89 * temp_ext_inv)) *
    1000;
  return total;
}

export function entalpia_ext_inv_lat(hum_absol_ext_inv) {
  let total = (hum_absol_ext_inv / 1000) * 2501.3 * 1000;
  return total;
}

export function volum_espe_ext_inv(
  temp_ext_inv,
  hum_absol_ext_inv,
  presion
) {
  let total =
    (0.2870551882 *
      (temp_ext_inv + 273.15) *
      (1 + (1.6078 * hum_absol_ext_inv) / 1000)) /
    (presion / 1000);
  return total;
}

export function p_sat_agua_int_ver(temp_int_ver) {
  let total = Math.exp(
    -5800.2206 * Math.pow(temp_int_ver + 273.15, -1) +
    1.3914993 -
    0.048640239 * (temp_int_ver + 273.15) +
    0.000041764768 * Math.pow(temp_int_ver + 273.15, 2) -
    0.000000014452093 * Math.pow(temp_int_ver + 273.15, 3) +
    6.5459673 * Math.log(temp_int_ver + 273.15)
  );
  return total;
}

export function hum_absol_int_ver(
  hum_int_ver,
  p_sat_agua_int_ver,
  presion
) {
  let total =
    (1000 * 0.62198 * (hum_int_ver / 100) * p_sat_agua_int_ver) /
    (presion - (hum_int_ver / 100) * p_sat_agua_int_ver);
  return total;
}

export function entalpia_int_ver_sens(temp_int_ver, hum_absol_int_ver) {
  let total =
    (1.006 * temp_int_ver +
      (hum_absol_int_ver / 1000) * (1.89 * temp_int_ver)) *
    1000;
  return total;
}

export function entalpia_int_ver_lat(hum_absol_int_ver) {
  let total = (hum_absol_int_ver / 1000) * 2501.3 * 1000;
  return total;
}

export function volum_espe_int_ver(
  temp_int_ver,
  hum_absol_int_ver,
  presion
) {
  let total =
    (0.2870551882 *
      (temp_int_ver + 273.15) *
      (1 + (1.6078 * hum_absol_int_ver) / 1000)) /
    (presion / 1000);
  return total;
}

export function p_sat_agua_int_inv(temp_int_inv) {
  let total = Math.exp(
    -5800.2206 * Math.pow(temp_int_inv + 273.15, -1) +
    1.3914993 -
    0.048640239 * (temp_int_inv + 273.15) +
    0.000041764768 * Math.pow(temp_int_inv + 273.15, 2) -
    0.000000014452093 * Math.pow(temp_int_inv + 273.15, 3) +
    6.5459673 * Math.log(temp_int_inv + 273.15)
  );
  return total;
}

export function hum_absol_int_inv(
  hum_int_ver,
  p_sat_agua_int_ver,
  presion
) {
  let total =
    (1000 * 0.62198 * (hum_int_ver / 100) * p_sat_agua_int_ver) /
    (presion - (hum_int_ver / 100) * p_sat_agua_int_ver);
  return total;
}

export function entalpia_int_inv_sens(temp_int_inv, hum_absol_int_inv) {
  let total =
    (1.006 * temp_int_inv +
      (hum_absol_int_inv / 1000) * (1.89 * temp_int_inv)) *
    1000;
  return total;
}

export function entalpia_int_inv_lat(hum_absol_int_inv) {
  let total = (hum_absol_int_inv / 1000) * 2501.3 * 1000;
  return total;
}

export function volum_espe_int_inv(
  temp_int_inv,
  hum_absol_int_inv,
  presion
) {
  let total =
    (0.2870551882 *
      (temp_int_inv + 273.15) *
      (1 + (1.6078 * hum_absol_int_inv) / 1000)) /
    (presion / 1000);
  return total;
}




// FUNCIONES PARA RECINTO


















// /////////////
//temp_int_ver	25
//temp_int_inv	21
//hum_int_ver	50
//hum_int_inv	50
///////////////


// fs  1   // ¿Qué es fs?. No tengo información, así que le coloco valor 1, para testeo

/*invierno
// qi_sens_trans	(k_cerr1*(sup_cerr1-sup_vid_cerr1-sup_puer_cerr1)*(temp_int_inv-temp_cerr1_inv))+(k_cerr2*(sup_cerr2-sup_vid_cerr2-sup_puer_cerr2)*(temp_int_inv-temp_cerr2_inv))+(k_cerr3*(sup_cerr3-sup_vid_cerr3-sup_puer_cerr3)*(temp_int_inv-temp_cerr3_inv))+(k_cerr4*(sup_cerr4-sup_vid_cerr4-sup_puer_cerr4)*(temp_int_inv-temp_cerr4_inv))+(k_techo*(sup_techo-sup_vid_techo-sup_puer_techo)*(temp_int_inv-temp_techo_inv))+(k_suelo*(sup_suelo)*(temp_int_inv-temp_suelo_inv))
// qi_sens_renov	(caudal_aire/3600)*(1/volum_espe_int_inv)*(entalpia_ext_inv_sens-entalpia_int_inv_sens)*1.1
// qc_sens	qi_sens_trans+qi_sens_renov
// qc	qc_sens*(1+fs/100)
*/



/*
export function qc_sens(qi_sens_trans, qi_sens_renov) {
  console.log("SENSITIVO:", qi_sens_trans, qi_sens_renov);
  let total = qi_sens_trans + qi_sens_renov;
  return total;
}

export function qc(qc_sens, fs) {
  let total = qc_sens * (1 - fs / 100);
  return total;
}
export function qi_sens_trans(
  proyecto,
  k_cerr1,
  sup_cerr1,
  sup_vid_cerr1,
  sup_puer_cerr1,
  temp_int_inv,
  temp_cerr1_inv,
  k_vid_cerr1,
  k_puer_cerr1,
  k_cerr2,
  sup_cerr2,
  sup_vid_cerr2,
  sup_puer_cerr2,
  temp_cerr2_inv,
  k_vid_cerr2,
  k_puer_cerr2,
  k_cerr3,
  sup_cerr3,
  sup_vid_cerr3,
  sup_puer_cerr3,
  temp_cerr3_inv,
  k_vid_cerr3,
  k_puer_cerr3,
  k_cerr4,
  sup_cerr4,
  sup_vid_cerr4,
  sup_puer_cerr4,
  temp_cerr4_inv,
  k_vid_cerr4,
  k_puer_cerr4,
  k_techo,
  sup_techo,
  sup_vid_techo,
  sup_puer_techo,
  temp_techo_inv,
  k_vid_techo,
  k_puer_techo,
  k_suelo,
  sup_suelo,
  temp_suelo_inv
) {
  // Validar los valores de entrada
  const checkNumber = (value, defaultValue = 0) =>
    typeof value === "number" && !isNaN(value) ? value : defaultValue;

  k_cerr1 = checkNumber(k_cerr1);
  sup_cerr1 = checkNumber(sup_cerr1);
  sup_vid_cerr1 = checkNumber(sup_vid_cerr1);
  sup_puer_cerr1 = checkNumber(sup_puer_cerr1);
  temp_int_inv = checkNumber(temp_int_inv);
  temp_cerr1_inv = checkNumber(temp_cerr1_inv);
  k_vid_cerr1 = checkNumber(k_vid_cerr1);
  k_puer_cerr1 = checkNumber(k_puer_cerr1);
  k_cerr2 = checkNumber(k_cerr2);
  sup_cerr2 = checkNumber(sup_cerr2);
  sup_vid_cerr2 = checkNumber(sup_vid_cerr2);
  sup_puer_cerr2 = checkNumber(sup_puer_cerr2);
  temp_cerr2_inv = checkNumber(temp_cerr2_inv);
  k_vid_cerr2 = checkNumber(k_vid_cerr2);
  k_puer_cerr2 = checkNumber(k_puer_cerr2);
  k_cerr3 = checkNumber(k_cerr3);
  sup_cerr3 = checkNumber(sup_cerr3);
  sup_vid_cerr3 = checkNumber(sup_vid_cerr3);
  sup_puer_cerr3 = checkNumber(sup_puer_cerr3);
  temp_cerr3_inv = checkNumber(temp_cerr3_inv);
  k_vid_cerr3 = checkNumber(k_vid_cerr3);
  k_puer_cerr3 = checkNumber(k_puer_cerr3);
  k_cerr4 = checkNumber(k_cerr4);
  sup_cerr4 = checkNumber(sup_cerr4);
  sup_vid_cerr4 = checkNumber(sup_vid_cerr4);
  sup_puer_cerr4 = checkNumber(sup_puer_cerr4);
  temp_cerr4_inv = checkNumber(temp_cerr4_inv);
  k_vid_cerr4 = checkNumber(k_vid_cerr4);
  k_puer_cerr4 = checkNumber(k_puer_cerr4);
  k_techo = checkNumber(k_techo);
  sup_techo = checkNumber(sup_techo);
  sup_vid_techo = checkNumber(sup_vid_techo);
  sup_puer_techo = checkNumber(sup_puer_techo);
  temp_techo_inv = checkNumber(temp_techo_inv);
  k_vid_techo = checkNumber(k_vid_techo);
  k_puer_techo = checkNumber(k_puer_techo);
  k_suelo = checkNumber(k_suelo);
  sup_suelo = checkNumber(sup_suelo);
  temp_suelo_inv = checkNumber(temp_suelo_inv);

  // Calcular la ganancia de calor sensible por transmisión
  const qi_sens_trans =
    k_cerr1 *
      (sup_cerr1 - sup_vid_cerr1 - sup_puer_cerr1) *
      (temp_int_inv - temp_cerr1_inv) +
    k_vid_cerr1 * sup_vid_cerr1 * (temp_int_inv - temp_cerr1_inv) +
    k_puer_cerr1 * sup_puer_cerr1 * (temp_int_inv - temp_cerr1_inv) +
    k_cerr2 *
      (sup_cerr2 - sup_vid_cerr2 - sup_puer_cerr2) *
      (temp_int_inv - temp_cerr2_inv) +
    k_vid_cerr2 * sup_vid_cerr2 * (temp_int_inv - temp_cerr2_inv) +
    k_puer_cerr2 * sup_puer_cerr2 * (temp_int_inv - temp_cerr2_inv) +
    k_cerr3 *
      (sup_cerr3 - sup_vid_cerr3 - sup_puer_cerr3) *
      (temp_int_inv - temp_cerr3_inv) +
    k_vid_cerr3 * sup_vid_cerr3 * (temp_int_inv - temp_cerr3_inv) +
    k_puer_cerr3 * sup_puer_cerr3 * (temp_int_inv - temp_cerr3_inv) +
    k_cerr4 *
      (sup_cerr4 - sup_vid_cerr4 - sup_puer_cerr4) *
      (temp_int_inv - temp_cerr4_inv) +
    k_vid_cerr4 * sup_vid_cerr4 * (temp_int_inv - temp_cerr4_inv) +
    k_puer_cerr4 * sup_puer_cerr4 * (temp_int_inv - temp_cerr4_inv) +
    k_techo *
      (sup_techo - sup_vid_techo - sup_puer_techo) *
      (temp_int_inv - temp_techo_inv) +
    k_vid_techo * sup_vid_techo * (temp_int_inv - temp_techo_inv) +
    k_puer_techo * sup_puer_techo * (temp_int_inv - temp_techo_inv) +
    k_suelo * sup_suelo * (temp_int_inv - temp_suelo_inv);

  return qi_sens_trans;
}
export function qr_sens(
  qv_sens_rad,
  qv_sens_trans,
  qv_sens_renov,
  qv_sens_ocup,
  qv_sens_ilum,
  qv_sens_equip
) {
  console.log(
    qv_sens_rad,
    qv_sens_trans,
    qv_sens_renov,
    qv_sens_ocup,
    qv_sens_ilum
  );
  const total =
    qv_sens_rad +
    qv_sens_trans +
    qv_sens_renov +
    qv_sens_ocup +
    qv_sens_ilum +
    qv_sens_equip;

  return Number(total);
}

export function qi_sens_renov(
  caudal_aire,
  volum_espe_int_inv,
  entalpia_ext_inv_sens,
  entalpia_int_inv_sens
) {
  let total =
    (caudal_aire / 3600) *
    (1 / volum_espe_int_inv) *
    (entalpia_ext_inv_sens - entalpia_int_inv_sens) *
    1.1;
  console.log(
    "RENOV: ",
    caudal_aire,
    volum_espe_int_inv,
    entalpia_ext_inv_sens,
    entalpia_int_inv_sens,
    total
  );
  return total;
}

export function qv_lat_renov(
  caudal_aire,
  volum_espe_int_ver,
  entalpia_ext_ver_lat,
  entalpia_int_ver_lat
) {
  return (
    (caudal_aire / 3600) *
    (1 / volum_espe_int_ver) *
    (entalpia_ext_ver_lat - entalpia_int_ver_lat) *
    1.1
  );
}
export function qv_lat_ocup(ql_pers, ocupacion) {
  const ocupacionFactor = ocupacion === "sedentario" ? 70 : 150;
  return ql_pers * ocupacionFactor;
}

export function qr_lat(qv_lat_renov, qv_lat_ocup) {
  return qv_lat_renov + qv_lat_ocup;
}
export function qr(qr_sens, qr_lat, fs) {
  console.log("lolololo", qr_sens, qr_lat, fs);
  return (qr_sens + qr_lat) * (1 + fs / 100);
}
export function qv_sens_rad(
  rad_cerr1,
  sup_vid_cerr1,
  tipo_vidrio_cerr1,
  rad_cerr2,
  sup_vid_cerr2,
  tipo_vidrio_cerr2,
  rad_cerr3,
  sup_vid_cerr3,
  tipo_vidrio_cerr3,
  rad_cerr4,
  sup_vid_cerr4,
  tipo_vidrio_cerr4,
  rad_techo,
  sup_vid_techo,
  tipo_vidrio_techo
) {
  // Objeto de mapeo para las cadenas de dirección a valores numéricos
  const valoresDireccion = {
    norte: 38,
    noreste: 32,
    este: 32,
    sureste: 32,
    sur: 49,
    suroste: 423,
    oeste: 556,
    noroeste: 350,
    horizonte: 372,
  };

  // Objeto de mapeo para los tipos de vidrio a sus valores numéricos
  const valoresVidrio = {
    normal: 1,
    doble: [0.8, 0.9],
    triple: [0.7, 0.8],
    baja_emisividad: [0.1, 0.5],
  };

  // Función para obtener el valor numérico correspondiente a la cadena de dirección
  function obtenerValorDireccion(cadena) {
    return valoresDireccion[cadena] || 0; // Devuelve 0 si la cadena no está en el objeto de mapeo
  }

  // Función para obtener el valor numérico correspondiente al tipo de vidrio
  function obtenerValorVidrio(cadena) {
    const valor = valoresVidrio[cadena];
    if (Array.isArray(valor)) {
      // Si es un array, devuelve el primer valor
      return valor[0];
    } else {
      // Si es un valor normal, lo devuelve directamente
      return valor;
    }
  }

  // Obtener valores numéricos para las cadenas de dirección y tipo de vidrio proporcionadas
  const rad_cerr1_valor = obtenerValorDireccion(rad_cerr1);

  const rad_cerr2_valor = obtenerValorDireccion(rad_cerr2);
  const rad_cerr3_valor = obtenerValorDireccion(rad_cerr3);
  const rad_cerr4_valor = obtenerValorDireccion(rad_cerr4);
  const rad_techo_valor = obtenerValorDireccion(rad_techo);

  const f_cerr1 = obtenerValorVidrio(tipo_vidrio_cerr1);
  const f_cerr2 = obtenerValorVidrio(tipo_vidrio_cerr2);
  const f_cerr3 = obtenerValorVidrio(tipo_vidrio_cerr3);
  const f_cerr4 = obtenerValorVidrio(tipo_vidrio_cerr4);
  const f_techo = obtenerValorVidrio(tipo_vidrio_techo);

  // Calcula el resto de la función utilizando los valores numéricos
  return (
    rad_cerr1_valor * sup_vid_cerr1 * f_cerr1 +
    rad_cerr2_valor * sup_vid_cerr2 * f_cerr2 +
    rad_cerr3_valor * sup_vid_cerr3 * f_cerr3 +
    rad_cerr4_valor * sup_vid_cerr4 * f_cerr4 +
    rad_techo_valor * sup_vid_techo * f_techo
  );
}

export function qv_sens_renov(
  caudal_aire,
  volum_espe_int_ver,
  entalpia_ext_ver_sens,
  entalpia_int_ver_sens
) {
  console.log(
    entalpia_ext_ver_sens,
    entalpia_int_ver_sens,
    volum_espe_int_ver,
    caudal_aire
  );
  return (
    (caudal_aire / 3600) *
    (1 / volum_espe_int_ver) *
    (entalpia_ext_ver_sens - entalpia_int_ver_sens) *
    1.1
  );
}

export function qv_sens_ocup(qs_pers, ocupacion) {
  console.log("qs_pers:", qs_pers);
  console.log("ocupacion:", ocupacion);

  if (typeof qs_pers !== "number" || isNaN(qs_pers)) {
    console.error("qs_pers debe ser un número válido");
    return 0; // o lanzar un error
  }

  if (ocupacion !== "sedentario" && ocupacion !== "activo") {
    console.error("ocupacion debe ser 'sedentario' o 'activo'");
    return 0; // o lanzar un error
  }

  const valor_ocupacion = ocupacion === "sedentario" ? 70 : 150;

  console.log("valor_ocupacion:", valor_ocupacion);

  const qv_sens_ocup = qs_pers * valor_ocupacion;

  console.log("qv_sens_ocup:", qv_sens_ocup);

  return qv_sens_ocup;
}
export function qv_sens_ilum(iluminacion, sup_suelo, tipo_luz) {
  const valor_iluminacion =
    tipo_luz.toLowerCase() === "led"
      ? 4
      : tipo_luz.toLowerCase() === "fluorescente"
      ? 20
      : 0;

  const qv_sens_ilum = iluminacion * sup_suelo * valor_iluminacion;

  return qv_sens_ilum;
}

export function MediaSuperficieSuelo(recintos) {
  if (recintos.length === 0) {
    return 0;
  }

  let sumaSuperficieSuelo = 0;

  for (const recinto of recintos) {
    sumaSuperficieSuelo += recinto.superficie_suelo;
  }

  const mediaSuperficieSuelo = sumaSuperficieSuelo / recintos.length;

  return mediaSuperficieSuelo;
}

// Calculos para proyecto:

// calculos.js
export function qv_sens_trans(
  proyecto,
  k_cerr1,
  sup_cerr1,
  sup_vid_cerr1,
  sup_puer_cerr1,
  temp_int_ver,
  temp_cerr1_ver,
  k_vid_cerr1,
  k_puer_cerr1,
  k_cerr2,
  sup_cerr2,
  sup_vid_cerr2,
  sup_puer_cerr2,
  temp_cerr2_ver,
  k_vid_cerr2,
  k_puer_cerr2,
  k_cerr3,
  sup_cerr3,
  sup_vid_cerr3,
  sup_puer_cerr3,
  temp_cerr3_ver,
  k_vid_cerr3,
  k_puer_cerr3,
  k_cerr4,
  sup_cerr4,
  sup_vid_cerr4,
  sup_puer_cerr4,
  temp_cerr4_ver,
  k_vid_cerr4,
  k_puer_cerr4,
  k_cerr_techo,
  sup_cerr_techo,
  sup_vid_cerr_techo,
  sup_puer_cerr_techo,
  temp_cerr_techo_ver,
  k_vid_cerr_techo,
  k_puer_cerr_techo
) {
  // Como me da problemass a la hora ver cuando es un numero y cuando es string
  // pasaremos un comprobador para que no de error
  const checkNumber = (value, defaultValue = 0) =>
    typeof value === "number" && !isNaN(value) ? value : defaultValue;

  k_cerr1 = checkNumber(k_cerr1);
  sup_cerr1 = checkNumber(sup_cerr1);
  sup_vid_cerr1 = checkNumber(sup_vid_cerr1);
  sup_puer_cerr1 = checkNumber(sup_puer_cerr1);
  temp_int_ver = checkNumber(temp_int_ver);
  temp_cerr1_ver = checkNumber(temp_cerr1_ver);
  k_vid_cerr1 = checkNumber(k_vid_cerr1);
  k_puer_cerr1 = checkNumber(k_puer_cerr1);
  k_cerr2 = checkNumber(k_cerr2);
  sup_cerr2 = checkNumber(sup_cerr2);
  sup_vid_cerr2 = checkNumber(sup_vid_cerr2);
  sup_puer_cerr2 = checkNumber(sup_puer_cerr2);
  temp_cerr2_ver = checkNumber(temp_cerr2_ver);
  k_vid_cerr2 = checkNumber(k_vid_cerr2);
  k_puer_cerr2 = checkNumber(k_puer_cerr2);
  k_cerr3 = checkNumber(k_cerr3);
  sup_cerr3 = checkNumber(sup_cerr3);
  sup_vid_cerr3 = checkNumber(sup_vid_cerr3);
  sup_puer_cerr3 = checkNumber(sup_puer_cerr3);
  temp_cerr3_ver = checkNumber(temp_cerr3_ver);
  k_vid_cerr3 = checkNumber(k_vid_cerr3);
  k_puer_cerr3 = checkNumber(k_puer_cerr3);
  k_cerr4 = checkNumber(k_cerr4);
  sup_cerr4 = checkNumber(sup_cerr4);
  sup_vid_cerr4 = checkNumber(sup_vid_cerr4);
  sup_puer_cerr4 = checkNumber(sup_puer_cerr4);
  temp_cerr4_ver = checkNumber(temp_cerr4_ver);
  k_vid_cerr4 = checkNumber(k_vid_cerr4);
  k_puer_cerr4 = checkNumber(k_puer_cerr4);
  k_cerr_techo = checkNumber(k_cerr_techo);
  sup_cerr_techo = checkNumber(sup_cerr_techo);
  sup_vid_cerr_techo = checkNumber(sup_vid_cerr_techo);
  sup_puer_cerr_techo = checkNumber(sup_puer_cerr_techo);
  temp_cerr_techo_ver = checkNumber(temp_cerr_techo_ver);
  k_vid_cerr_techo = checkNumber(k_vid_cerr_techo);
  k_puer_cerr_techo = checkNumber(k_puer_cerr_techo);

  // Calculate transmission heat gain
  const qv_sens_trans =
    k_cerr1 *
      (sup_cerr1 - sup_vid_cerr1 - sup_puer_cerr1) *
      (temp_int_ver - temp_cerr1_ver) +
    k_vid_cerr1 * sup_vid_cerr1 * (temp_int_ver - temp_cerr1_ver) +
    k_puer_cerr1 * sup_puer_cerr1 * (temp_int_ver - temp_cerr1_ver) +
    k_cerr2 *
      (sup_cerr2 - sup_vid_cerr2 - sup_puer_cerr2) *
      (temp_int_ver - temp_cerr2_ver) +
    k_vid_cerr2 * sup_vid_cerr2 * (temp_int_ver - temp_cerr2_ver) +
    k_puer_cerr2 * sup_puer_cerr2 * (temp_int_ver - temp_cerr2_ver) +
    k_cerr3 *
      (sup_cerr3 - sup_vid_cerr3 - sup_puer_cerr3) *
      (temp_int_ver - temp_cerr3_ver) +
    k_vid_cerr3 * sup_vid_cerr3 * (temp_int_ver - temp_cerr3_ver) +
    k_puer_cerr3 * sup_puer_cerr3 * (temp_int_ver - temp_cerr3_ver) +
    k_cerr4 *
      (sup_cerr4 - sup_vid_cerr4 - sup_puer_cerr4) *
      (temp_int_ver - temp_cerr4_ver) +
    k_vid_cerr4 * sup_vid_cerr4 * (temp_int_ver - temp_cerr4_ver) +
    k_puer_cerr4 * sup_puer_cerr4 * (temp_int_ver - temp_cerr4_ver) +
    k_cerr_techo *
      (sup_cerr_techo - sup_vid_cerr_techo - sup_puer_cerr_techo) *
      (temp_int_ver - temp_cerr_techo_ver) +
    k_vid_cerr_techo *
      sup_vid_cerr_techo *
      (temp_int_ver - temp_cerr_techo_ver) +
    k_puer_cerr_techo *
      sup_puer_cerr_techo *
      (temp_int_ver - temp_cerr_techo_ver);

  return qv_sens_trans;
}

export function presion(altitud) {
  return (
    101325 *
    Math.pow(
      1 - (0.0065 / (15 + 273.15)) * altitud,
      9.807 / 0.2883419 / 0.0065 / 1000
    )
  );
}

export function qv_sens_equip(equipos) {
  if (!Array.isArray(equipos)) {
    throw new Error("El parámetro equipos debe ser un array");
  }
  console.log("EQUIPOS", equipos);

  let qv_sens_equip = 0;

  for (const equipo of equipos) {
    const potencia = typeof equipo.potencia === "number" ? equipo.potencia : 0;
    const factorFuncionamiento =
      typeof equipo.factor_funcionamiento === "number"
        ? equipo.factor_funcionamiento
        : 0;
    qv_sens_equip += potencia * factorFuncionamiento;
  }

  return qv_sens_equip;
}
export function temp_cerr1_inv(proyecto, temp_ext_ver) {
  return Math.exp(
    -5800.2206 * Math.pow(temp_ext_ver + 273.15, -1) +
      1.3914993 -
      0.048640239 * (temp_ext_ver + 273.15) +
      0.000041764768 * Math.pow(temp_ext_ver + 273.15, 2) -
      0.000000014452093 * Math.pow(temp_ext_ver + 273.15, 3) +
      6.5459673 * Math.log(temp_ext_ver + 273.15)
  );
}

export function temp_cerr2_inv(proyecto, ubicacion, recinto) {
  ubiVariable = ubicacion;
  if (ubicacion === "interior") {
  } else {
  }
  return Math.exp(
    -5800.2206 * Math.pow(temp_ext_ver + 273.15, -1) +
      1.3914993 -
      0.048640239 * (temp_ext_ver + 273.15) +
      0.000041764768 * Math.pow(temp_ext_ver + 273.15, 2) -
      0.000000014452093 * Math.pow(temp_ext_ver + 273.15, 3) +
      6.5459673 * Math.log(temp_ext_ver + 273.15)
  );
}

export function p_sat_agua_ext_ver(temp_ext_ver) {
  return Math.exp(
    -5800.2206 * Math.pow(temp_ext_ver + 273.15, -1) +
      1.3914993 -
      0.048640239 * (temp_ext_ver + 273.15) +
      0.000041764768 * Math.pow(temp_ext_ver + 273.15, 2) -
      0.000000014452093 * Math.pow(temp_ext_ver + 273.15, 3) +
      6.5459673 * Math.log(temp_ext_ver + 273.15)
  );
}

export function temp_cerr3_inv(proyecto, temp_ext_ver) {
  return Math.exp(
    -5800.2206 * Math.pow(temp_ext_ver + 273.15, -1) +
      1.3914993 -
      0.048640239 * (temp_ext_ver + 273.15) +
      0.000041764768 * Math.pow(temp_ext_ver + 273.15, 2) -
      0.000000014452093 * Math.pow(temp_ext_ver + 273.15, 3) +
      6.5459673 * Math.log(temp_ext_ver + 273.15)
  );
}

export function temp_cerr4_inv(proyecto, temp_ext_ver) {
  return Math.exp(
    -5800.2206 * Math.pow(temp_ext_ver + 273.15, -1) +
      1.3914993 -
      0.048640239 * (temp_ext_ver + 273.15) +
      0.000041764768 * Math.pow(temp_ext_ver + 273.15, 2) -
      0.000000014452093 * Math.pow(temp_ext_ver + 273.15, 3) +
      6.5459673 * Math.log(temp_ext_ver + 273.15)
  );
} //


*/
