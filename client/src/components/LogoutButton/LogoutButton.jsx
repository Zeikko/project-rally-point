import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { logoutAction } from '../../actions/user-actions'

class LogoutButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { dispatch } = this.props
    dispatch(logoutAction())
  }

  render() {
    return (
      <button onClick={this.handleClick} href="/api/auth/login">
        Logout
      </button>
    )
  }
}

LogoutButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default LogoutButton
