import React from 'react'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

import { withStyles, createStyleSheet } from 'material-ui/styles'

import logo from '../assets/logo.png'

const styles = createStyleSheet('MainApp', {
  header: {
    flex: 1,
  },
})

const Header = ({ classes }) => (
  <AppBar position="static" color="default">
    <Toolbar>
      <Typography type="title" color="inherit" className={classes.header}>
        <img src={logo} alt="Atelier Yuubari" height={48} />
      </Typography>
      <Button>Days</Button>
      <Button>types</Button>
      <Button>About</Button>
    </Toolbar>
  </AppBar>
)


export default withStyles(styles)(Header)
