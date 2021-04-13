import 'dart:convert';
import 'dart:io';

import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import 'package:pcam/main.dart';
import 'package:pcam/page/source_page.dart';
import 'package:pcam/widget/video_widget.dart';
import 'package:pcam/model/media_source.dart';
import 'package:mongo_dart/mongo_dart.dart' show Db, GridFS;


class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
//use your mongodb databse  
  final url = [
    "mongodb://intern:rajagiri@cluster0-shard-00-00.5vk1r.mongodb.net:27017/footage?replicaSet=atlas-fbzdq5-shard-0&authSource=admin&retryWrites=true&w=majority",
    "mongodb://intern:rajagiri@cluster0-shard-00-01.5vk1r.mongodb.net:27017/footage?replicaSet=atlas-fbzdq5-shard-0&authSource=admin&retryWrites=true&w=majority",
    "mongodb://intern:rajagiri@cluster0-shard-00-02.5vk1r.mongodb.net:27017/footage?replicaSet=atlas-fbzdq5-shard-0&authSource=admin&retryWrites=true&w=majority"
  ];

  File fileMedia;
  MediaSource source;
  bool _uploaded = false;
  bool isLoading = false;
  var storage = FirebaseStorage.instance;
  GridFS bucket;
  String station;
  TextEditingController stationcontroler = new TextEditingController();
  TextEditingController eventcontroler = new TextEditingController();
  final String location;
  final String event;
  final String footagelink;

  @override
  void initState() {
    connection();
  }

  _HomePageState({this.location, this.event, this.footagelink});

  // StorageReference _reference =
  //     FirebaseStorage.instance.ref().child('fileMedia');
  // String _downloadURL;

  @override
  Widget build(BuildContext context) => Scaffold(
        resizeToAvoidBottomPadding: false,
        appBar: AppBar(
          title: Text(MyApp.title),
        ),
        body: Center(
          child: Padding(
            padding: EdgeInsets.all(32),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Expanded(
                  child: fileMedia == null
                      ? Icon(Icons.photo, size: 120)
                      : (source == MediaSource.image
                          ? Image.file(fileMedia)
                          : VideoWidget(fileMedia)),
                ),
                const SizedBox(height: 24),
                new TextFormField(
                  controller: stationcontroler,
                  decoration: new InputDecoration(
                    labelText: "Enter Station Location",
                    fillColor: Colors.white,

                    border: new OutlineInputBorder(
                      borderRadius: new BorderRadius.circular(25.0),
                      borderSide: new BorderSide(),
                    ),
                    //fillColor: Colors.green
                  ),
                  validator: (val) {
                    if (val.length == 0) {
                      return "Station Location can't be empty";
                    } else {
                      return null;
                    }
                  },
                  keyboardType: TextInputType.text,
                  style: new TextStyle(
                    fontFamily: "Poppins",
                  ),
                ),
                const SizedBox(height: 36),
                new TextFormField(
                  controller: eventcontroler,
                  decoration: new InputDecoration(
                    labelText: "Enter event name",
                    fillColor: Colors.white,

                    border: new OutlineInputBorder(
                      borderRadius: new BorderRadius.circular(25.0),
                      borderSide: new BorderSide(),
                    ),
                    
                  ),
                  validator: (val) {
                    if (val.length == 0) {
                      return "Event name can't be empty";
                    } else {
                      return null;
                    }
                  },
                  keyboardType: TextInputType.text,
                  style: new TextStyle(
                    fontFamily: "Poppins",
                  ),
                ),
                const SizedBox(height: 36),
                fileMedia == null
                    ? Container()
                    : RaisedButton(
                        child: Text('Upload to cloud'),
                        shape: StadiumBorder(),
                        onPressed: () {
                          uploadFile();
                        },
                        color: Theme.of(context).primaryColor,
                        textColor: Colors.white,
                      ),
                const SizedBox(height: 24),
                RaisedButton(
                  child: Text('Capture Video'),
                  shape: StadiumBorder(),
                  onPressed: () => capture(MediaSource.video),
                  color: Theme.of(context).primaryColor,
                  textColor: Colors.white,
                ),
              ],
            ),
          ),
        ),
      );
//media selection
  Future capture(MediaSource source) async {
    setState(() {
      this.source = source;
      this.fileMedia = null;
    });

    final result = await Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => SourcePage(),
        settings: RouteSettings(
          arguments: source,
        ),
      ),
    );

    if (result == null) {
      return;
    } else {
      setState(() {
        fileMedia = result;
      });
    }
  }

  Future uploadFile() async {
    
    try {
      final DateTime now = DateTime.now();
      final int millSeconds = now.millisecondsSinceEpoch;
      final String month = now.month.toString();
      final String date = now.day.toString();
      final String year = now.year.toString();
      String storageId = (stationcontroler.text + millSeconds.toString());
      final String today = ('$date-$month-$year');
//saving selected file to firebase storage
      StorageTaskSnapshot snapshot = await storage
          .ref()
          .child("video")
          .child(today)
          .child(storageId)
          .putFile(fileMedia)
          .onComplete;
      //getting back the video url
      if (snapshot.error == null) {
        final String downloadUrl = await snapshot.ref.getDownloadURL();
        //uploading the video url and details to mongodb
        Map<String, dynamic> video = {
          "_id": storageId,
          "link": downloadUrl,
          "location": stationcontroler.text,
          "event_name": eventcontroler.text,
          "date": today
        };
        var res = await bucket.chunks.insert(video);
        showAlertDialog(context);
      } else {
        print('Error from image repo ${snapshot.error.toString()}');
        errAlertDialog(context);
      }
    } catch (error) {
      print(error);
    }
  }

  Future connection() async {
    Db _db = new Db.pool(url);
    await _db.open(secure: true);
    bucket = GridFS(_db, "video");
  }

// SUCCESS ALERT
  showAlertDialog(BuildContext context) {
    // set up the button
    Widget okButton = FlatButton(
      child: Text("OK"),
      onPressed: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => HomePage()),
        );
      },
    );

    // set up the AlertDialog
    AlertDialog alert = AlertDialog(
      title: Text("SUCCESS"),
      content: Text("uploaded succesfully."),
      actions: [
        okButton,
      ],
    );

    // show the dialog
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return alert;
      },
    );
  }

//// ERROR ALERT////
  errAlertDialog(BuildContext context) {
    // set up the button
    Widget okButton = FlatButton(
      child: Text("OK"),
      onPressed: () {
        Navigator.pop(context);
      },
    );

    // set up the AlertDialog
    AlertDialog alert = AlertDialog(
      title: Text("error"),
      content: Text("Upload Unsuccesfull."),
      actions: [
        okButton,
      ],
    );

    // show the dialog
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return alert;
      },
    );
  }
}
