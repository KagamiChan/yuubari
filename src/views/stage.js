import React from 'react'
import get from 'lodash/get'
import styled from 'styled-components'

import Stat from './stat'
import WeekDay from './week-day'

const Recipe = styled.div`
  :not(:last-of-type) {
    margin-bottom: 1ex;
  }
`

const Item = styled.div`
  display: flex;
`

const Ship = styled.div`
  flex-grow: 1;
`

const Cost = styled.div`
  display: flex;
`

const CostStat = styled(Stat)`
  :not(:last-of-type) {
    margin-right: 1ex;
  }
`

const stages = [
  <span>1 ~ 6</span>,
  <span>7 ~ MAX</span>,
  <span>Upgrade</span>,
]

const Stage = ({
  level, detail, items, ships, ...props
}) => {
  if (!detail) {
    return false
  }

  if (level === 2) {
    return (
      <div {...props}>
        {stages[level]}
        {
          Object.keys(detail).map((shipId) => {
            const entry = detail[shipId]
            return Object.keys(entry).map((upgradeItemId) => {
              const upEntry = entry[upgradeItemId]
              return (
                <Recipe key={upgradeItemId}>
                  <Cost>
                    <CostStat label="To">
                      {get(items[upgradeItemId], 'api_name')}
                      {!!upEntry.upgradeToItemLevel && `lv${upEntry.upgradeToItemLevel}`}
                    </CostStat>
                    <CostStat label="Build kit">
                      {upEntry.buildkit} / {upEntry.certainBuildkit}
                    </CostStat>
                    <CostStat label="Remodel kit">
                      {upEntry.remodelkit} / {upEntry.certainRemodelkit}
                    </CostStat>
                    {
                      upEntry.reqItemId > 0 &&
                      <CostStat label="Item">
                        {get(items[upEntry.reqItemId], 'api_name')} × {upEntry.reqItemCount}
                      </CostStat>
                    }
                  </Cost>
                  <Item>
                    <Ship>
                      {get(ships[shipId], 'api_name', 'Any')}
                    </Ship>
                    <WeekDay day={upEntry.day} />
                  </Item>
                </Recipe>
              )
            })
          })
        }
      </div>
    )
  }

  return (
    <div {...props}>
      {stages[level]}
      {
        Object.keys(detail).map((shipId) => {
          const entry = detail[shipId]
          return (
            <Recipe key={shipId}>
              <Cost>
                <CostStat label="Build kit">
                  {entry.buildkit} / {entry.certainBuildkit}
                </CostStat>
                <CostStat label="Remodel kit">
                  {entry.remodelkit} / {entry.certainRemodelkit}
                </CostStat>
                {
                  entry.reqItemId > 0 &&
                  <CostStat label="Item">
                    {get(items[entry.reqItemId], 'api_name')} × {entry.reqItemCount}
                  </CostStat>
                }
              </Cost>
              <Item>
                <Ship>
                  {get(ships[shipId], 'api_name', 'Any')}
                </Ship>
                <WeekDay day={entry.day} />
              </Item>
            </Recipe>
          )
        })
      }
    </div>
  )
}

export default Stage
