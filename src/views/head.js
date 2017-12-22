import React from 'react'
import { Layout, Menu } from 'antd'
import styled from 'styled-components'

import logo from '../assets/logo.png'

const { Header } = Layout

const FixedHeader = styled(Header)`
  position: fixed;
  width: 100%;
  background: #fff;
  z-index: 1000;
`

const MainMenu = styled(Menu)`
  line-height: 64px;
`

const Logo = styled.div`
  display: inline-block;
  float: left;
`

const Head = () => (
  <FixedHeader>
    <MainMenu
      theme="light"
      mode="horizontal"
    >
      <Logo>
        <img src={logo} alt="Atelier Yuubari" height={48} />
      </Logo>
      <Menu.Item>Days</Menu.Item>
      <Menu.Item>types</Menu.Item>
      <Menu.Item>About</Menu.Item>
    </MainMenu>
  </FixedHeader>
)


export default Head
