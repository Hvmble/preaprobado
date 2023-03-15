
import { useState, useEffect } from 'react'

const Currency = (convertFrom, amount) => {
  const url = `https://perfilviabilidad.colraices.com/api/currencies/from/${convertFrom}/ammount/${amount}`

  const [currency, setCurrency] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(url)
      const conversion = await resp.json()
      const result = conversion.conversion_result
      setCurrency(result)
    }
    fetchData()
  }, [convertFrom, amount, url])

  return currency
}

export default Currency