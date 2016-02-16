$(function() {
  var $navlinks = $('a.navlink'),
      $pagelinks = $('a.pagelink'),
      $links = $('.links'),
      $profile = $('#profile'),
      $projects = $('#projects'),
      $resume = $('#resume'),
      $bio = $('#bio'),
      $contact = $('#contact');

  var imageId = 0;

  function switchTab() {
    event.preventDefault();
    $links.hide();
    var show = $(this).attr('href');
    $(show).show();
  }

  function switchImage() {
    $('.img-' + imageId).hide();
    imageId = (imageId + 1) % 6;
    $('.img-' + imageId).show();
  }

  $navlinks.on('click', switchTab);
  $pagelinks.on('click', switchTab);
  
  var intervalID = setInterval(switchImage, 3000);

});