import React from 'react'

interface Props {
    product: any
}
const Homepage = (props:Props) => {
  return (
    <div>This is the {props.product}</div>
  )
}

export default Homepage