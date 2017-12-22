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
      recipes, ships, items, types, cellIndex,
    } = this.state
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
    const { recipes, time, cellIndex } = this.state
    return (
      <div>
        {
          !Object.keys(recipes).length &&
          <Spin />
        }
        <MainWrapper>
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
                          <MainMasonry
                            autoHeight
                            cellCount={cellIndex.length}
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
}

export default MainView
