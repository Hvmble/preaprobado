import React from 'react'
import { SectionForm } from '../js/containers/SectionForm'
import { AppContext } from '../js/context/AppContext';
import useData from '../js/hooks/useData';

export const Home = () => {
  const [
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
    
  ] = useData()
  return (
    
      <AppContext.Provider value={{
        data,
        captureData,
        quota,
        toggleQuota,
        credit,
        changeCredit,
        viability,
        updateViability,
        bank,
        updateBank
       
      }}
      >
        <SectionForm/>
        </AppContext.Provider>

  )
}
