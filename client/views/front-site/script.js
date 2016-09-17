Template.home.onCreated(function () {
    setTimeout(function() {
      $(".element").typed({
              strings: ["Hi!","CSC is a group of students who focuses on solving logic problems and expanding their knowledge about technology..."],
          typeSpeed: 0,
          backDelay: 2000,
      });
    }, 1000);
})