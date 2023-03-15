import React, { useState } from 'react'
import { Input } from '../Input';
import { Title } from '../Title';
import { economicActivity, currencies, contractTypes } from '../../helpers/selects'
import moment from "moment";
import { IoIosArrowUp } from "react-icons/io";
export const StepFormTwo = ({ register, errors }) => {
  const [date, setDate] = useState('')
  const dateCurrency = moment().diff(date, "months");

  return (
    <><Title text={"Datos Laborales"} id={'labor'}></Title>
      <div className='section'>
        <Input
          type={'select'}
          name={'economic_activity'}
          label={'Actividad económica'}
          placeholder={'Actividad económica'}
          options={economicActivity}
          register={register}
          required={true}
          error={errors.economic_activity}
        />
        <div className='form-group'>
          <label>Fecha de ingreso en el empleo actual </label>
          <div className="input-field">
            <input type="date" name='current_job' onInput={(e) => {
              setDate(e.target.value)
            }} {...register('current_job',{ required: true})} />
            {errors.current_job && <p>Este campo es requerido</p>}
          </div>
        </div>
        
        <div className="form-group">
          <label>Moneda del país donde reside</label>
          <select name="currency" {...register('currency', { required: true })}>
            <option value="" disable="true">Moneda del país donde reside</option>
            {currencies.map((country) => (
              <option key={country.id} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.currency && <p>Este campo es requerido</p>}
        </div>
        <Input
          type={'select'}
          name={'type_contract'}
          label={'Tipo de contrato'}
          placeholder={'Tipo de contrato'}
          options={contractTypes}
          register={register}
          required={true}
          error={errors.type_contract}
        />
        {dateCurrency < 6 && <>
          <div className='container__document'>
            <div className='type__document'>
              <Input
                type={'date'}
                name={'previous_job'}
                label={'Fecha de ingreso empleo anterior'}
                register={register}
                required={ dateCurrency < 6 ? true : false}
                error={errors.previous_job}
              /></div>

            <Input
              type={'date'}
              name={'retirement_job'}
              label={'Fecha de retiro empleo anterior'}
              register={register}
              required={dateCurrency < 6 ? true : false}
              error={errors.retirement_job}
            />
          </div>

        </>
        }

        <div className='enlace'><a href="#person" ><IoIosArrowUp></IoIosArrowUp></a></div>

      </div></>


  )
}
