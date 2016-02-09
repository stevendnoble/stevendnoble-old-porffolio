$(function() {
  var $navlinks = $('a.navlink'),
      $links = $('.links'),
      $profile = $('#profile'),
      $projects = $('#projects'),
      $resume = $('#resume'),
      $bio = $('#bio'),
      $contact = $('#contact');

  function switchTab() {
    console.log("i'm in!");
    $links.hide();
    var show = $(this).attr('href');
    $(show).show();
  }

  $navlinks.on('click', switchTab);

});