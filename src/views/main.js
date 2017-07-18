import React, { Component } from 'react'

import keyBy from 'lodash/keyBy'

import Recipe from './recipe'

import { withStyles, createStyleSheet } from 'material-ui/styles'

const styles = createStyleSheet('Main', {
  main: {
    margin: '2em 4em 0 4em',
    columnCount: 3,
    columnGap: '1em',
    columnFill: 'balance',
  },
})

class MainView extends Component {
  state = {
    loading: false,
    time: 0,
    count: 0,
    recipes: {},
  }

  componentDidMount = async () => {
    try {
      const { ships, items, types } = await this.fetchStart2()
      const recipes = await this.fetchRecipes()
      this.setState({
        ships,
        items,
        types,
        ...recipes,
      })
    } catch (e) {
      console.error(e)
    }
  }

  fetchRecipes = async () => {
    const res = await fetch('//poi.0u0.moe/api/recipe/full')
    return res.json()
  }

  fetchStart2 = async () => {
    const res = await fetch('//poi.0u0.moe/api/recipe/start2')
    const { data } = await res.json()
    return ({
      ships: keyBy(data.api_mst_ship, 'api_id'),
      items: keyBy(data.api_mst_slotitem, 'api_id'),
      useitems: keyBy(data.api_mst_useitem, 'api_id'),
      types: keyBy(data.api_mst_slotitem_equiptype, 'api_id'),
    })
  }

  render() {
    const { recipes, ships, items, types } = this.state
    const { classes } = this.props
    return (
      <div className={classes.main}>
        {
          Object.keys(recipes).map(itemId => (
            <Recipe
              key={itemId}
              item={items[itemId]}
              items={items}
              recipe={recipes[itemId]}
              ships={ships}
              types={types}
            />
          ))
        }
      </div>
    )
  }
}

export default withStyles(styles)(MainView)
