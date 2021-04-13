import React, { useState, useEffect} from 'react'
import axios from 'axios';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import {AppBar, Typography, Toolbar, IconButton, Button, Box, Avatar, Divider, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import avatar from "./images/avatar.png";
import {VideoLibrary, ArrowBack, Face, LocationOn} from '@material-ui/icons';
import MobileRightMenuSlider from "@material-ui/core/Drawer"
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Dialog from '@material-ui/core/Dialog';
import SearchIcon from '@material-ui/icons/Search';
import { Redirect } from 'react-router-dom';


const useStyles = makeStyles(theme=>({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    menuSliderContainer: {
      width: 250,
      background: "white",
      height: "100%"
    },
    avatar: {
      display: "block",
      margin: "0.5rem auto",
      width: theme.spacing(6),
      height: theme.spacing(6)
    },

    listItem: {
      color: "grey"
    },
    searchfield: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        padding:"100px"
      }},
      grid:{
        flexGrow: 1,
      },
      paper: {
        height:" 200",
        width: "150",
      },
      media: {           // this is the`className` passed to `CardMedia` later
    height: "150px",     // as an example I am modifying width and height
    width: "250px",
    backgroundColor: "#e6f7ff"
    
  },
    }
  ));
  

  


const Calendar = () => {
    const [state, setState] = useState({
      right: false
    })

    const toggleSlider = (slider, open) =>() => {
      setState({...state, [slider]: open });
    }
    const [videos, setVideos] = useState([]);
    const [search, setSearch]= useState('')
    const classes = useStyles()
    const [spacing, setSpacing] = React.useState(2);
   
    //getting footages from the database
    const getVideos = async () => {
        const res = await axios.get('/api/calendar');
        console.log( res.data.videos );
        setVideos(res.data.videos)
    }
   useEffect(() => {
    getVideos();
    }, [] );
   

    const {uid} = useParams()
    console.log(uid)
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    const filteredVideos = videos.filter(video =>{
      return video.location.toLowerCase().includes( search.toLowerCase())
    })
    const [move, setmove] = useState(false)
    
    //search filter for footages
    const allVideos = videos.length > 0 && filteredVideos.map( (video, index) =>  {
      const videoAnalyse = () => {
        localStorage.setItem ('video',JSON.stringify(video.link))
        localStorage.setItem('uid',uid)
        setmove(true)
      }
      //displaying footages
        return(
          <>
          
 
        <Grid >
        <Card style={{width:"90%", height:"100%"}}> 
        <br/>
        <CardActionArea>
          <CardMedia 
          className={classes.media}
            component='video'
           alt={video.event_name}
            image={video.link}
            
          />
          
          <CardContent >
            <Typography gutterBottom variant="h6" component="h6">
            {video.location}
            </Typography>
            <Typography gutterBottom variant="h7" component="h7">
            {video.event_name}
            </Typography>
            <Typography gutterBottom variant="h6" component="h6">
            {video.date}
            </Typography>
            <Typography gutterBottom variant="h7" component="h7">
            <a href= {video.link}>Play</a>  
            </Typography>
          </CardContent>
        </CardActionArea >
        <CardActions style={{backgroundColor:'#e6f7ff'}}>
          {/* <Button size="small" color="primary" onClick={handleClick}>
            Culprits
          </Button> */}
          <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>The content of the Popover.</Typography>
      </Popover>
      {/* <Link href={`/face`} variant="body2"> */}
          <Button size="small" color="primary" onClick={videoAnalyse} >
            Analyse
          </Button>
          {/* </Link> */}
        </CardActions>
        </Card> 
        <Dialog open={move}>
          <Redirect to="/face"/>
        </Dialog>
        </Grid>

       </> 
       )
        
    })
    const message = filteredVideos.length > 0 ? "Footages" :"No footage found"
    const menuItems = [
      {
        listIcon: <VideoLibrary/>,
        listText: "Footage"
      },
      {
        listIcon: <Face/>,
        listText: "Crimimal List"
      }, 
      {
        listIcon: <LocationOn/>,
        listText: "Stations"
      },
    ];

    const sideList = slider => (
      
      <Box className={classes.menuSliderContainer} 
          component="div"
          onClick={toggleSlider(slider, false)} >
      <Avatar variant="rounded" className={classes.avatar} src={avatar} alt={uid}/>
    
    <Divider/>
    <List>
      {menuItems.map((lsItem, key) =>(
      <ListItem button key={key}>
        <ListItemIcon className={classes.listItem}>
          {lsItem.listIcon}</ListItemIcon>
        <ListItemText primary={lsItem.listText} color="white"/>
      </ListItem>
      ))}
    </List>
    </Box>

    )
    

    return (
      <>
       
            <Box component="nav">
            <AppBar position="static" style={{background:"#002333"}}>
                    <Toolbar>
                      {/* <IconButton onClick={toggleSlider("right",true)}>  
                        <ArrowBack style={{color: "white"}} />
                      </IconButton> */}
                      <IconButton variant="btn btn-success" onClick={event =>  window.location.href=`/home/${uid}`}>
                        <ArrowBack style={{color: "white"}} />
                        </IconButton>
                        <Typography varient="h5" style={{color:"white"}}>Analysis Frame Work
                        </Typography>
                        
                        <MobileRightMenuSlider
                         open={state.right}
                         onClose={toggleSlider("right", false)}>
                           {sideList("right")} 
                        </MobileRightMenuSlider>
                    </Toolbar>
                </AppBar>
                <br/>
                <Box><SearchIcon style={{verticalAlign: 'flex-right'}} fontSize="large"/>
                <TextField size="small" id="outlined-search" placeholder="Search by Station location" type="text" variant="outlined" onChange={e => setSearch(e.target.value)} />
                </Box>
            <Box>
            <h2>{message}</h2>
            <br/>
            <Grid container className={classes.grid} spacing={2}>
            <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}>
              <Paper className={classes.paper} />
              { allVideos }
            </Grid>
            </Grid>
            </Grid>
        </Box>
        </Box>
        </>
        
    )
}

export default Calendar;