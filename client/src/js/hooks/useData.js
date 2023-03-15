import { useState } from 'react'

const useData = () => {
  const [data, setData] = useState()
  const [quota, setQuota] = useState(false)
  const [credit, setCredit] = useState({})
  const [bank, setBank] = useState({})
  const [viability, setViability] = useState({})

  const captureData = (data) => {
    setData(data)
  }

  const toggleQuota = () => {
    if (quota) {
      setQuota(quota)
    } else {
      setQuota(!quota)
    }
  }

  const changeCredit = (data) => {
    setCredit(data)
  }

  const updateViability = (data) => {
    setViability(data)
  }

  const updateBank = (data) => {
    setBank(data);
  }
 

  return [
    data,
    captureData,
    quota,
    toggleQuota,
    credit,
    changeCredit,
    viability,
    updateViability,
    bank,
    updateBank,
  ]
}

export default useData
