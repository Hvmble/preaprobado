import React from 'react'
import { Input } from '../Input';
import useCountries from '../../hooks/useContries'
import { canales, levelStudy, typeDocument, documentExteriorTypes, migratoryStates, civilStatus, housingType, residenceStratum } from '../../helpers/selects'
import { Title } from '../Title';
export const StepFormOne = ({ register, errors }) => {
  const countries = useCountries();

  return (
    <>
      <Title text={"Datos Personales"} id={'person'}></Title>
      <div className='section'>
        <Input
          type={'text'}
          name={'name'}
          label={'Nombres'}
          placeholder={'Nombres'}
          register={register}
          required={true}
          error={errors.name}
          pattern={/^[A-Za-z ]+$/i}
        />
        <Input
          type={'text'}
          name={'last_name'}
          label={'Apellidos'}
          placeholder={'Apellidos'}
          register={register}
          required={true}
          error={errors.last_name}
          pattern={/^[A-Za-z ]+$/i}
        />
        <Input
          type={'email'}
          name={'email'}
          label={'E-mail'}
          placeholder={'E-mail'}
          register={register}
          required={true}
          error={errors.email}
        />
        <Input
          type={'tel'}
          name={'phone'}
          label={'Celular'}
          placeholder={'Celular'}
          register={register}
          required={true}
          error={errors.phone}
          min={9}
        />
        <div className="form-group">
          <label>País de residencia</label>
          <select name="country_residence" {...register('country_residence', { required: true })}>
            <option value="" disable="true">País de residencia</option>
            {countries.map((country_residence) => (
              <option key={country_residence.translations.spa.common} value={country_residence.translations.spa.common}>
                {country_residence.translations.spa.common}
              </option>
            ))}
          </select>
          {errors.country_residence && <p>Este campo es requerido</p>}
        </div>
        <div className="form-group">
          <label>Nacionalidad</label>
          <select name="country" {...register('country', { required: true })}>
            <option value="" disable="true">Nacionalidad</option>
            {countries.map((country) => (
              <option key={country.translations.spa.common} value={country.translations.spa.common}>
                {country.translations.spa.common}
              </option>
            ))}
          </select>
          {errors.country && <p>Este campo es requerido</p>}
        </div>
        

        <div className='container__document'>
          <div className='type__document'>
            <Input
              type={'select'}
              name={'identification'}
              label={'Tipo de documento colombiano'}
              placeholder={'CC'}
              options={typeDocument}
              register={register}
              required={true}
              error={errors.identification}
            />
          </div>

          <Input
            type={'number'}
            name={'number_identification'}
            label={"Número de identificación"}
            register={register}
            required={true}
            min={5}
            error={errors.number_identification}
          />
        </div>
        <div className='date'>
          <Input
            type={'date'}
            name={'expedition_date'}
            label={'Fecha expedición documento colombiano'}
            register={register}
            required={true}
            error={errors.expedition_date}
          ></Input>
        </div>
        <div className='date'>
          <Input
            type={'date'}
            name={'birth_date'}
            label={'Fecha de nacimiento'}
            register={register}
            required={true}
            error={errors.birth_date}
          ></Input>
        </div>
        <Input
          type={'select'}
          name={'identification_migration'}
          label={'Tipo de documento migratorio'}
          placeholder={'Tipo de documento migratorio'}
          options={documentExteriorTypes}
          register={register}
          required={true}
          error={errors.identification_migration}
        />
        <Input
          type={'number'}
          name={'number_migration'}
          label={'Numero de identificación (país de residencia)'}
          placeholder={'Numero de identificación '}
          register={register}
          required={true}
          min={5}
          error={errors.number_migration}
        ></Input>
        <Input
          type={'date'}
          name={'expiration_day'}
          label={'Fecha de vencimiento'}
          register={register}
          required={true}
          error={errors.expiration_day}
        ></Input>
        <Input
          type={'select'}
          name={'migratory_state'}
          label={'Estatus Migratorio'}
          placeholder={'Estatus Migratorio'}
          options={migratoryStates}
          register={register}
          required={true}
          error={errors.migratory_state}
        />
        <Input
          type={'select'}
          name={'civil_status'}
          label={'Estado Civil'}
          placeholder={'Estado Civil'}
          options={civilStatus}
          register={register}
          required={true}
          error={errors.civil_status}
        />
        <Input
          type={'select'}
          name={'level_study'}
          label={'Nivel de Estudio'}
          placeholder={'Nivel de Estudio'}
          options={levelStudy}
          register={register}
          required={true}
          error={errors.level_study}
        />
        <Input
          type={'select'}
          name={'housing_type'}
          label={'Tipo de Vivienda'}
          placeholder={'Tipo de Vivienda'}
          options={housingType}
          register={register}
          required={true}
          error={errors.housing_type}
        />
        <Input
          type={'select'}
          name={'state_residence'}
          label={'Estrato de residencia'}
          placeholder={'Estrato de residencia'}
          options={residenceStratum}
          register={register}
          required={true}
          error={errors.state_residence}
        />
        <Input
          type={'select'}
          name={'canal'}
          label={'Canal'}
          placeholder={'Canal'}
          options={canales}
          register={register}
        />
      </div>
    </>




  )
}
