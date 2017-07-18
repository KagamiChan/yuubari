import React from 'react'
import Typography from 'material-ui/Typography'
import get from 'lodash/get'

import Stat from './stat'

import { withStyles, createStyleSheet } from 'material-ui/styles'

import WeekDay from './week-day'

const styles = createStyleSheet('Stage', theme => ({
  item: {
    display: 'flex',
  },
  shipName: {
    flexGrow: 1,
  },
  recipeCost: {
    display: 'flex',
  },
  cost: {
    '&:not(:last-child)': {
      marginRight: '2ex',
    },
  },
  recipe: {
    '&:not(:last-of-type)': {
      marginBottom: '1ex',
    },
  },
  header: {
    backgroundColor: theme.palette.accent[100],
  },
}))

const stages = [
  <span>1 ~ 6</span>,
  <span>7 ~ MAX</span>,
  <span>Upgrade</span>,
]

const Stage = ({ level, detail, items, ships, classes, ...props }) => {
  if (!detail) {
    return false
  }

  if (level === 2) {
    return (
      <div {...props}>
        <Typography type="button" className={classes.header}>
          {stages[level]}
        </Typography>
        {
          Object.keys(detail).map((shipId) => {
            const entry = detail[shipId]
            return Object.keys(entry).map((upgradeItemId) => {
              const upEntry = entry[upgradeItemId]
              return (
                <div className={classes.recipe}>
                  <div className={classes.recipeCost}>
                    <Stat label="To" className={classes.cost}>
                      {get(items[upgradeItemId], 'api_name')}
                      {!!upEntry.upgradeToItemLevel && `lv${upEntry.upgradeToItemLevel}`}
                    </Stat>
                    <Stat label="Build kit" className={classes.cost}>
                      {upEntry.buildkit} / {upEntry.certainBuildkit}
                    </Stat>
                    <Stat label="Remodel kit" className={classes.cost}>
                      {upEntry.remodelkit} / {upEntry.certainRemodelkit}
                    </Stat>
                    {
                      upEntry.reqItemId > 0 &&
                      <Stat label="Item" className={classes.cost}>
                        {get(items[upEntry.reqItemId], 'api_name')} × {upEntry.reqItemCount}
                      </Stat>
                    }
                  </div>
                  <div className={classes.item}>
                    <div className={classes.shipName}>
                      {get(ships[shipId], 'api_name', 'Any')}
                    </div>
                    <WeekDay day={upEntry.day} />
                  </div>
                </div>
              )
            })
          })
        }
      </div>
    )
  }

  return (
    <div {...props}>
      <Typography type="button" className={classes.header}>
        {stages[level]}
      </Typography>
      {
        Object.keys(detail).map((shipId) => {
          const entry = detail[shipId]
          return (
            <div className={classes.recipe}>
              <div className={classes.recipeCost}>
                <Stat label="Build kit" className={classes.cost}>
                  {entry.buildkit} / {entry.certainBuildkit}
                </Stat>
                <Stat label="Remodel kit" className={classes.cost}>
                  {entry.remodelkit} / {entry.certainRemodelkit}
                </Stat>
                {
                  entry.reqItemId > 0 &&
                  <Stat label="Item" className={classes.cost}>
                    {get(items[entry.reqItemId], 'api_name')} × {entry.reqItemCount}
                  </Stat>
                }
              </div>
              <div className={classes.item}>
                <div className={classes.shipName}>
                  {get(ships[shipId], 'api_name', 'Any')}
                </div>
                <WeekDay day={entry.day} />
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default withStyles(styles)(Stage)
