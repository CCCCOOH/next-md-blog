import React from 'react'

function Title({className ,children, ...props}) {
  return (
    <h2 className={'text-xl m-2 '+className}>{children}</h2>
  )
}

export default Title