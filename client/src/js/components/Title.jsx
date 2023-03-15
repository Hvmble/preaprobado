import React from 'react'

export const Title = ({text , attribute, id}) => {
  return (
    <h2 className={`title ${attribute && 'title__large'} `} id={id}>{text}</h2>
  )
}
