import moment from 'moment'
import { findBank } from './findBank'

export const Validation = (bank, cliente, currency) => {
  const banco = findBank(bank);
  let perfil = {}

  const porcentaje = (cliente.credit_value / cliente.property_value) * 100
  const empleoActual = moment().diff(cliente.current_job, 'months')
  let periodoCesante = ''
  let empleoAnterior = ''
  const age = moment().diff(cliente.birth_date,'years');
  if (cliente.retirement_job != null) {
    periodoCesante = moment(cliente.current_job).diff(
      cliente.retirement_job,
      'months'
    )
  }
  if (cliente.previous_job != null) {
    empleoAnterior = moment(cliente.retirement_job).diff(
      cliente.previous_job,
      'months'
    )
  }
  const expiracion = moment(cliente.expiration_day).diff(moment(), 'months')
  const vis = 150000000
  let edad = 'No Cumple'
  let contrato = 'Cumple'
  let ingresos = 'No Cumple'
  let antiguedad = 'No Cumple'
  let mesesEmpleo = 'No Cumple'
  let financiacion = 'No Cumple'
  let plazo = 'No Cumple'
  let tipo_credito = 'No Cumple'
  let tipo_cuota = 'No Cumple'
  let pais = 'No Cumple'
  let estado_migratorio = 'No Cumple'
  let vigencia = 'No Cumple'
  let score = 'No Cumple'
  let vin_ext = 'No Cumple'
  let actividad_economica = 'No Cumple'
  let viable = true

  if (age >= banco.credit.min_age && age <= banco.credit.max_age) {
    edad = 'Cumple'
  }
  if (banco.incomes <= Math.ceil(currency)) {
    ingresos = 'Cumple'
  }
  if (
    cliente.type_credit === 'Libre Inversion' &&
    porcentaje < banco.credit.percentage_libre
  ) {
    financiacion = 'Cumple'
  }
  if (cliente.type_credit === 'Libre Inversion') {
    if (
      cliente.deadline >= 1 &&
      cliente.deadline <= banco.credit.time_limit_max_uvr
    ) {
      plazo = 'Cumple'
    }
  }
  if (Number(cliente.property_value) <= vis) {
    if (porcentaje <= banco.credit.percentage_vis) {
      financiacion = 'Cumple'
    }
  } else {
    if (porcentaje <= banco.credit.percentage_novis) {
      financiacion = 'Cumple'
    }
  }
  if (cliente.type_fee === 'UVR') {
    if (
      cliente.deadline >= banco.credit.time_limit_min &&
      cliente.deadline <= banco.credit.time_limit_max_uvr
    ) {
      plazo = 'Cumple'
    }
  }

  if (
    cliente.deadline >= banco.credit.time_limit_min &&
    cliente.deadline <= banco.credit.time_limit_max
  ) {
    plazo = 'Cumple'
  }
  if (banco.credit.type.find((credit) => credit === cliente.type_credit)) {
    tipo_credito = 'Cumple'
  }
  if (banco.credit.type_of_fee.find((fee) => fee === cliente.type_fee)) {
    tipo_cuota = 'Cumple'
  }
  if (banco.name === 'Banco Unión') {
    if (!banco.countries.find((country) => country === cliente.country)) {
      pais = 'Cumple'
    }
  } else {
    if (banco.countries.find((country) => country === cliente.country)) {
      pais = 'Cumple'
    }
  }
  if (cliente.migratory_state === banco.migratory_state.state) {
    estado_migratorio = 'Cumple'
  }
  if (banco.name === 'Banco Unión') {
    vigencia = 'Cumple'
  }
  if (expiracion >= banco.migratory_state.validity) {
    vigencia = 'Cumple'
  }
  if (cliente.score) {
    if (cliente.score >= banco.score) {
      score = 'Cumple'
    }
  } else {
    score = 'No Tiene'
  }

  if (cliente.foreign_affiliation ==='Si') {
    if (
      banco.foreign_vinculation.relationships.find(
        (parent) => parent === cliente.relationship_foreigner
      )
    ) {
      vin_ext = 'Cumple'
    }
  } else {
    vin_ext = 'No Aplica'
  }
  if (banco.economic_activity.find((activity) => activity === cliente.economic_activity)) {
    actividad_economica = 'Cumple'
    if (empleoActual >= banco.current_job) {
      antiguedad = 'Cumple'
      mesesEmpleo = empleoActual
    } else if (periodoCesante <= banco.ceased_period) {
      if (empleoActual + empleoAnterior >= banco.current_job) {
        antiguedad = 'Cumple'
        mesesEmpleo = empleoActual + empleoAnterior
      } else {
        antiguedad = 'No Cumple'
        mesesEmpleo = empleoActual + empleoAnterior
      }
    } else {
      antiguedad = 'No Cumple'
      mesesEmpleo = empleoActual
    }
  } else {
    actividad_economica = 'Cumple'
    mesesEmpleo = empleoActual
    if (empleoActual >= banco.current_job) {
      antiguedad = 'Cumple'
      mesesEmpleo = empleoActual
    } else if (periodoCesante <= banco.ceased_period) {
      if (empleoActual + empleoAnterior >= banco.current_job) {
        antiguedad = 'Cumple'
        mesesEmpleo = empleoActual + empleoAnterior
      } else {
        antiguedad = 'No Cumple'
        mesesEmpleo = empleoActual + empleoAnterior
      }
    } else {
      antiguedad = 'No Cumple'
      mesesEmpleo = empleoActual
    }
  }

  if (
    edad === 'No Cumple' ||
    pais === 'No Cumple' ||
    estado_migratorio === 'No Cumple' ||
    vigencia === 'No Cumple' ||
    actividad_economica === 'No Cumple' ||
    contrato === 'No Cumple' ||
    antiguedad === 'No Cumple' ||
    ingresos === 'No Cumple' ||
    tipo_credito === 'No Cumple' ||
    financiacion === 'No Cumple' ||
    plazo === 'No Cumple' ||
    score === 'No Cumple'
  ) {
    viable = false
  }

  perfil = {
    edad: edad,
    pais: pais,
    estado_migratorio: estado_migratorio,
    vigencia: vigencia,
    actividad: actividad_economica,
    contrato: contrato,
    antiguedad: antiguedad,
    mesesEmpleo: mesesEmpleo,
    ingresos: ingresos,
    tipo_credito: tipo_credito,
    tipo_cuota: tipo_cuota,
    financiacion: financiacion,
    plazo: plazo,
    score: score,
    vinculacion_extranjero: vin_ext,
    viable: viable,
  }

  return perfil
}


