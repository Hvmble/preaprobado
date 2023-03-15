import React, { useState } from 'react'

export const BankButton = ({ img, action, hover, active = '' }) => {
  const [buttonImage, setButtonImage] = useState(img)

  const imageOnHover = (image) => {
    setButtonImage(image)
  }

  const imageOnHoverOut = (image) => {
    setButtonImage(image)
  }

  return (
    <button
      type="button"
      className={`bank-button ${active}`}
      onMouseOver={() => imageOnHover(hover)}
      onMouseOut={() => imageOnHoverOut(img)}
      onClick={action}
    >
      <img src={buttonImage} alt="Banco" />
    </button>
  )
}