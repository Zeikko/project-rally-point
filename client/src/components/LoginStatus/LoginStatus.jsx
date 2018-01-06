import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import LoginButton from '../LoginButton/LoginButton'
import LogoutButton from '../LogoutButton/LogoutButton'
import { getUserAction } from '../../actions/user-actions'
import * as propTypes from '../../constants/prop-types'

class LoginStatus extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getUserAction())
  }

  render() {
    const { user, dispatch } = this.props
    if (user.isLoading) {
      return null
    }
    if (user.data) {
      return (
        <Wrapper>
          <Avatar alt={user.data.displayName} src={user.data.smallAvatarUrl} />
          <DisplayName>{user.data.displayName}</DisplayName>
          <LogoutButton dispatch={dispatch} />
        </Wrapper>
      )
    }
    return <LoginButton dispatch={dispatch} />
  }
}

LoginStatus.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: propTypes.user.isRequired,
}

export default LoginStatus

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Avatar = styled.img`
  height: 32px;
`

const DisplayName = styled.div`
  line-height: 32px;
  padding: 0 10px;
`
