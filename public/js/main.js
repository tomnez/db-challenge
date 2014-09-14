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
      function animateBusinessImages () {
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
      var scrollHandler = function () {
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
    
    var gallery = $('#doForTeam').find('.gallery');

    if (gallery.length) {

      // don't start animating gallery until it's in view
      var galleryScrollHandler = function () {
        if (isElementInViewport(gallery)) {
          gallery.removeClass('deactivated');
          $(window).off('scroll', galleryScrollHandler);
        }
      };

      // jump to next or prev image in gallery
      var navigateToImage = function (controlItems, itemIndex, forward, backward) {
        itemIndex = forward && ((itemIndex < controlItems.length) ? ++itemIndex : 1)
            || backward && ((itemIndex === 1) ? controlItems.length : --itemIndex);
        
        window.location.hash = '#item-' + itemIndex;
      };

      var controls = gallery.find('.control-item')
        , items = gallery.find('.item');

      // start gallery or add scroll listener
      if (isElementInViewport(gallery)) {
        gallery.removeClass('deactivated');
      } else {
        $(window).on('scroll', galleryScrollHandler);
      }

      // left/right arrow clicks
      $(document).on('click', '.gallery-forward, .gallery-back', function(e) {
        // first check window location to see if item link is in there.
        var hashPath = window.location.hash
          , target = $(e.target)
          , forward = target.hasClass('gallery-forward')
          , backward = target.hasClass('gallery-back');

        // this would need to be revisited if we were to implement
        // hash links on this page or a frontend MV* that uses a
        // hashtag for routing.
        if (hashPath.indexOf('#') !== -1) {
          // break off query string if it exists
          hashPath = (hashPath.indexOf('?') !== -1) ? hashPath.split('?').shift() : hashPath;

          // get current item number
          var i = parseInt(hashPath.split('-').pop(), 10); // if hashPath is #item-3, return '3' and convert to intenger

          // jump to next or prev image in gallery
          navigateToImage(controls, i, forward, backward);
        } else {
          // if not, determine which slide is currently active
          // by grabbing the item with the highest opacity and
          // going to the next/prev item.
          var opacity = 0
            , highestOpacityItemNumber;

          for (var i = items.length - 1; i >= 0; i--) {
            var item = items[i]
              , elementOpacityValue = getComputedStyle(item,null).getPropertyValue("opacity");

            if (elementOpacityValue > opacity) {
              opacity = elementOpacityValue;
              highestOpacityItemNumber = ++i;
            }
          };

          navigateToImage(controls, highestOpacityItemNumber, forward, backward);
        }
        
      });
    }
  });


  // Non-DOM ready stuff can go down here

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