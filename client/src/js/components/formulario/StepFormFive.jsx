import React, { useState, useContext } from 'react'
import { BankButton } from '../BankButton'
import { Details } from '../Details'
import { IoIosArrowUp } from "react-icons/io";
import { AppContext } from '../../context/AppContext';
import { cuotaCupoMaximo, cupoMaximo, cuotaCreditoCliente } from '../../hooks/result';
import { Validation } from '../../hooks/validation'
import { currencyFunction } from '../../helpers/functions';
import Currency from '../../hooks/Currency';
import { peso } from '../../helpers/format'
import { banks } from '../../hooks/banks'

export const StepFormFive = (getvalues, register, setvalue) => {
    const [currency, setCurrency] = useState();
    const { data, credit, changeCredit, updateViability, updateBank } = useContext(AppContext)
    const [btnBancolombia, setBtnBancolombia] = useState(true)
    const [btnBancoUnion, setBtnBancoUnion] = useState(false)
    const [btnDavivienda, setBtnDavivienda] = useState(false)
    const incomes = Currency(data.currency, data.total_income)
    currencyFunction('USD', 1).then((data) => setCurrency(data))
    const creditBancolombia = () => {
        updateBank(banks[0])
        const cupo_maximo = cupoMaximo(incomes, 'Bancolombia', data.deadline)
        const cuota_cupo_maximo = cuotaCupoMaximo(incomes)
        const cuota_credito_cliente = cuotaCreditoCliente(data.credit_value, 'Bancolombia', data.deadline);
        const plazo = data.deadline
        changeCredit({ cupo_maximo, cuota_cupo_maximo, cuota_credito_cliente, plazo })
        updateViability(Validation('Bancolombia', data, incomes))
        setBtnBancoUnion(false)
        setBtnBancolombia(true)
        setBtnDavivienda(false)
    }

    const creditBancoUnion = () => {
        updateBank(banks[2])
        const cupo_maximo = cupoMaximo(incomes, 'Banco Unión', data.deadline)
        const cuota_cupo_maximo = cuotaCupoMaximo(incomes)
        const cuota_credito_cliente = cuotaCreditoCliente(data.credit_value, 'Banco Unión', data.deadline);
        const plazo = data.deadline;
        changeCredit({ cupo_maximo, cuota_cupo_maximo, cuota_credito_cliente, plazo })
        updateViability(Validation('Banco Unión', data, incomes))
        setBtnBancoUnion(true)
        setBtnBancolombia(false)
        setBtnDavivienda(false)
    }

    const creditDavivienda = () => {
        updateBank(banks[1])
        const cupo_maximo = cupoMaximo(incomes, 'Davivienda', data.deadline)
        const cuota_cupo_maximo = cuotaCupoMaximo(incomes)
        const cuota_credito_cliente = cuotaCreditoCliente(data.credit_value, 'Davivienda', data.deadline);
        const plazo = data.deadline
        changeCredit({ cupo_maximo, cuota_cupo_maximo, cuota_credito_cliente, plazo })
        updateViability(Validation('Davivienda', data, incomes))
        setBtnBancoUnion(false)
        setBtnBancolombia(false)
        setBtnDavivienda(true)
    }
    return (

        <section className='section__result' id='result'>

            <>
                <div className='section__buttons' >
                    <BankButton
                        img="/icons/bancolombia_color.svg"
                        hover="/icons/bancolombia_white.svg"
                        active={btnBancolombia && 'active'}
                        action={creditBancolombia}></BankButton>
                    <BankButton
                        img="/icons/banco_union_color.svg"
                        hover="/icons/banco_union_white.svg"
                        active={btnBancoUnion && 'active'}
                        action={creditBancoUnion}></BankButton>
                    <BankButton
                        img="/icons/davivienda_color.svg"
                        hover="/icons/davivienda_white.svg"
                        active={btnDavivienda && 'active'} action={creditDavivienda}
                    ></BankButton>
                </div>
                <h1>Crédito pre-aprobado</h1>
                <div className='form-group'>
                    <input type="text" name='pre_approved'  value={peso.format(credit?.cupo_maximo)} readOnly style={{ width: '30rem', height: '4rem' }} />
                </div>
                <div className='inputs'>
                    <div className='form-group'>
                        <label>Cuota mensual </label>
                        <input type="text" name='monthly_fee'  value={peso.format(credit?.cuota_cupo_maximo)} readOnly />
                    </div>
                    <div className='form-group'>
                        <label>Tipo de Crédito </label>
                        <input type="text" name='' value={data?.type_credit} readOnly />
                    </div>
                    <div className='form-group'>
                        <label>Modalidad de Cuota </label>
                        <input type="text" name='' value={data?.type_fee} readOnly />
                    </div>
                    <div className='form-group'>
                        <label>Plazo </label>
                        <input type="text" name='' value={credit?.plazo} readOnly />
                    </div>
                    <div className='form-group'>
                        <label>TRM</label>
                        <input type="text" name='trm'  value={peso.format(currency)} readOnly />
                    </div>
                </div>
                <Details></Details>

                <div></div>
                <a href="/" className='button'>Enviar carta Colraices</a>
                <div><a href="/" className='button'>Regresar</a></div>

                <div className='enlace'><a href="#person" ><IoIosArrowUp></IoIosArrowUp></a></div></>
        </section>

    )
}
