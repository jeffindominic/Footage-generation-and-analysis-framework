import React from 'react';
import TextField from '@material-ui/core/TextField';


const SearchBox =  (props) => {
    return(
        
        <TextField 
        className='search'
        placeholder={props.placeholder}
        onChange={props.handleChange}
        id="outlined-search" 
        label="Search field" 
        type="search" 
        variant="outlined" />

    )
}

export default SearchBox;