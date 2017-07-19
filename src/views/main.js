import React, { Component } from 'react'
import keyBy from 'lodash/keyBy'
import format from 'date-fns/format'
import { CellMeasurer, CellMeasurerCache, createMasonryCellPositioner, Masonry, AutoSizer, WindowScroller } from 'react-virtualized'

import Typography from 'material-ui/Typography'
import { LinearProgress } from 'material-ui/Progress'

import Recipe from './recipe'

import { withStyles, createStyleSheet } from 'material-ui/styles'

const styles = createStyleSheet('Main', {
  main: {
    margin: '2em 4em 2em 4em',
  },
  footer: {
    textAlign: 'center',
    height: '2em',
  },
})

class MainView extends Component {
  state = {
    loading: false,
    time: 0,
    count: 0,
    recipes: {},
    cellIndex: [],
  }

  componentDidMount = async () => {
    try {
      const { ships, items, types } = await this.fetchStart2()
      const recipesData = await this.fetchRecipes()
      this.setState({
        ships,
        items,
        types,
        cellIndex: Object.keys(recipesData.recipes),
        ...recipesData,
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

  columnCount = 3
  columnWidth = 550
  spacer = 16

  cellMeasurerCache = new CellMeasurerCache({
    defaultHeight: 400,
    defaultWidth: this.columnWidth,
    fixedWidth: true,
  })

  cellPositioner = createMasonryCellPositioner({
    cellMeasurerCache: this.cellMeasurerCache,
    columnCount: this.columnCount,
    columnWidth: this.columnWidth,
    spacer: this.spacer,
  })

  cellRenderer = ({ index, key, parent, style }) => {
    const { recipes, ships, items, types, cellIndex } = this.state
    const itemId = cellIndex[index]
    return (
      <CellMeasurer cache={this.cellMeasurerCache} index={index} key={key} parent={parent}>
        <Recipe
          style={style}
          item={items[itemId]}
          items={items}
          recipe={recipes[itemId]}
          ships={ships}
          types={types}
        />
      </CellMeasurer>
    )
  }

  handleResize = ({ width }) => {
    this.columnCount = Math.floor(width / (this.columnWidth + this.spacer))
    this.resetCellPositioner()
  }

  resetCellPositioner = () => {
    this.cellPositioner.reset({
      columnCount: this.columnCount,
      columnWidth: this.columnWidth,
      spacer: this.spacer,
    })

    if (this.masonry) {
      this.masonry.recomputeCellPositions()
    }
  }

  render() {
    const { recipes, time, cellIndex } = this.state
    const { classes } = this.props
    return (
      <div>
        {
          !Object.keys(recipes).length &&
          <LinearProgress />
        }
        <div className={classes.main}>

          {
            !!cellIndex.length &&
              <WindowScroller>
                {
                  ({ height, scrollTop }) => (
                    <AutoSizer
                      disableHeight
                      scrollTop={scrollTop}
                      onResize={this.handleResize}
                    >
                      {
                        ({ width }) => (
                          <Masonry
                            autoHeight
                            cellCount={cellIndex.length}
                            cellMeasurerCache={this.cellMeasurerCache}
                            cellPositioner={this.cellPositioner}
                            cellRenderer={this.cellRenderer}
                            scrollTop={scrollTop}
                            height={height}
                            width={width}
                            ref={(ref) => { this.masonry = ref }}
                          />
                        )
                      }
                    </AutoSizer>
                  )
                }
              </WindowScroller>
          }
        </div>
        <div className={classes.footer}>
          <Typography type="button">
            <span>Made with 🍈. </span>
            { !!time && `Last update: ${format(time, 'YYYY-MM-DD HH:mm:ss')}`}
          </Typography>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(MainView)
