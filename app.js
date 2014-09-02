var express      = require('express')
  , app          = express();

// Set static directory
// ------------------------------------------------------------- //
app.use(express.static(__dirname + '/public')); 

// Homepage Route
// ------------------------------------------------------------- //
app.get('/', function(req, res) {
  res.sendfile('./public/index.html');
});

// Port
// ------------------------------------------------------------- //
var p = process.env.port || 3000
  , server = app.listen(p, function() {
  console.log('Listening on port %d', server.address().port);
});