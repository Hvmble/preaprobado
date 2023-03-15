import React, { useState } from 'react'
import { Title } from '../Title';
import { Input } from '../Input';
import { propertyState, creditTypes, typeFee, incomeTax, relationship } from '../../helpers/selects'
import useCountries from '../../hooks/useContries'
import { IoIosArrowUp } from "react-icons/io";

const defaultState = {
  register: "",
  requested: "",
  errors: "",
  name: ""
};
function Coowner({ register, requested, errors, name }) {
  const nameClass = `coowner${name}`;
  return (
    <Input
      type={'text'}
      name={`${nameClass}`}
      label={'Nombre Cotitular'}
      placeholder={'Nombre Cotitular'}
      register={register}
      required={requested}
      error={errors.nameClass}
      pattern={/^[A-Za-z ]+$/i}
    />
  );
}
export const StepFormFour = ({ register, errors, getvalues, activeButton }) => {
  const countries = useCountries();
  const [linking, setLinking] = useState('false');
  const [linkForeign, setLinkForeign] = useState('false');
  const [modality, setModality] = useState('VIS');
  const [coowner, setCoowner] = useState([defaultState]);
  const requested = linking === 'true' ? true : false;
  const requestedForeign = linkForeign === 'true' ? true : false;
  const valueInmueble = getvalues();
  let nextId = 1;

  const handleOnChange = (index, name, value) => {
    const copyRows = [...coowner];
    copyRows[index] = {
      ...copyRows[index],
      [name]: value
    };
    setCoowner(copyRows);
  };
  const handleOnAdd = () => {
    setCoowner(coowner.concat(defaultState));
  };
  return (
    <>
      <Title text={"Información de la Solicitud"} attribute={"title__large"} id={'request'}></Title>
      <div className='section'>
        <Input
          type={'number'}
          name={'property_value'}
          label={'Valor del inmueble'}
          placeholder={'Valor del inmueble'}
          register={register}
        />
        <Input
          type={'select'}
          name={'property_state'}
          label={'Clase de inmueble'}
          options={propertyState}
          placeholder={'Clase de inmueble'}
          register={register}
          required={true}
          error={errors.property_state}
        />
        <Input
          type={'text'}
          name={'modality'}
          label={'Modalidad'}
          placeholder={'Modalidad'}
          register={register}
          readonly={true}
          value={modality}
        />
        <Input
          type={'select'}
          name={'type_credit'}
          label={'Tipo de crédito'}
          placeholder={'Tipo de crédito'}
          options={creditTypes}
          register={register}
          required={true}
          error={errors.type_credit}
        />
        <Input
          type={'number'}
          name={'credit_value'}
          label={'Valor del Crédito'}
          placeholder={'Valor del Crédito'}
          register={register}
          required={true}
          error={errors.credit_value}
        />
        <Input
          type={'select'}
          name={'type_fee'}
          label={'Modalidad de Cuota'}
          placeholder={'Modalidad de Cuota'}
          options={typeFee}
          register={register}
          required={true}
          error={errors.type_fee}
        />
        <div className='date'>
          <Input
            type={'number'}
            name={'deadline'}
            label={'Plazo'}
            placeholder={'Plazo'}
            register={register}
            required={true}
            error={errors.deadline}
            minimo={5}
            maximo={30}
          />
        </div>

        <div className='date'>

          <div className="form-group">
            <label>Quiere vincular otra persona a su solicitud?</label>
            <select name="related_person" onClick={(e) => {
              setLinking(e.target.value);
            }} {...register('related_person')}>
              <option value="false" disable="true">Vincular otra persona a su solicitud</option>
              {incomeTax.map((date) => (
                <option key={date.id} value={date.value}>
                  {date.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Su solicitud es con vinculación con un extranjero?</label>
          <select name="foreign_affiliation" onClick={(e) => {
            setLinkForeign(e.target.value);
          }} {...register('foreign_affiliation')}>
            <option value="false" disable="true">Vinculación con un extranjero</option>
            {incomeTax.map((date) => (
              <option key={date.id} value={date.value}>
                {date.name}
              </option>
            ))}
          </select>
        </div>
        {linking === 'true' && <>
          {coowner.map((row, index) => (
            <Coowner
              register={register}
              errors={errors}
              requested={requested}
              onChange={(name, value) => handleOnChange(index, name, value)}
              key={index}
              name={nextId++}
            />
          ))}
          <div className='form-group'><button type='button' className='btn__coowner' onClick={handleOnAdd} disabled={coowner.length === 3 && true} >Agregar Cotitular </button> </div>

          <div className="form-group">
            <label>Los titulares suman ingresos?</label>
            <select name="headline_income"  {...register('headline_income', { required: requested })}>
              <option value="false" disable="true">Ingresos</option>
              {incomeTax.map((date) => (
                <option key={date.id} value={date.value}>
                  {date.name}
                </option>
              ))}
            </select>
            {errors.headline_income && <p>Este campo es requerido</p>}
          </div>
          <Input
            type={'number'}
            name={'certified_income'}
            label={'Valor ingresos certificados'}
            placeholder={'Valor ingresos certificados'}
            register={register}
            required={requested}
            error={errors.certified_income}
            min={0}
          />
          <Input
            type={'select'}
            name={'relationship_holder'}
            label={'Parenteso de los titulares adicionales'}
            placeholder={'Parentesco'}
            options={relationship}
            register={register}
            required={requested}
            error={errors.relationship_holder}
          />

          <div className="form-group">
            <label>Nacionalidad de los titulares adicionales</label>

            <select name="nationality_holder" {...register('nationality_holder', { required: requested })}>
              <option value="" disable="true">Nacionalidad</option>
              {countries.map((country) => (
                <option key={country.translations.spa.common} value={country.translations.spa.common}>
                  {country.translations.spa.common}
                </option>
              ))}
            </select>
            {errors.nationality_holder && <p>Este campo es requerido</p>}
          </div>
          <div className={`form-group ${coowner.length === 1 && 'country__holder'} `}>
            <label>País de residencia de los titulares adicionales</label>
            <select name="country_holder" {...register('country_holder', { required: requested })}>
              <option value="" disable="true">País de residencia </option>
              {countries.map((country) => (
                <option key={country.translations.spa.common} value={country.translations.spa.common}>
                  {country.translations.spa.common}
                </option>
              ))}
            </select>
            {errors.country_holder && <p>Este campo es requerido</p>}
          </div>
        </>}
        {linkForeign === 'true' && <>
          <Input
            type={'select'}
            name={'relationship_foreigner'}
            label={'Parentesco con el extranjero'}
            placeholder={'Parentesco'}
            options={relationship}
            register={register}
            required={requestedForeign}
            error={errors.relationship_foreigner}
          />

          <div className="form-group">
            <label>El titular colombiano suma ingresos?</label>
            <select name="income_holder"  {...register('income_holder', { required: requestedForeign })}>
              <option value="false" disable="true">Ingresos</option>
              {incomeTax.map((date) => (
                <option key={date.id} value={date.value}>
                  {date.name}
                </option>
              ))}
            </select>
            {errors.income_holder && <p>Este campo es requerido</p>}
          </div>
          <Input
            type={'number'}
            name={'certified_income_holder'}
            label={'Valor ingresos certificados'}
            placeholder={'Valor ingresos certificados'}
            register={register}
            required={requestedForeign}
            error={errors.certified_income_holder}
          /></>}
        <div className='check'>
          <div className="form-group">
            <label id='check'>
              <input type="checkbox" name='data_authorization' {...register('data_authorization')} onClick={activeButton} />
              Autorización de tratamientos de datos
            </label>
          </div>
        </div>
        <div className='check'>
          <div className="form-group">
            <label id='check'>
              <input type="checkbox" name='risks_authorization' {...register('risks_authorization')} />
              <span className='span'>Autorización de consultas en centrales de riesgo</span>
            </label>
          </div>
        </div>
        <div className='check'>
          <div className="form-group">
            <label id='check'>
              <input type="checkbox" name='conditions_authorization' {...register('conditions_authorization')} />
              Aceptación de condiciones del servicio
            </label>
          </div>
        </div>
        <div className='btn'>
          <button>Pago de tarifa</button><button>Campo Informativo</button>
        </div>


        <div className='enlace'><a href="#person" ><IoIosArrowUp></IoIosArrowUp></a></div>
      </div>

    </>

  )
}
