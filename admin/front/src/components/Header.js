import React from 'react'
import { Typography, Box } from "@material-ui/core"

import { makeStyles } from '@material-ui/core/styles';
import img from "../components/images/cyberdome.png"
import Typed from 'react-typed'
import { Transform } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import Particles from "react-particles-js"

const useStyles = makeStyles({
    root: {
      maxWidth: 800,
      maxHeight: 1200
    },
    cover: {
        height: 100,
        width: 100
    },
    title: {
        color: "#002333",
        marginBottom: "3rem"
    },
    typedcontainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        right: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        textAlign: "center",
        zIndex: 1

    },
    particlesCanvas: {
        position:"absolute"
    }
  });
  


const Header = () => {
    const classes = useStyles();
    return (
        <Box className={classes.typedcontainer} justifyContent="center"> 
               <img src ={img}></img>
              
                
            <Typography className={classes.title} variant="h4">
                <Typed strings={["Footage generation and analysis framework ", "Capture the footage", "Analyze it", "Recognize the culprits"]} 
                typeSpeed={70}
                backSpeed={80}
                loop/>
            </Typography>
            
        </Box>
    )
}

export default Header
