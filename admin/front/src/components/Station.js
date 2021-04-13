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
import {AppBar, Typography, Toolbar, IconButton, Button, Box, Divider, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import {VideoLibrary, ArrowBack, Face, LocationOn} from '@material-ui/icons';
import MobileRightMenuSlider from "@material-ui/core/Drawer"
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { save } from 'save-file';





import { Alert, AlertTitle } from '@material-ui/lab';
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
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundcolor: '#e6f7ff',
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
        height:" 140",
        width: "100",
      },
      media: {           // this is the`className` passed to `CardMedia` later
    height: "150px",     // as an example I am modifying width and height
    width: "300px",
    
  },
    }
  ));
  


const Station = () => {

    const [openform, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClickClose = () => {
      setOpen(false);
    };

    const [state, setState] = useState({
        right: false
      })

      const [userDetails, setUserDetails] = useState({
        stationName: '',
        location: '',
        ho: '',
        rank: '',
        message: '',
      });
      let file;
      const formValues = (event) => {
        if([event.target.name]=="image")
        {
         file = event.target.files[0].name;
          setImageDetails({
            ...imageDetails,
            [event.target.name]: file
          })

        }
        else
        {
          setUserDetails({
            ...userDetails,
            [event.target.name]: event.target.value
          })
        }
      }
     

      const [imageDetails,setImageDetails] = useState({
        image: '',
      });
      const [preview,setPreview] = useState();
      useEffect (() => {
          if(!imageDetails) {return;}
          const fileReader = new FileReader();
          fileReader.onload=()=>{setPreview(fileReader.result);}
          
      },[imageDetails]);
//inserting station details to database
      const insert = async (event) => {
        event.preventDefault();
        
        const body = JSON.stringify({
          stationName: userDetails.stationName,
          location: userDetails.location,
          ho: userDetails.ho,
          rank: userDetails.rank,
          image: imageDetails.image,
        });
    
        const response = await axios.post("/api/station", body, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
       setUserDetails({
         ...userDetails,
         message: response.data.message
       })
       await save(imageDetails,userDetails.stationName+'.jpg')
      }
  
      const toggleSlider = (slider, open) =>() => {
        setState({...state, [slider]: open });
      }
      const [stations, setStations] = useState([]);
      const [search, setSearch]= useState('')
      const classes = useStyles()
      const [spacing, setSpacing] = React.useState(2);
     
      const getStations = async () => {
          const res = await axios.get('/api/station');
          console.log( res.data.stations );
          setStations(res.data.stations);
      }
     useEffect(() => {
      getStations();
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
      
      //search filter for station
      const filteredStations = stations.filter(station =>{
        return station.stationName.toLowerCase().includes( search.toLowerCase())
      })
      
      //displaying station list from database
      const allStations = stations.length > 0 && filteredStations.map( (station, index) =>  {
        
          return(
            <>
            
            
          <Grid >
          <Card style={{width:"100%", height:"100%"}}> 
          <CardActionArea>
            <CardMedia className={classes.media}
            component="img"
            alt={station.stationName}
            height="140"
            image={"/stations/"+station.stationName+".jpg"}
            title={station.stationName}
              
            />
            
            <CardContent>
            <Typography gutterBottom variant="h5" component="h5">
              {station.stationName}
              </Typography>
              <Typography gutterBottom variant="h7" component="h7">
              {station.location}
              </Typography>
              <Typography gutterBottom variant="h6" component="h6">
              Station Officer: {station.ho}
              </Typography>
              <Typography gutterBottom variant="h6" component="h6">
              Officer Rank: {station.rank}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions style={{backgroundColor:'#e6f7ff'}}>
          <Button size="small" color="primary" onClick={handleClick}>
            More info
          </Button>
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
      </CardActions>
          </Card> 
          </Grid>
  
         </> 
         )
          
      })
      const message = filteredStations.length > 0 ? "Stations" :"No station records found"
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
                          <Typography varient="h5" style={{color:"white"}}>Stations
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
                  <TextField size="small" id="outlined-search" placeholder="Search by Station Name" type="text" variant="outlined" onChange={e => setSearch(e.target.value)} />
                  </Box>
                  <br/>
                  <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Stations
      </Button>
      <Dialog open={openform} onClose={handleClickClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" alignSelf='center'>Add Station</DialogTitle>
        <DialogContent>
        <form className={classes.form} noValidate onSubmit={insert}>
          <TextField
            variant="outlined"
            margin="normal"
            padding="10%"
            required
            size="small"
            id="stationName"
            label="StationName"
            name="stationName"
            autoComplete="Station Name"
            autoFocus
            onChange={formValues}
          />
          <br/>
          <TextField
            variant="outlined"
            margin="normal"
            size="small"
            required
            name="location"
            label="Location"
            id="location"
            autoComplete="Location"
            onChange={formValues}
          />
          <br/>
          <TextField
            variant="outlined"
            margin="normal"
            size="small"
            required
            name="ho"
            label="Head Officer"
            id="ho"
            autoComplete="Head Officer"
            onChange={formValues}
          />
          <br/>
          <TextField
            variant="outlined"
            margin="normal"
            size="small"
            required
            name="rank"
            label="Rank"
            id="rank"
            autoComplete="Rank of the Head Officer"
            onChange={formValues}
          />
          <br/>
          <Card>
              {preview && <CardMedia component="img" 
              alt="image" src={preview} height="100"/>}
            {!preview && <Typography>Upload Image</Typography>}
          <input type="file"  id="image" class="form-control" name="image" onChange={(e)=>setImageDetails(e.target.files[0])}/>
          
          </Card>
      <br/>
          <Button
            type="submit"
            
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add
          </Button>
          
            <Grid container justify="center">
                  <Grid item>
                    {     userDetails.message ==="added" 
                          ? <Redirect to = {`/station/${uid}`} />
                          : <Alert severity="info" justify="flex-left">
                            <AlertTitle></AlertTitle>
                            <strong>{userDetails.message}</strong>
                            </Alert>
                      }
                  </Grid>
            </Grid>

       </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} color="primary">
            Cancel
          </Button>
          
        </DialogActions>
      </Dialog>

                 
              <Box>
              <h2>{message}</h2>
              <br/>
              <Grid container className={classes.grid} spacing={2}>
              <Grid item xs={12}>
              <Grid container justify="center" spacing={spacing}>
                <Paper className={classes.paper} />
                { allStations }
              </Grid>
              </Grid>
              </Grid>
          </Box>
          </Box>
          </>
          
      )
  }
  
export default Station
