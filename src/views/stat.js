import React from 'react'
import styled from 'styled-components'

const StatWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Value = styled.div`
  font-size: 2em;
`

const Stat = ({
  label, value, children, ...props
}) => (
  <StatWrapper {...props}>
    <div>
      {label}
    </div>
    {
      value &&
      <Value>
        {value}
      </Value>
    }
    {
      children
    }
  </StatWrapper>
)

export default Stat
