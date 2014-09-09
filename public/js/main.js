(function($) {

  // DOM ready functionality
  $(document).ready(function() {

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
    }

    if (windows.length) {
      areVisible = isElementInViewport(windows);
      $(window).on('scroll', scrollHandler);
    }

    // apply animation and remove scroll listener
    function animateBusinessImages() {
      windows.find('[class^="business"]').addClass('animate');
      $(window).off('scroll', scrollHandler);
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