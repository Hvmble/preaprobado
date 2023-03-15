import React, { useState } from 'react'
import { Title } from '../Title';
import { Input } from '../Input';
import { accountsHolder, incomeTax } from '../../helpers/selects'
import { peso, reverseFormat } from '../../helpers/format'
import { IoIosArrowUp } from "react-icons/io";
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { BsQuestionCircle } from 'react-icons/bs'



export const StepFormThree = ({ register, errors, getvalues, setvalue }) => {
  const [ingresos, setIngresos] = useState(true);
  const [date, setDate] = useState({
    monthly: 0,
    other: 0,
    certified: 0,
    rental: 0,
    draft: 0,
    family: 0,
    sustaining: 0,
    mortgage: 0,
    credit: 0,
    fee: 0,
    mortgageCredits: 0,
  })

  const totalIncomes = Number(date.monthly) + Number(date.other) + Number(date.certified);
  const totalExpenses = Number(date.rental) + Number(date.draft) + Number(date.family) + Number(date.sustaining) + Number(date.mortgage) + Number(date.credit) + Number(date.fee) + Number(date.mortgageCredits);
  setvalue('total_income', totalIncomes)
  setvalue('total_expense', totalExpenses)
  return (
    <>
      <Title text={"Información Económica"} attribute={"title__large"} id={'economy'}></Title>
      <div className='tab'><input type='button' className={`btn ${ingresos === true ? 'active' : ''}`} onClick={() => { setIngresos(true) }} value='Ingresos' /><input type='button' className={`btn ${ingresos === false ? 'active' : ''}`} onClick={() => { setIngresos(false) }} value='Egresos' /></div>
      <div className='section' id='infoEconomy'>
        {ingresos ? <>

          <Input
            type={'number'}
            name={'monthly_income'}
            label={<label >Ingresos laborales mensuales / <span> Mesada Pensional</span></label>}
            placeholder={'Ingresos laborales mensuales'}
            required={true}
            error={errors.monthly_income}
            value={date.monthly}
            action={(e) => { setDate({ ...date, monthly: e.target.value }) }}
            min={0}
            register={register}
          >
            <Tippy content="Informar los ingresos solamente de las cuentas bancarias de las que es titular">
              <a href='/' className='tippy' type="button">
                <BsQuestionCircle />
              </a>
            </Tippy>

          </Input>


          <Input
            type={'number'}
            name={'certified_income'}
            label={'Otros ingresos certificados al mes'}
            placeholder={'Otros ingresos certificados al mes'}
            register={register}
            action={(e) => { setDate({ ...date, certified: e.target.value }) }}
            min={0}
          >
            <Tippy content="Hace referencia a comisiones, bonificaciones u otros conceptos que no sean fijos, pero que pueden ser soportados.">
              <a href='/' className='tippy' type="button">
                <BsQuestionCircle />
              </a>
            </Tippy>
          </Input>
          <Input
            type={'number'}
            name={'others_income'}
            label={'Otros ingresos'}
            placeholder={'Otros ingresos'}
            register={register}
            value={date.other}
            action={(e) => { setDate({ ...date, other: e.target.value }) }}
            min={0}
          />
          <div className='date'>
            <Input
              type={'number'}
              name={'foreign_income'}
              label={'Ingresos giro exterior'}
              placeholder={'Ingresos giro exterior'}
              register={register}
              min={0}
            />
          </div>
          <div className='date'>
            <Input
              type={'number'}
              name={'total_income'}
              label={'Total Ingresos'}
              placeholder={'Total Ingresos'}
              register={register}
              value={totalIncomes}

            />

          </div>


          <Input
            type={'select'}
            name={'account_holder'}
            label={'De las cuentas en las que registra sus movimientos, ¿de cuántas es titular?'}
            placeholder={'¿de cuántas es titular?'}
            options={accountsHolder}
            register={register}
            required={true}
            error={errors.account_holder}
          />
          <div className='enlace'><a href="#person" ><IoIosArrowUp></IoIosArrowUp></a></div></> : <>

          <Input
            type={'number'}
            name={'rental_expense'}
            label={'Gastos de Alquiler'}
            placeholder={'Gastos'}
            register={register}
            min={0}
            value={date.rental}
            action={(e) => { setDate({ ...date, rental: e.target.value }) }}
          />



          <div className='container__document'>
            <div className='type__document'>
              <Input
                type={'number'}
                name={'draft_expense'}
                label={'Gastos de Giros'}
                placeholder={'0'}
                register={register}
                min={0}
                value={date.draft}
                action={(e) => { setDate({ ...date, draft: e.target.value }) }}
              />
            </div>

            <Input
              type={'number'}
              name={'family_cost'}
              label={'Gastos Familiares'}
              placeholder={'0'}
              register={register}
              min={0}
              value={date.family}
              action={(e) => { setDate({ ...date, family: e.target.value }) }}
            />
          </div>
          <Input
            type={'number'}
            name={'sustaining_expense'}
            label={'Gastos de Sostenimiento'}
            placeholder={'0'}
            register={register}
            min={0}
            value={date.sustaining}
            action={(e) => { setDate({ ...date, sustaining: e.target.value }) }}
          />


          <Input
            type={'number'}
            name={'mortgage_credit'}
            label={'Valor cuota crédito hiptecario'}
            placeholder={'0'}
            register={register}
            min={0}
            value={date.mortgage}
            action={(e) => { setDate({ ...date, mortgage: e.target.value }) }}
          />
          <Input
            type={'number'}
            name={'credit_card'}
            label={'Valor cuota de Tarjetas de crédito'}
            placeholder={'0'}
            register={register}
            min={0}
            value={date.credit}
            action={(e) => { setDate({ ...date, credit: e.target.value }) }}
          />
          <Input
            type={'number'}
            name={'fee_credits'}
            label={'Valor cuotas de Créditos'}
            placeholder={'0'}
            register={register}
            min={0}
            value={date.fee}
            action={(e) => { setDate({ ...date, fee: e.target.value }) }}
          />
          <div className='container__document'>
            <div className='type__document'>
              <Input
                type={'number'}
                name={'mortgage_credits'}
                label={'Valor cuota crédito hiptecario'}
                placeholder={'0'}
                register={register}
                min={0}
                value={date.mortgageCredits}
                action={(e) => { setDate({ ...date, mortgageCredits: e.target.value }) }}
              />
            </div>
            <div className='date'>
              <Input
                type={'text'}
                name={'total_expense'}
                label={'Total Egresos'}
                placeholder={'total egresos'}
                register={register}
                readonly={true}
                value={totalExpenses}
              />
            </div>


          </div>
          <div className='container__document'>
            <div className='type__document'>
              <Input
                type={'number'}
                name={'number_tdc'}
                label={'No. de TDC en el exterior (activas)'}
                placeholder={'0'}
                register={register}
                min={0}
              ><Tippy content="Cantidad de tarjetas de crédito de las que sea titular">
                  <a href='/' className='tippy' type="button">
                    <BsQuestionCircle />
                  </a>
                </Tippy>
              </Input>
            </div>
            <Input
              type={'number'}
              name={'total_quota'}
              label={'Cupo total TDC en el exterior'}
              placeholder={'0'}
              register={register}
              min={0}
            />
          </div>


          <div className="date">
            <div className="form-group">
              <label>Declarante de renta 
                <Tippy content="Declarante de renta en su país de residencia">
                <a href='/' className='tippy' id="tippySelect" type="button">
                  <BsQuestionCircle />
                </a>
              </Tippy></label>
              <select name="income_tax" {...register('income_tax', { required: true })}>
                <option value="false" disable="true">Declarante de renta</option>
                {incomeTax.map((renta) => (
                  <option key={renta.id} value={renta.value}>
                    {renta.name}
                  </option>
                ))}
              </select>
              {errors.income_tax && <p>Este campo es requerido</p>}
            </div>

          </div>

          <div className='enlace'><a href="#person" ><IoIosArrowUp></IoIosArrowUp></a></div> </>}

      </div>
    </>



  )
}
