import React, { Component } from 'react'

import Card, { CardActions, CardContent } from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import Typography from 'material-ui/Typography'

import { withStyles, createStyleSheet } from 'material-ui/styles'

import Stat from './stat'
import Stage from './stage'

const styles = createStyleSheet('Recipe', {
  card: {
    width: '100%',
    marginBottom: '1em',
    breakInside: 'avoid',
  },
  commonCost: {
    display: 'flex',
  },
  cost: {
    '&:not(:last-child)': {
      marginRight: '2ex',
    },
  },
  stage: {
    '&:not(:last-child)': {
      marginBottom: '2ex',
    },
  },
})

class Recipe extends Component {
  render() {
    const { classes, recipe, item, ships, items, types } = this.props
    const { common, stage } = recipe
    const type = types[item.api_type[2]]
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography type="body2">{type.api_name}</Typography>
          <Typography type="headline">{item.api_name}</Typography>
          <Typography type="body1" className={classes.commonCost}>
            {
              ['fuel', 'ammo', 'steel', 'bauxite'].map(cost => (
                <Stat key={cost} label={cost} className={classes.cost}>
                  {common[cost]}
                </Stat>
              ))
            }
          </Typography>
          <Typography type="body1" className={classes.stages}>
            {
              [0, 1, 2].map(level =>
                <Stage key={level} level={level} detail={stage[level]} ships={ships} items={items} className={classes.stage} />
              )
            }
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(Recipe)
