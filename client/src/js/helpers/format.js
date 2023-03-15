export const peso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  })
  
export const reverseFormat = (currency) => {
  const firstStep = currency.split('').slice(2, currency.split('').length)
  const deletePoint = firstStep.filter((number) => number !== '.')
  const finalResult = deletePoint.join('')
  return finalResult
}