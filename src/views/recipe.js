import React from 'react'
import { Card } from 'antd'
import styled from 'styled-components'

import Stat from './stat'
import Stage from './stage'

const RecipeCard = styled(Card)`
  margin: 5px;
`

const CommonCost = styled.div`
  display: flex;
`

const Cost = styled(Stat)`
  :not(:last-child) {
    margin-right: 2ex;
  }
`

const RecipeStage = styled(Stage)`
  :not(:last-child) {
    margin-bottom: '2ex';
  }
`

const Recipe = ({
  recipe, item, ships, items, types, style,
}) => {
  const { common, stage } = recipe
  const type = types[item.api_type[2]]
  return (
    <RecipeCard style={style} title={`${item.api_name} - ${type.api_name}`}>
      <CommonCost>
        {
          ['fuel', 'ammo', 'steel', 'bauxite'].map(cost => (
            <Cost key={cost} label={cost}>
              {common[cost]}
            </Cost>
          ))
        }
      </CommonCost>
      <div>
        {
          [0, 1, 2].map(level => (
            <RecipeStage
              key={level}
              level={level}
              detail={stage[level]}
              ships={ships}
              items={items}
            />
          ))
        }
      </div>
    </RecipeCard>
  )
}

export default Recipe
