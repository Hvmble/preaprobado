import React from 'react'
import { peso, reverseFormat } from '../helpers/format'
export const Input = ({ type, name, label, placeholder, register, options, readonly, required, error, min, maximo, minimo, pattern, children, tippy, action, value, number }) => {
  if (type === 'select') {
    return (
      <div className="form-group">
        <label>{label}{tippy}</label>

        <>
          <select {...register(name, { required: required })}>

            <option value="" disable="true">{placeholder} </option>

            {options.map((date) => (
              <option key={date.id} value={date.name}>
                {date.name}
              </option>
            ))}

          </select>
          {error && <p>Este campo es requerido</p>}
        </>
      </div>
    )
  }else{
    return (
    <div className='form-group'>
      <label>{label}{tippy}</label> 
      <div className="input-field">
      <input type={type} onInput={action} value={value} min={min} placeholder={placeholder} {...register(name, { required: required, minLength: min, min: minimo, max: maximo, pattern: pattern })} readOnly={readonly} />
      {children}
      {error?.type === "required" && <p>Este campo es requerido</p>}
      {error?.type === "pattern" && (<p>Solo caracteres alfabéticos </p>)}
      {error?.type === "minLength" && (<p>Minimo nueve numeros</p>)}
      {error?.type === "max" && (<p>Plazo maximo 30 años</p>)}
      {error?.type === "min" && (<p>Plazo minimo 5 años</p>)}
    </div></div>
  )}
  // if (number) {
  //   return (
  //     <div className='form-group'> 
  //     <label>{label}{tippy}</label>
  //     <div className="input-field">
  //       <input type={type} onInput={action} value={peso.format(value)} min={min} placeholder={placeholder} {...register(name,  { setValueAs: (v) => reverseFormat(v) })} />
  //       {children}
  //       {error?.type === "required" && <p>Este campo es requerido</p>}
  //       {error?.type === "pattern" && (<p>Solo caracteres alfabéticos </p>)}
  //       {error?.type === "minLength" && (<p>Minimo nueve numeros</p>)}
  //       {error?.type === "max" && (<p>Plazo maximo 30 años</p>)}
  //       {error?.type === "min" && (<p>Plazo minimo 5 años</p>)}
  //     </div></div>

  //   )
  // }
  

}
