const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const User = require('./models/user');
const Video = require('./models/video')
const Criminal = require('./models/criminal');
const Station = require('./models/station');
var fs = require('fs')

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());

//mongodb database connection username:intern password:rajagiri
const dbUrl = "mongodb+srv://intern:rajagiri@cluster0.5vk1r.mongodb.net/footage?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("Connected to MongoDb");
    } catch (error) {
        console.log(error);
    }
}

//connect Database
connectDB();


app.post("/api/register", async (req, res) => {
    try {
        await User.create({
            fname: req.body.firstName,
            lname: req.body.lastName,
            email: req.body.userEmail,
            password: req.body.userPassword
        });

        res.json({
            message: "User Registred"
        });

    } catch (error) {
        res.json({
            message: "This email is already registered, try login"
        });
    }
    
    console.log( req.body );

    

});

//login page
app.post("/api/", async (req, res) => {
    try {
       const user = await User.findOne({
            email: req.body.userEmail,
            password: req.body.userPassword
        });
        if(user.email != null){
        res.json({
            message: "Login Successful",
            
        });
        console.log(message)
    }
    else{
        res.json({
            message: "Invalid credentials, please try again"
        });
    }

    } catch (error) {
        res.json({
            message: "Invalid credentials, please try again"
        });
    }
    
    console.log( req.body );

});



//footage display in calander page
app.get("/api/calendar", async (req, res) => {
    try {
        const videos = await Video.find();
        
        res.json({
            videos: videos
        })
        
    } catch (error) {
        console.log(error);
    }
    
});

//insert criminal details from criminal page
app.post("/api/criminallist", async (req, res) => {
    try {
        await Criminal.create({
            name: req.body.name,
            location: req.body.location,
            crime: req.body.crime,
            image: req.body.image,
        });

        res.json({
            message: "added",
            
        });

    } catch (error) {
        res.json({
            message: "please check details again!"
        });
    }
    
    console.log( req.body );

    

});


//display criminal details in criminal page
app.get("/api/criminallist", async (req, res) => {
    try {
        const criminals = await Criminal.find();
        
        res.json({
            criminals: criminals
        })
        
    } catch (error) {
        console.log(error);
    }
    
});

//insert station details from station page
app.post("/api/station", async (req, res) => {
    try {
        await Station.create({
            stationName: req.body.stationName,
            location: req.body.location,
            ho: req.body.ho,
            rank: req.body.rank,
            image: req.body.image,
        });

        res.json({
            message: "added",
            
        });

    } catch (error) {
        res.json({
            message: "please check details again!"
        });
    }
    
    console.log( req.body );

    

});


//display station details in station page
app.get("/api/station", async (req, res) => {
    try {
        const stations = await Station.find();
        
        res.json({
            stations: stations
        })
        
    } catch (error) {
        console.log(error);
    }
    
});

// app.post('/upload', (req, res) => {
//     if (!req.files) {
//         return res.status(500).send({ msg: "file is not found" })
//     }
//         // accessing the file
//     const myFile = req.files.image;
//     const name=req.value.name;



//     //  mv() method places the file inside public directory
//     myFile.mv(`${__dirname}/front/public/${mkdir}/${myFile.name}`, function (err) {
//         if (err) {
//             console.log(err)
//             return res.status(500).send({ msg: "Error occured" });
//         }
//         // returing the response with file path and name
//         return res.send({name: myFile.name, path: `/${myFile.name}`});
//     });
// })


const Port = 5000;

app.listen( Port, () => {
    console.log("Server running on Port " + Port);
});