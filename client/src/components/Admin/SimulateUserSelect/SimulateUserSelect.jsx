import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { simulateUserAction } from '../../../actions/user-actions'
import Button from '../../Button/Button'
import * as propTypes from '../../../constants/prop-types'

class SimulateUserSelect extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { dispatch } = this.props
    dispatch(simulateUserAction(parseInt(event.target.value, 10)))
  }

  render() {
    let simulatedUserIds = []
    for (let id = 1; id <= 48; id += 1) {
      simulatedUserIds = [
        ...simulatedUserIds,
        id
      ]
    }
    return (
      <div>
        <select onChange={(event) => this.handleChange(event)}>
          {simulatedUserIds.map((id) =>
            <option key={id} value={id}>Test user {id}</option>
          )}
        </select>
      </div>
    )
  }
}

SimulateUserSelect.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default SimulateUserSelect
