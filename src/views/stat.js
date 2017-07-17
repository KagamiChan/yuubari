import React from 'react'

import { withStyles, createStyleSheet } from 'material-ui/styles'

const styles = createStyleSheet('Stat', {
  stat: {
    display: 'flex',
    flexDirection: 'column',
  },
  value: {
    fontSize: '2em',
  },
})

const Stat = ({ label, value, classes, children, ...props }) => (
  <div className={classes.stat} {...props}>
    <div className={classes.label}>
      {label}
    </div>
    { value &&
      <div className={classes.value}>
        {value}
      </div>
    }
    {
      children
    }
  </div>
)

export default withStyles(styles)(Stat)
