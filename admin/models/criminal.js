const mongoose = require('mongoose');
 
//schema for criminal details
const criminalSchema = new mongoose.Schema({
   name: {
        type: String
    },
    location: {
        type: String,
    },
    crime: {
        type: String,
    },
    image: {
        type: String,
    }
});


const Criminal = mongoose.model('criminals', criminalSchema);

module.exports = Criminal;