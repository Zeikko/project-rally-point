import React from 'react'
import styled from 'styled-components'

const Heading = styled.h1`
  font-size: 64px;
  text-align: center;
`

function LoginButton() {
  return (
    <a href="/api/auth/login">
      <img src="/img/steam_login.png" alt="Login" />
    </a>
  )
}

export default LoginButton
