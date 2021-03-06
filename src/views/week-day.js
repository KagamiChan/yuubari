import React from 'react'
import range from 'lodash/range'
import setDay from 'date-fns/set_day'
import cls from 'classnames'

import { withStyles, createStyleSheet } from 'material-ui/styles'

const now = new Date()

const days = range(7).map((i) => {
  const date = setDay(now, i, { weekStartsOn: 0 })
  return date.toLocaleString(window.navigator.language, { weekday: 'narrow' })
})

const styles = createStyleSheet('WeekDay', theme => ({
  week: {
    display: 'flex',
  },
  day: {
    fontSize: '60%',
    width: '2em',
    height: '2em',
    textAlign: 'center',
    lineHeight: '2em',
    border: `solid 1px ${theme.palette.primary[500]}`,
    marginLeft: '-1px',
  },
  on: {
    backgroundColor: theme.palette.primary[500],
  },
}))

const WeekDay = ({ day = [], classes }) => (
  <div className={classes.week}>
    {
      range(7).map(i => (
        <div
          key={i}
          className={cls(classes.day, {
            [classes.on]: day.includes(i),
          })}
        >
          {days[i]}
        </div>
      ))
    }
  </div>
)

export default withStyles(styles)(WeekDay)
