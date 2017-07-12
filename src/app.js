import React, { Component } from 'react'

import { AppBar, Toolbar, Typography, Button } from 'material-ui'

import { withStyles, createStyleSheet } from 'material-ui/styles'

import logo from './assets/logo.png'

const styles = createStyleSheet('MainApp', {
  header: {
    flex: 1,
  },
})

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography type="title" color="inherit" className={classes.header}>
            <img src={logo} alt="Atelier Yuubari" height={48} />
          </Typography>
          <Button>About</Button>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(App)
