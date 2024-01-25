import { useRouteError } from 'react-router-dom'
import React from 'react'

const Error = () => {
    const err = useRouteError();
  return (
    <div>
      <h1>OOPs somwthing went wrong</h1>
    </div>
  )
}

export default Error
