(function($) {

  // DOM ready functionality
  $(document).ready(function() {

    // listener to open/close menu
    var siteWrap = $('.site-wrap')
      , menuButton = $('.menu-container');

    if (menuButton.length) {
      menuButton.on('click', function() {
        siteWrap.toggleClass('opened');
      });
    }

  });

  // anythang else

})(jQuery);