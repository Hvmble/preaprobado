export const currencyFunction = (convertFrom, amount) => {
    const url = `https://perfilviabilidad.colraices.com/api/currencies/from/${convertFrom}/ammount/${amount}`
  
    const fetchData = async () => {
      const resp = await fetch(url)
      const conversion = await resp.json()
      const result = conversion.conversion_result
  
      return result
    }
    const converted = fetchData()
    return converted
  }