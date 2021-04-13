import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import FaceIcon from '@material-ui/icons/Face';
import Link from '@material-ui/core/Link';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Button from '@material-ui/core/Button';
import { Redirect, useParams } from 'react-router-dom';
import Header from "./Header";
import Particles from "react-particles-js";
import avatar from "./images/avatar.png";
import {Avatar, Box} from "@material-ui/core"
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Menu from '@material-ui/core/Menu';
import { useHistory } from "react-router-dom";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
   
  },
  drawerPaper: {
    width: drawerWidth,
    background: "white",
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
      
    
    }),
    marginLeft: 0,
  },
  avatar: {
    paddingLeft:"800px"
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  
  
  const {uid} = useParams()
  console.log({uid})
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const history = useHistory();
  const handleLogout = () => {
    history.push("/");
  };

  return (
    
    <div className={classes.root}>
      
      <CssBaseline />
      
      <AppBar
        position="fixed"
        style={{background:'#002333'}}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            Cyberdome
          </Typography>
          
         <Box style={{paddingLeft:"1050px"}}>
         <IconButton onClick={handleClick}> <Avatar  src={avatar} alt={uid}/></IconButton>
      </Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      
      
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        
        <Divider />
        
        
        <Link href={`/calendar/${uid}`} variant="body2">
              <List>
          {
              <ListItem button>
                <ListItemIcon>
                    <VideoLibraryIcon />
                </ListItemIcon>
                <ListItemText color="white" primary="Footages" />
            </ListItem>


          }
        </List></Link>
        <Link href={`/criminallist/${uid}`} variant="body2">
        <List>
          {
                <ListItem button>
                <ListItemIcon>
                    <FaceIcon />
                </ListItemIcon>
                <ListItemText color="white" primary="Criminal List" />
            </ListItem>
          }
        </List>
        </Link>
        <Link href={`/station/${uid}`} variant="body2">
        <List>
          {
                <ListItem button>
                <ListItemIcon>
                    <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Stations" />
            </ListItem>
          }
        </List>
        </Link>
        
        {/* <Link href={`/train/${uid}`} variant="body2">
        <List>
          {
                <ListItem button>
                <ListItemIcon>
                    <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Train Model" />
            </ListItem>
          }
        </List>
        </Link> */}
        
        
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div>
        <Particles canvasClassName={classes.particlesCanvas}
        params={{
            "particles": {
                "number": {
                    "value": 18,
                    "density": {
                        "enable": true,
                        "value_area": 700
                    }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "speed": 2,
                    "out_mode": "in"
                },
                "shape": {
                    "type": [
                        "image",
                        "circle"
                    ],
                    "image": [
                        {
                            "src": "/react.cd2ab268.svg",
                            "height": 20,
                            "width": 23
                        },
                        {
                            "src": "/k8s.2d579d24.svg",
                            "height": 20,
                            "width": 20
                        },
                        {
                            "src": "/code.b3b4c4f4.png",
                            "height": 20,
                            "width": 20
                        }
                    ]
                },
                "color": {
                    "value": "#CCC"
                },
                "size": {
                    "value": 30,
                    "random": false,
                    "anim": {
                        "enable": true,
                        "speed": 4,
                        "size_min": 10,
                        "sync": false
                    }
                }
            },
            "retina_detect": false
        }}
      /> 
          <Header/>
          
        </div>
         
      </main>
    </div>
  );
  
}
