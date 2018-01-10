import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import LoginStatus from '../LoginStatus/LoginStatus'
import * as propTypes from '../../constants/prop-types'

function TopBar(props) {
  const { dispatch, userState } = props
  return (
    <Bar>
      <Heading>Project Rally Point</Heading>
      <LoginStatus dispatch={dispatch} userState={userState} />
    </Bar>
  )
}

TopBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: propTypes.userState.isRequired,
}

export default TopBar

const Bar = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #EEE;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`

const Heading = styled.div`
  font-size: 20px;
`
