import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { logoutAction } from '../../actions/user-actions'
import Button from '../Button/Button'

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
      <Button onClick={this.handleClick}>
        Logout
      </Button>
    )
  }
}

LogoutButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default LogoutButton
