import React from 'react'
import range from 'lodash/range'
import setDay from 'date-fns/set_day'
import styled, { css } from 'styled-components'

const Week = styled.div`
  display: flex;
`

const Day = styled.div`
  font-size: 60%;
  width: 2em;
  height: 2em;
  text-align: center;
  line-height: 2em;
  border: solid 1px #333;
  margin-left: -1px;

  ${props => props.on && css`
    background: #8BC34A;
  `}
`

const now = new Date()

const days = range(7).map((i) => {
  const date = setDay(now, i, { weekStartsOn: 0 })
  return date.toLocaleString(window.navigator.language, { weekday: 'narrow' })
})


const WeekDay = ({ day = [] }) => (
  <Week>
    {
      range(7).map(i => (
        <Day
          on={day.includes(i)}
          key={i}
        >
          {days[i]}
        </Day>
      ))
    }
  </Week>
)

export default WeekDay
