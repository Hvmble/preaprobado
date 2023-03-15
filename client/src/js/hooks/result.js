import { findBank } from "./findBank"
export const cuotaCreditoCliente = (credito, banco, plazo) => {
    const bank = findBank(banco)
    const interesMensual = bank.interest_rate.month
    return Math.ceil((credito * interesMensual) / (1 - (1 + interesMensual) ** (-plazo * 12)))
  }
export const cupoMaximo = (ingresos, banco, plazo) => {
    const bank = findBank(banco)
    const tasaInteres = bank.interest_rate.year
    const cuota = ingresos * 0.3
    return Math.ceil((cuota * (1 - (1 + tasaInteres / 12) ** (-plazo * 12))) / (tasaInteres / 12))
}

export const cuotaCupoMaximo = (ingresos) => {
    return ingresos * 0.3
}
