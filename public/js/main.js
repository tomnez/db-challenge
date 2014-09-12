(function($) {

  // DOM ready functionality
  $(document).ready(function() {

    var animationEnd = 'webkitAnimationEnd oanimationend msAnimationEnd animationend transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';

    // OPEN / CLOSE MENU
    // ----------------------------------------------
    var siteWrap = $('.site-wrap')
      , menuButton = $('.menu-container');

    if (menuButton.length) {
      menuButton.on('click', function() {
        siteWrap.toggleClass('opened');
      });
    }

    // WHY BUSINESS? TRIO IMAGES
    // ----------------------------------------------
    var windows = $('.business-window')
      , areVisible;

    if (windows.length) {
      // function to apply animation class
      // once the image windows are in view
      function animateBusinessImages() {
        var images = windows.find('span[class^="business"]');
        images.addClass('animate');

        // prevent animation from running a second time
        windows.last().on(animationEnd, function() {
          images.addClass('final-state').removeClass('animate');
        });

        // remove scroll listener
        $(window).off('scroll', scrollHandler);
      }

      // function to run on window scroll to
      // check if image windows are in view
      var scrollHandler = function() {
        // if divs were already visible when page loaded,
        // wait 200px and then apply animations.
        if (areVisible) {
          var scrollVal = $(window).scrollTop();
          scrollVal > 200 && animateBusinessImages();
        } else {
          // otherwise, wait until they're in view
          // and apply animation then.
          isElementInViewport(windows) && animateBusinessImages();
        }
      };

      // check if windows are already in view
      // and listen for scroll event.
      areVisible = isElementInViewport(windows);
      $(window).on('scroll', scrollHandler);
    }

    // FOR TEAM - INIT GALLERY
    // ----------------------------------------------
    
    // don't start animating gallery until it's in view
    var gallery = $('#doForTeam').find('.gallery');

    if (gallery.length) {
      console.log('hay');
      // activate gallery once it's in view
      var galleryScrollHandler = function() {
        if (isElementInViewport(gallery)) {
          gallery.removeClass('deactivated');
          $(window).off('scroll', galleryScrollHandler);
        }
      };

      var controls = $('.control-item');

      // start gallery or add scroll listener
      if (isElementInViewport(gallery)) {
        gallery.removeClass('deactivated');
      } else {
        $(window).on('scroll', galleryScrollHandler);
      }

      // left/right arrow clicks
      $(document).on('click', '.gallery-forward, .gallery-back', function(e) {
        // first check window location to see if item link is in there.
        var path = window.pathname;

        // this would need to be revisited if we were to implement
        // hash links on this page or a frontend MV* that uses a
        // hashtag for routing.
        if (path.indexOf('#') !== -1) {
          // break off query string if it exists
          path = (path.indexOf('?') !== -1) ? path.split('?').shift() : path;

          // get image number to use for index
          var i = parseInt(path.split('-').pop(), 10) // if path is #item-3, return '3' and convert to intenger

          // force a click on the nav control for the needed index
          // LEFT OFF HERE. IF i !== controls.length bla bla bla
        }
        // if not, determine which slide is currently active
        // (howwwww? get opacity of each slide maybe and grab the highest value?)
      });
    }
  });


  // below not required for DOM ready
  function isElementInViewport (el) {
    if (el instanceof jQuery) {
      el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
  }

})(jQuery);