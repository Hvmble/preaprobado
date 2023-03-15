import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { peso } from '../helpers/format';

import { currencyFunction } from '../helpers/functions';

export const Details = () => {
    const { data: cliente, viability: perfil, credit, bank: banco } = useContext(AppContext);
    const ingresos = currencyFunction(cliente.currency, cliente.total_income)
    const gastos = currencyFunction(cliente.currency, cliente.total_expense)
    const plazo = credit.plazo;
    const creditoCliente = Number(cliente.credit_value)
    const cuotaCreditoCiente = Math.ceil(credit.cuota_credito_cliente)
    const ingresoSetenta = ingresos * 0.7
    const cuota = Math.ceil(credit.cuota_cupo_maximo)
    const cupo = Math.ceil(credit.cupo_maximo)
    let message = (
        <li className="sugerencia-item">
            <span>Nota general: </span>
            Para el monto solicitado de <span>{peso.format(creditoCliente)}</span> a un plazo de{' '}
            <span>{plazo} años</span> la cuota apróximada es de{' '}
            <span>{peso.format(cuotaCreditoCiente)}. </span>
            {creditoCliente < cupo &&
                `Además, su máxima capacidad de endeudamiento es de un monto de ${peso.format(cupo)}`}
        </li>
    )
    if (cuotaCreditoCiente + gastos > ingresoSetenta && cuotaCreditoCiente / ingresos > 0.3) {
        message = (
            <li className="sugerencia-item">
                <span>Política endeudamiento: </span>
                No viable. Es necesario para mejorar su capacidad de pago liberar endeudamiento financiero
                que presenta y/o sumar ingresos con un familiar que cumpla políticas de nuestro aliado.
            </li>
        )
    } else if (cuotaCreditoCiente / ingresos > 0.3) {
        message = (
            <li className="sugerencia-item">
                <span>Ley de vivienda: </span>
                La cuota para el crédito que está solicitando supera la política de ley de vivienda (la
                cuota no puede superar el 30% de su ingreso). De acuerdo con su situación financiera le
                alcanza para un monto máximo de <span>{peso.format(cupo)}</span> a un plazo de{' '}
                <span>{plazo} años</span> la cuota apróximada es de <span>{peso.format(cuota)}</span>
            </li>
        )
    } else if (cuotaCreditoCiente + gastos > ingresoSetenta) {
        message = (
            <li className="sugerencia-item">
                <span>Endeudamiento: </span>
                No viable. Es necesario para mejorar su capacidad de pago liberar endeudamiento financiero
                que presenta y/o sumar ingresos con un familiar que cumpla políticas de nuestro aliado.
            </li>
        )
    }
    return (
        <details>
            <summary>Detalle del resultado</summary>

            <ul>
                {cliente.contract !== 'Indefinido' && (
                    <li className="sugerencia-item">
                        <span>Tipo de contrato: </span> Para presentar la solicitud ante la entidad es necesario
                        que su tipo de contrato se encuentre respaldado con un certificado. Su solicitud será
                        procesada por análisis especial con la entidad, quien emitirá el concepto final.
                    </li>
                )}
                {perfil.tipo_credito === 'No Cumple' && (
                    <li className="sugerencia-item">
                        <span>Tipo de crédito: </span> Con la entidad <span>{banco.name}</span> se financia
                        solamente{' '}
                        {banco.credit.type.map((credit) => (
                            <span>{credit}, </span>
                        ))}
                        por lo tanto los resultados que se presentan a continuación se evalúan basados en el{' '}
                        <span>Crédito Hipotecario</span>.
                    </li>
                )}
                {perfil.tipo_cuota === 'No Cumple' && (
                    <li className="sugerencia-item">
                        <span>Modalidad de cuota: </span> Para el crédito que desea adquirir puede tomar la
                        opción de modalidad de cuota en Pesos.
                    </li>
                )}
                {perfil.financiacion === 'No Cumple' && (
                    <li className="sugerencia-item">
                        <span>% de Financiación: </span> Para el monto que desea de la vivienda, se puede
                        financiar máximo el <span>80%</span> para VIS y el <span>70%</span> para NO VIS con{' '}
                        <span>{banco.name}.</span>
                    </li>
                )}
                {perfil.plazo !== 'Cumple' && (
                    <li className="sugerencia-item">
                        <span>Plazo de financiación: </span> Para el monto que desea de la vivienda, se puede
                        financiar aun plazo mínimo de <span>{banco.plazoMin} años</span> y máximo de{' '}
                        <span>{banco.plazoMax} años</span> con <span>{banco.name}</span>.
                    </li>
                )}
                {perfil.vigencia !== 'Cumple' && (
                    <li className="sugerencia-item">
                        <span>Vigencia documento migratorio: </span>
                        Para presentar la solicitud, el documento de estatus migratorio debe encontrarse
                        vigente.
                    </li>
                )}
                {perfil.estado_migratorio !== 'Cumple' && (
                    <li className="sugerencia-item">
                        <span>Estado migratorio: </span>
                        Para presentar la solicitud debe tener su situación migratoria definida y su documento
                        migratorio debe ser validado o aprobado por la entidad financiera.
                    </li>
                )}
                {perfil.score === 'No Cumple' && (
                    <li className="sugerencia-item">
                        <span>Puntaje crediticio: </span>
                        Su puntaje crediticio está por debajo de lo requerido por la entidad, si cuenta con
                        algún reporte negativo se recomienda cancelar el valor en mora y si ya canceló,
                        solicitar paz y salvo; adjuntarlo para volver a validar centrales. El caso pasará por
                        una validacion especial de la gerencia de crédito de <span>{banco.name}</span> encargado
                        de emitir el concepto final de la solicitud.
                    </li>
                )}
                {perfil.antiguedad !== 'Cumple' && (
                    <li className="sugerencia-item">
                        <span>Antiguedad de empleo: </span>
                        Debe esperar <span>{12 - perfil.mesesEmpleo} meses</span> para poder pasar la solicitud
                        y cumplir la antigüedad o continuidad laboral de acuerdo con políticas de{' '}
                        <span>{banco.name}</span>.
                    </li>
                )}
                {cliente.economic_activity === 'Independiente' && (
                    <li className="sugerencia-item">
                        <span>Actividad económica: </span>
                        Recuerde que los ingresos que menciono percibir como <span>Independiente</span> deben
                        estar acordes a los presentados en la declaración de renta, de no ser asi puede afectar
                        su capacidad de endeudamiento. Acorde a su actividad como independiente su caso pasará
                        por una validación especial de la gerencia de crédito de <span>{banco.name}</span>,
                        encargado de emitir el concepto final.
                    </li>
                )}
                {perfil.pais !== 'Cumple' && (
                    <li className="sugerencia-item">
                        <span>País de residencia: </span>
                        Acorde con el país de residencia del cliente, el caso pasará por una validación especial
                        por la Gerencia de Crédito de <span>{banco.name}</span>, encargado de emitir el concepto
                        final de su solicitud.
                    </li>
                )}
                {perfil.edad !== 'Cumple' && (
                    <li className="sugerencia-item">
                        <span>Edad: </span>
                        {cliente.age < banco.edadMin &&
                            ' La edad es inferior al mínimo permitido por la entidad.'}
                        {cliente.age > banco.edadMax && ' La edad supera el máximo permitido por la entidad.'}
                    </li>
                )}
                {perfil.vinculacion_extranjero === 'No Cumple' && (
                    <li className="sugerencia-item">
                        <span>Vinculación con extranjero: </span>Para presentar la solicitud con la vinculación
                        de un colombiano que resida en el exterior, debe existir grado de consanguinidad en
                        primer grado o afinidad.
                    </li>
                )}
                <li className="sugerencia-item">
                    <span>Ingreso mínimo requerido: </span>Para presentar la solicitud, su ingreso mínimo debe
                    ser de <span>1 SMLV</span> del país donde reside. Puede aportar ingresos adicionales
                    certificables o sumar ingresos con un familiar que cumpla con las politicas de nuestro
                    aliado.
                </li>
                {message}
            </ul>
        </details>
    )
}
