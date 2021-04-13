import React from 'react'
import { Link } from 'react-router-dom';

import {AppBar, Typography, Toolbar, Button, Box, Avatar} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import avatar from "./images/avatar.png";

const Nav = () => {
    return (
        <>
            <Box component="div">
                <Avatar src="avatar" alt=""/>
            </Box>
        
            <Box component="nav">
            <AppBar position="static" style={{background:"#002333"}}>
                    <Toolbar>
                        <Typography varient="h5" style={{color:"white"}}>Analysis Frame Work</Typography>
                    </Toolbar>
                </AppBar>
            </Box> 
        </>
    )
}

export default Nav
