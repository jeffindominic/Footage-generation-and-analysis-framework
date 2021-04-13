import React from 'react';
import './Train.css';
import {Grid,Card,
    CardContent,
    CardActionArea,
    CardActions,
    CardMedia,
    TextField,
    Typography} from '@material-ui/core'


import ImageUploading from 'react-images-uploading';
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//for image saving request call
import axios from 'axios';
import Swal from 'sweetalert2';
 
export function Train() {
  let [images, setImages] = React.useState([]);
  let [names, setName] = React.useState([]);
  const maxNumber = 5;
  
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    
    setImages(imageList);
  };

  const formvalue =(namelist, addnames) =>{
console.log(namelist, addnames);
setName(namelist);
  };
  const uploadimages = () =>
  {
        for(var a = 0; a<images.length; a++)
        {
          const fd = new FormData();
          //console.log(images[a])
          fd.append('image', images[a]['file']);
          fd.append('name', names['value']);
        
          //Post Request to Nodejs API Route
          axios.post('http://localhost:3000/upload', fd
          ).then(res=>
          {
            //Success Message in Sweetalert modal
            Swal.fire({
              title: 'Trained successfully.',
              text: "Continue analyzing",
              type: 'success',
              
            });
            
            
          });
        }
       
  }
 
  return (
    <div className="Train">
      <Typography variant="h3">Train Model</Typography>
      <br/>
      <br/>
     
      <div>
      <TextField
            variant="outlined"
            margin="normal"
            padding="10%"
            required
            size="small"
            id="name"
            label="Name of the criminal"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={formvalue}
          />
          <br/>
      </div>
    
      <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <div className="mainbtndiv">
              <button className="btn btn-primary"
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
              </button>
              
              <button className="btn btn-danger" onClick={onImageRemoveAll}>Remove all images</button>
            </div>
            {imageList.map((image, index) => (
              <div key={index} className="image-item mt-5 mb-5 mr-5">
                  <Grid>

                  </Grid>
                <img src={image['data_url']} />
                <div className="image-item__btn-wrapper">
                  <button className="btn btn-primary" onClick={() => onImageUpdate(index)}>Update</button>
                  <button className="btn btn-danger" onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
      </div>
      <button className="btn btn-primary" onClick={() => uploadimages()}>Submit Images</button>
    </div>
  );
}
export default Train;