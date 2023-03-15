import React, { useState, useContext } from 'react'

import { StepFormOne } from '../components/formulario/StepFormOne';
import { StepFormTwo } from '../components/formulario/StepFormTwo';
import { StepFormThree } from '../components/formulario/StepFormThree';
import { StepFormFour } from '../components/formulario/StepFormFour';
import { Validation } from '../hooks/validation';
import { peso } from '../helpers/format'
import { useForm } from "react-hook-form";
import { currencyFunction } from '../helpers/functions';
import { banks } from '../hooks/banks'
import { cuotaCupoMaximo, cupoMaximo, cuotaCreditoCliente } from '../hooks/result';
import { AppContext } from '../context/AppContext';
import { StepFormFive } from '../components/formulario/StepFormFive';
import { saveData } from '../helpers/saveData';


export const Form = () => {
  const { quota } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors }
  } = useForm();
  const { data, captureData, changeCredit, updateViability, toggleQuota, updateBank } =
    useContext(AppContext)
  const [incomes, setIncomes] = useState(0)
  const [result, setResult] = useState(false)

  const activeButton = () => {
    setResult(!result)
    exchangeRate();
  }

  const exchangeRate = () => {
    const values = getValues()
    currencyFunction(values.currency, values.total_income).then((data) => setIncomes(data))
  }

  const onSubmit = (data) => {
    saveData(data)
    const credit = {
      cupo_maximo: cupoMaximo(incomes, 'Bancolombia', data.deadline),
      cuota_cupo_maximo: cuotaCupoMaximo(incomes),
      cuota_credito_cliente: cuotaCreditoCliente(data.credit_value, 'Bancolombia', data.deadline),
      plazo: data.deadline
    }
    captureData(data)
    changeCredit(credit)
    toggleQuota();
    updateBank(banks[0])
    const perfil = Validation('Bancolombia', data, incomes)
    updateViability(perfil)
  }
  const registerValues = () => {
    const values = getValues();
    return values;
  }

  console.log('values', getValues())
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id='form'>
        <StepFormOne register={register} errors={errors}></StepFormOne>
        <StepFormTwo register={register} errors={errors}></StepFormTwo>
        <StepFormThree register={register} errors={errors} peso={peso} getvalues={registerValues} setvalue={setValue}  ></StepFormThree>
        <StepFormFour register={register} errors={errors} peso={peso} getvalues={registerValues} activeButton={activeButton}></StepFormFour>
        <div className='result'>
          <button disabled={!result} type="submit">
            Resultado
          </button>
        </div>
        {quota && <StepFormFive register={register} setvalue={setValue}></StepFormFive>}
      </form>
    </>

  )
}
