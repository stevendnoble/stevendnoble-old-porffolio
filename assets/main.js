$(function() {
  var $pageLinks = $('.page-link'),
      $links = $('.links'),
      $subPanel = $('.sub-panel'),
      $socialButtons3 = $('.social-buttons-3'),
      $socialButtons4 = $('.social-buttons-4'),
      $socialButtons3And4 = $('.social-buttons-3, .social-buttons-4'),
      $socialButtons7 = $('.social-buttons'),
      $buttonLinks = $('.button-link'),
      $fa2x = $('.fa-2x'),
      $nameAndPicture = $('.name-and-picture'),
      $fullHeight = $('.full-height');

  var imageId = 0,
      firstPageLoad = true,
      $windowWidth = $(window).width(),
      $windowHeight = $(window).height(),
      socialButtonWidth,
      fullButtonPanelWidth,
      navHeight,
      navPadding,
      maxHeight;

  function toPx(integer) {
    return String(integer) + 'px';
  }

  // this is used when the side panel is animated on mobile
  function getSocialButtonSizes() {
    socialButtonWidth = Math.floor(($windowWidth - 114) / 7);
    fullButtonPanelWidth = (socialButtonWidth + 12) * 7;
    navHeight = socialButtonWidth + 16;
    navPadding = ($windowWidth - fullButtonPanelWidth - 16) / 2;
    maxHeight = $windowHeight - navHeight;
  }
  getSocialButtonSizes();

  // need to get size for buttons on original screen size

  // this function will be for resizing the screen.
  function resizeButtons() {
    $windowWidth = $(window).width();
    $windowHeight = $(window).height();
  }

  function animateSidePanel() {
    $subPanel.removeClass('p24').addClass('p8');
    getSocialButtonSizes();
    $socialButtons3And4.addClass('inline');
    $buttonLinks.css({ width: toPx(socialButtonWidth), height: toPx(socialButtonWidth) });
    $socialButtons7.css({ marginLeft: toPx(navPadding) });
    if (socialButtonWidth < 32) {
      $fa2x.removeClass('fa-2x');
    }
    $nameAndPicture.animate({ height: 0 }, 1000, animateNav);
  }

  function animateNav() {
    $nameAndPicture.hide();
    $subPanel.animate({ height: toPx(navHeight) }, 1000, modifyFullHeight);
  }

  function modifyFullHeight() {
    $fullHeight.css({ maxHeight: toPx(maxHeight) });
    $subPanel.removeClass('full-height');
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

  // use z-index with modulo
  function switchImage() {
    $('.img-' + imageId).hide();
    imageId = (imageId + 1) % 6;
    $('.img-' + imageId).show();
  }

  $pageLinks.on('click', switchTab);
  
  var intervalID = setInterval(switchImage, 3000);
});
