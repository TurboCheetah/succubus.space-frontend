/*  ---------------------------------------------------
    Theme Name: Anime
    Description: Anime video tamplate
    Author: Colorib
    Author URI: https://colorib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

'use strict';

(function ($) {
  /* ------------------
        Preloader
    -------------------- */
  $(window).on('load', function () {
    $('.loader').fadeOut()
    $('#preloder').delay(200).fadeOut('slow')

    /* ------------------
            FIlter
        -------------------- */
    $('.filter__controls li').on('click', function () {
      $('.filter__controls li').removeClass('active')
      $(this).addClass('active')
    })
    if ($('.filter__gallery').length > 0) {
      var containerEl = document.querySelector('.filter__gallery')
      var mixer = mixitup(containerEl)
    }
  })

  /* ------------------
        Background Set
    -------------------- */
  // Search model
  $('.search-switch').on('click', function () {
    $('.search-model').fadeIn(400)
  })

  $('.search-close-switch').on('click', function () {
    $('.search-model').fadeOut(400, function () {
      $('#search-input').val('')
    })
  })

  /* ------------------
		Navigation
	-------------------- */
  $('.mobile-menu').slicknav({
    prependTo: '#mobile-menu-wrap',
    allowParentLinks: true
  })

  /* ------------------
        Scroll To Top
    -------------------- */
  $('#scrollToTopButton').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 'slow')
    return false
  })
})(jQuery)
