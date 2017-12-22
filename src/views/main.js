import React, { Component } from 'react'
import keyBy from 'lodash/keyBy'
import format from 'date-fns/format'
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
  AutoSizer,
  WindowScroller,
} from 'react-virtualized'
import { Spin } from 'antd'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { filter, entries, map } from 'lodash'

import { updateData } from '../redux'
import Recipe from './recipe'

const MainWrapper = styled.div`
  margin: 2em 4em;
`

const MainMasonry = styled(Masonry)`
  outline: none;
  >div {
    padding-bottom: 10px;
  }
`

const INIT_COLUMN_WITH = 500

const recipesSelector = createSelector(
  [
    state => state.items,
    state => state.recipes,
    state => state.query,
  ], (items, recipes, query) => filter(recipes, recipe =>
    String(recipe.item).includes(query)
  )
)

const MainView = connect(
  state => ({
    ships: state.ships,
    items: state.items,
    types: state.types,
    recipes: recipesSelector(state),
    count: state.count,
    time: state.time,
    query: state.query,
  })
)(class MainView extends Component {
  state = {
    loading: false,
    cellIndex: [],
  }

  componentDidMount = async () => {
    try {
      const { ships, items, types } = await this.fetchStart2()
      const recipesData = await this.fetchRecipes()
      this.props.dispatch(updateData({
        ships,
        items,
        types,
        ...recipesData,
      }))
    } catch (e) {
      console.error(e)
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.query !== this.props.query) {
      this.resetCellPositioner()
    }
  }

  fetchRecipes = async () => {
    const res = await fetch('//poi.0u0.moe/api/recipe/full')
    const data = await res.json()

    data.recipes = map(entries(data.recipes), ([id, datum]) => ({ ...datum, item: Number(id) }))
    return data
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
  columnWidth = INIT_COLUMN_WITH
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

  cellRenderer = ({
    index, key, parent, style,
  }) => {
    const {
      recipes, ships, items, types
    } = this.props
    const recipe = recipes[index] || {}
    return (
      <CellMeasurer cache={this.cellMeasurerCache} index={index} key={key} parent={parent}>
        <Recipe
          style={style}
          item={items[recipe.item]}
          items={items}
          recipe={recipe}
          ships={ships}
          types={types}
        />
      </CellMeasurer>
    )
  }

  handleResize = ({ width }) => {
    this.columnCount = Math.floor(width / (INIT_COLUMN_WITH + this.spacer))
    this.columnWidth = Math.floor(((width - (this.spacer * (this.columnCount - 1))) / this.columnCount))
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
    const { recipes, time } = this.props
    return (
      <div>
        {
          !recipes.length &&
          <Spin />
        }
        <MainWrapper>
          {
            !!recipes.length &&
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
                          <MainMasonry
                            autoHeight
                            cellCount={recipes.length}
                            cellMeasurerCache={this.cellMeasurerCache}
                            cellPositioner={this.cellPositioner}
                            cellRenderer={this.cellRenderer}
                            scrollTop={scrollTop}
                            height={height}
                            width={width}
                            innerRef={(ref) => { this.masonry = ref }}
                          />
                        )
                      }
                    </AutoSizer>
                  )
                }
              </WindowScroller>
          }
        </MainWrapper>
        <div>
          <span>Made with 🍈. </span>
          { !!time && `Last update: ${format(time, 'YYYY-MM-DD HH:mm:ss')}`}
        </div>
      </div>
    )
  }
})

export default MainView
