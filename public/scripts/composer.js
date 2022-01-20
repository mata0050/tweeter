$(document).ready(function() {
  
  // display the remaining character number
  $("#tweet-text").on("input", function(e) {
    const textLength = $(this).val().length;
    const remainingChars = 140 - textLength;
    const counter = $(this).parent().siblings(".tweet-submit").children(".counter");
    counter.text(remainingChars);
    remainingChars < 0 ?  counter.addClass("red") : counter.removeClass("red");
  });

  // hide error on click
  $(".error").on("click", function(e) {
    $(this).fadeOut("fast");
  });

  // perform continous double arrow movement (in navbar)
  const arrowMove = () => {
    $("#slider").animate({height: "toggle"}, {
      duration: 800,
      easing: 'swing',
      complete: arrowMove
    });
  };
  arrowMove(); // invoke function on page load

  // display tweet creation area on click (in navbar)
  $(".nav-right").on("click", function() {
    $(".new-tweet").animate({
      height: "toggle"
    }, 600);
    $("#tweet-text").focus();
  });

  // animate toTop button and show tweet creation area
  $("#toTop").on("click", function() {
    $("html, body").animate({scrollTop: 0}, 0);  //html works for FFX, body works for Chrome
    $(".new-tweet").animate({
      height: "show"
    }, 600);
    $("#tweet-text").focus();
  });

  // show/hide toTop and double-arrow buttons on scroll
  $(window).on("scroll", function() {
    if ($(this).scrollTop() - 150 > 0) {
      $(".nav-right").fadeOut("fast");
      $('#toTop').stop().slideDown('fast'); // show the button
    } else {
      $(".nav-right").fadeIn("fast");
      $('#toTop').stop().slideUp('fast'); // hide the button
      $('#toTop').unbind('mouseenter').unbind('mouseleave');
    }
  });
});
