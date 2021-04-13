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
import { Alert, AlertTitle } from '@material-ui/lab';
import { Redirect } from 'react-router-dom';
import { save } from 'save-file';

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
    height: "250px",     // as an example I am modifying width and height
    width: "200px",
    alignItems: "botttom"
    
  },
    }
  ));
  


const Criminallist = () => {

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
        name: '',
        location: '',
        crime: '',
        message: '',
      });
      const formValues =  (event) => {
        
          setUserDetails({
            ...userDetails,
            [event.target.name]: event.target.value
          })
        
      }
     

      const [imageDetails,setImageDetails] = useState({
        image: '',
      });

     
      
      const [preview,setPreview] = useState();
      useEffect (() => {
          if(!imageDetails) {return;}
          const fileReader = new FileReader();
          fileReader.onload=()=>{setPreview(fileReader.result);}
          //fileReader.readAsDataURL(imageDetails);
          
      },[imageDetails]);
//uploading to database
      const insert = async (event) => {
        event.preventDefault();
        
        const body = JSON.stringify({
          name: userDetails.name,
          location: userDetails.location,
          crime: userDetails.crime,
          image: imageDetails.image,
        });
    
        const response = await axios.post("/api/criminallist", body, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
       setUserDetails({
         ...userDetails,
         message: response.data.message
       })
       //saving criminal images to public folder in front folder
       await save(imageDetails, userDetails.name+'.jpg')
    
      }
  
      const toggleSlider = (slider, open) =>() => {
        setState({...state, [slider]: open });
      }
      const [criminals, setCriminals] = useState([]);
      const [search, setSearch]= useState('')
      const classes = useStyles()
      const [spacing, setSpacing] = React.useState(2);
     
      const getCriminals = async () => {
          const res = await axios.get('/api/criminallist');
          console.log( res.data.criminals );
          setCriminals(res.data.criminals);
      }
     useEffect(() => {
      getCriminals();
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
      
      //search filter
      const filteredCriminals = criminals.filter(criminal =>{
        return criminal.name.toLowerCase().includes( search.toLowerCase())
      })
      //displaying criminal details to card
      const allCriminals = criminals.length > 0 && filteredCriminals.map( (criminal, index) =>  {
        
          return(
            <>
            
            
          <Grid >
          <Card style={{width:"100%", height:"100%"}}> 
          <CardActionArea>
            <CardMedia className={classes.media}
            component="img"
            alt={criminal.name}
            src={"/criminals/"+criminal.name+".jpg"}
            title={criminal.name}
              
            />
           
            
            <CardContent>
            <Typography nowrap gutterBottom variant="h5" component="h5">
              {criminal.name}
              </Typography>
              <Typography nowrap gutterBottom variant="h7" component="h7">
              {criminal.location}
              </Typography>
              <Typography gutterBottom variant="h6" component="h6">
              {criminal.crime}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions style={{backgroundColor:'#e6f7ff'}}>
          {/* <Button size="small" color="primary" onClick={handleClick}>
            More info
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
       <Card><Typography >  {criminal.name}
        </Typography></Card> 
      </Popover>
      </CardActions>
          </Card> 
          </Grid>
  
         </> 
         )
          
      })
      const message = filteredCriminals.length > 0 ? "Criminals" :"No criminal records found"
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
                          <Typography varient="h5" style={{color:"white"}}>Criminal List
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
                  <TextField size="small" id="outlined-search" placeholder="Search by Criminal Name" type="text" variant="outlined" onChange={e => setSearch(e.target.value)} />
                  </Box>
                  <br/>
                  <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Criminals
      </Button>
      <Dialog open={openform} onClose={handleClickClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" alignSelf='center'>Add Criminal</DialogTitle>
        <DialogContent>    
        <form className={classes.form} noValidate onSubmit={insert} encType="muiltypart/form-data">
          <TextField
            variant="outlined"
            margin="normal"
            padding="10%"
            required
            size="small"
            id="name"
            label="Name"
            name="name"
            autoComplete="Name"
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
            name="crime"
            label="Crime"
            id="crime"
            autoComplete="Crime"
            onChange={formValues}
          />
          <br/>
          <Card>
              {preview && <CardMedia component="img" 
              alt="image" src={preview} height="100"/>}
            {!preview && <Typography>Upload image</Typography>}
          
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
                          ? <Redirect to = {`/criminallist/${uid}`} />
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
                { allCriminals }
              </Grid>
              </Grid>
              </Grid>
          </Box>
          </Box>
          </>
          
      )
  }
  
export default Criminallist
