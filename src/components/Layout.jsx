import React from 'react'

import {
  AppBar, Box, Toolbar, ListItem, ListItemIcon,
  IconButton, Typography, Button, ListItemText, Link
} from '@material-ui/core';
import { ListItemButton } from "@mui/material";
import { AccountCircle, Logout } from '@mui/icons-material';
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
          >
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <Box className={classes.sidebar}>
            <SidebarListItem icon={<AccountCircle/>} text="Profile" href="/profile" />
        </Box>
        <Box component='main' p={4} className={classes.main}>
          {children}
        </Box>
      </div>
    </div>
  )
}

function SidebarListItem({ icon, text = "Link To", href = "#" }) {
  return (
    <ListItem style={{paddingLeft: 0, paddingRight: 0}}>
        <Link href={href} style={{width: "100%", textDecoration: "none", color: "inherit"}}>
        <ListItemButton>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItemButton>
        </Link>
    </ListItem>
  )
}