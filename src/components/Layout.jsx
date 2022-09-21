import React from 'react'

import {
  AppBar, Box, Toolbar, ListItem, ListItemButton, ListItemIcon,
  IconButton, Typography, Button, 
} from '@material-ui/core'
import { Logout } from '@mui/icons-material';
import { makeStyles } from '@material-ui/styles';

const styles = () => ({
  root: {
    // textAlign: "center",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
    color: "#000133",
  },
  container: {
    display: "flex",
    flex: 1,
  },
  sidebar: {
    background: "#D8DCD6",
    position: "static",
    transition: "width .2s",
    border: "none",
    width: "220px"
  },
  main: {
    flex: 1,
    background: "#f7f5f5",
    color: "black",
    height: "93vh",
    overflowY: "scroll",
  },
})

const useStyles = makeStyles(styles);

export default function Layout({ children }) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='sticky'>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ODR
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, ml: 'auto' }}
          >
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <Box className={classes.sidebar}>

        </Box>
        <Box component='main' className={classes.main}>
          {children}
        </Box>
      </div>
    </div>
  )
}

function CustomListItem() {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton>
    </ListItem>
  )
}