'use strict';
window.onload = function () {
  $(function () {
    $(function () {
      $('.element').typed({
        strings: ['Hi!', 'CSC is a group of students who focuses on solving logic problems and expanding their knowledge about technology...'],
        typeSpeed: 0,
        backDelay: 2000
      });
    });
  });

  $(function () {
    $('a[href*=#]:not([href=#])').click(function () {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  });
}
