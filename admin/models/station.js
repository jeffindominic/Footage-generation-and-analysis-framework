const mongoose = require('mongoose');
 

const stationSchema = new mongoose.Schema({
   stationName: {
        type: String
    },
    location: {
        type: String,
    },
    ho: {
        type: String,
    },
    rank: {
        type: String,
    },
    image: {
        type: String,
    },
    
});


const Station = mongoose.model('Station', stationSchema);

module.exports = Station;