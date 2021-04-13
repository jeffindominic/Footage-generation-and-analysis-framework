const mongoose = require('mongoose');
 

const videoSchema = new mongoose.Schema({
   link: {
        type: String
    },
    location: {
        type: String,
    },
    event_name: {
        type: String,
    },
    date: {
        type: String
    }
});


const Video = mongoose.model('video.chunks', videoSchema);

module.exports = Video;