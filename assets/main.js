$(function() {
  var $pageLinks = $('a.page-link'),
      $links = $('.links');

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

  $pageLinks.on('click', switchTab);
  
  var intervalID = setInterval(switchImage, 3000);

});