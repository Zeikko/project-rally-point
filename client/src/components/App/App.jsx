import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import TopBar from '../TopBar/TopBar'
import * as propTypes from '../../constants/prop-types'

function App(props) {
  const {
    dispatch,
    user,
  } = props
  return (
    <div>
      <TopBar user={user} dispatch={dispatch} />
    </div>
  )
}

const mapStateToProps = ({
  user,
}) => ({
  user,
})

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: propTypes.user.isRequired,
}

export default connect(mapStateToProps)(App)
