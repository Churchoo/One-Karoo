import React from 'react'

interface Props {
    product: any
}
const ShoppingCart = (props:Props) => {
  return (
    <div>This is the {props.product}</div>
  )
}

export default ShoppingCart