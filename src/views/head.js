import React from 'react'
import { Layout, Menu, Input } from 'antd'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { updateQuery } from '../redux'

import logo from '../assets/logo.png'

const { Header } = Layout

const FixedHeader = styled(Header)`
  position: fixed;
  width: 100%;
  background: #fff;
  z-index: 1000;
  display: flex;
`

const MainMenu = styled(Menu)`
  line-height: 64px;
`

const Logo = styled.div`
  display: inline-block;
  float: left;
  flex-grow: 1;
`

const SearchBar = styled.div`
  width: 20em;
  margin-right: 2em;
`

const Head = connect(
  state => ({
    query: state.query,
  })
)(({ query, dispatch }) => (
  <FixedHeader>
    <Logo>
      <img src={logo} alt="Atelier Yuubari" height={48} />
    </Logo>
    <SearchBar>
      <Input value={query} placeholder="Search..." onInput={e => dispatch(updateQuery(e.target.value))} />
    </SearchBar>
    <MainMenu
      theme="light"
      mode="horizontal"
    >
      <Menu.Item>Days</Menu.Item>
      <Menu.Item>types</Menu.Item>
      <Menu.Item>About</Menu.Item>
    </MainMenu>
  </FixedHeader>
))


export default Head
