import React from 'react'
import ReactDOM from 'react-dom'
import HelloWorld from './components/HelloWorld/HelloWorld'
import LoginButton from './components/LoginButton/LoginButton'

ReactDOM.render(
  <div>
    <HelloWorld />
    <LoginButton />
  </div>
  , document.getElementById('app')
)
