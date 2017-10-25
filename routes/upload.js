var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.post('/upload',function(req, res) {
  
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
 
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('filename.txt', function(err) {
    if (err)
      return res.status(500).send(err);
 
    // res.send('File uploaded!');
    console.log("File uploaded!");
  });
});

module.exports = router;


// app.post('/upload', function(req, res) {
//   if (!req.files)
//     return res.status(400).send('No files were uploaded.');
 
//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   let sampleFile = req.files.sampleFile;
 
//   // Use the mv() method to place the file somewhere on your server
//   sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
//     if (err)
//       return res.status(500).send(err);
 
//     res.send('File uploaded!');
//   });
// }
// );