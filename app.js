var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var url = require('url');
var index = require('./routes/index');
var users = require('./routes/users');
var server = require('./routes/server');
const fileUpload = require('express-fileupload');

var app = express();
app.use(fileUpload());

// app.post('/upload', function(req, res) {
//   if (!req.files)
//     return res.status(400).send('No files were uploaded.');
 
//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   let sampleFile = req.files.sampleFile;
 
//   // Use the mv() method to place the file somewhere on your server
//   sampleFile.mv('./public/upload/'+sampleFile.name, function(err) {
//     if (err)
//       return res.status(500).send(err);
 
//     res.send('File uploaded!');
//   });

//     res.redirect(url.format({
//        pathname:"/",
//        query: {
//         }
//      }));
// });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/users', users);
app.use('/server',server);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
