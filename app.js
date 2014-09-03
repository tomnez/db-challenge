var express      = require('express')
  , app          = express()
  , fs           = require('fs')
  , Builder      = require('node-spritesheet').Builder;

// Set static directory
// ------------------------------------------------------------- //
app.use(express.static(__dirname + '/public')); 

// Configure Spritesheet
// ------------------------------------------------------------- //
fs.readdir('./assets/css/spritesrc', function(err, files) {
  if (err) { return console.error(err); }

  if (files.length) {
    var fullPathImages = [];
    for (var i = files.length - 1; i >= 0; i--) {
      var image = files[i]+'';

      // if not hidden and is an accepted image type
      if (/^[^\.]+\.(jpg|jpeg|png|gif)$/.test(image)) {

        var fullPathFile    = './assets/css/spritesrc/' + image
          , fullPathRenamed = './assets/css/spritesrc/' + image.replace('@', '-');

        // rename file to replace '@' with '-' to avoid stylus conflicts
        fs.renameSync(fullPathFile, fullPathRenamed);

        fullPathImages.push(fullPathRenamed);
      }
    };

    var builder = new Builder({
      outputDirectory: './assets/css/sprites',
      outputImage: 'sprite.png',
      outputCss: 'sprites.styl',
      selector: '.sprite',
      images: fullPathImages
    });

    builder.build(function() {
      console.log("Built from " + builder.files.length + " images");

      fs.rename('./assets/css/sprites/sprite.png', './public/css/sprite.png', function(err) {
        if (err) { return console.error(err); }
        console.log("Successfully moved sprite.png into public folder");
      });
    });
  }
});

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