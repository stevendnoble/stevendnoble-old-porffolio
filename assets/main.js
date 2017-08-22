$(function() {
  var $pageLinks = $('a.page-link'),
      $links = $('.links'),
      $windowWidth = $(window).width(),
      $windowHeight = $(window).height(),
      imageId = 0,
      firstPageLoad = true,
      socialButtonWidth = Math.floor(($windowWidth - 114) / 7),
      buttonPanelWidth = (socialButtonWidth + 12) * 7,
      navHeight = socialButtonWidth + 16,
      navPadding = ($windowWidth - buttonPanelWidth - 16) / 2,
      maxHeight = $windowHeight - navHeight;

  function animateSidePanel() {
    $('.sub-panel').removeClass('p24').addClass('p8');
    $('.social-buttons-3, .social-buttons-4').css('display', 'inline');
    $('.button-link').css('width', String(socialButtonWidth) + 'px')
                     .css('height', String(socialButtonWidth) + 'px');
    $('.social-buttons').css('marginLeft', String(navPadding) + 'px');
    if (socialButtonWidth < 32) {
      $('.fa-2x').removeClass('fa-2x');
    }
    $('.name-and-picture').animate({ height: 0 }, 1000, animateNav);
  }

  function animateNav() {
    $('.name-and-picture').hide();
    $('.sub-panel').animate( {height: String(navHeight) + 'px' }, 1000, modifyFullHeight);
  }

  function modifyFullHeight() {
    $('.full-height').css('max-height', String(maxHeight) + 'px');
    $('.sub-panel').removeClass('full-height');
  }

  function switchTab() {
    event.preventDefault();
    var show = $(this).attr('href');
    $links.hide();
    $(show).show();
    if (firstPageLoad && $windowWidth <= 576) {
      firstPageLoad = false;
      animateSidePanel();
    }
  }

  function switchImage() {
    $('.img-' + imageId).hide();
    imageId = (imageId + 1) % 6;
    $('.img-' + imageId).show();
  }

  $pageLinks.on('click', switchTab);
  
  var intervalID = setInterval(switchImage, 3000);
});
