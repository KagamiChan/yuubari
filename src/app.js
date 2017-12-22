import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'

import Head from './views/head'
import MainView from './views/main'

const { Content, Footer } = Layout

const MainContent = styled(Content)`
  padding: 0 50px;
  margin-top: 64px;
`

const App = () => (
  <Layout>
    <Head />
    <MainContent>
      <MainView />
    </MainContent>
    <Footer>

    </Footer>
  </Layout>
)

export default App
