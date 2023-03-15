import React from 'react'

export const Navigation = () => {
  return (
    <div className='container__navigation'>
    <a className='container__number' href="#person"><span className='circle'>1</span><p>Datos Personales</p></a>
      
    <a className='container__number' href="#labor"><span className='circle'>2</span><p>Datos Laborales</p></a>
    <a className='container__number' href="#economy"><span className='circle'>3</span><p>Info Economia</p></a>
    <a className='container__number' href="#request"><span className='circle'>4</span><p>Info Solicitud</p></a>
    <a className='container__number' href="#result"><span className='circle'>5</span><p>Resultado</p></a>
      </div>

  )
}
