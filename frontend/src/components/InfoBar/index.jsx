import React from 'react'
import PropTypes from 'prop-types'

export default function InfoBar({room}) {
  return (
    <div>
      <h3> room {room}</h3>
      <a href="/">close</a>
    </div>
  )
}

InfoBar.prototype = {
  room: PropTypes.string.isRequired
}
