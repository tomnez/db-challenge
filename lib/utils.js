var fs = require('fs');

module.exports = function() {
  return {

    // takes a directory path to the sprite src images
    // and returns an array of full-path images for
    // gulp.spritesmith to use.
    createImageArray: function(imageDir, callback) {

      fs.readdir(imageDir, function(err, files) {
        if (err) { return console.error(err); }

        var fullPathImages = [];

        if (files.length) {

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
        }

        var err = fullPathImages.length ? null : 'There are no images in the specified directory.';

        // cb with array of images
        callback(err, fullPathImages);
      });
    }
  }
};