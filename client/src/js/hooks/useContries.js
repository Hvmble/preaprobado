import { useEffect, useState } from 'react'

function SortArray(x, y) {
  if (x.translations.spa.common < y.translations.spa.common) {
    return -1
  }
  if (x.translations.spa.common > y.translations.spa.common) {
    return 1
  }
  return 0
}
const useCountries = () => {
  const url = 'countries.json'
  const [countries, setCountries] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(url)
      const results = await resp.json()
      const sortedCountries = results.sort(SortArray)
      setCountries(sortedCountries)
    }
    fetchData()
  }, [])
  return countries
}

export default useCountries