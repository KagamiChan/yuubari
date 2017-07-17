import React from 'react'

import { withStyles, createStyleSheet } from 'material-ui/styles'

const Stage = ({ level, detail, items, ships, ...props }) => {
  if (!detail) {
    return false
  }

  return (
    <div {...props}>
      {
        Object.keys(detail).map(shipId =>
          <span>{(ships[shipId] || {}).api_name || ''}</span>
        )
      }
    </div>
  )
}

export default Stage
