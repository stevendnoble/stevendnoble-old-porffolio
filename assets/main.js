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
      $fullHeight = $('.full-height'),
      $img0 = $('.img-0'),
      $img1 = $('.img-1'),
      $img2 = $('.img-2'),
      $img3 = $('.img-3'),
      $img4 = $('.img-4'),
      $img5 = $('.img-5'),
      $projectImages = $('.project-images'),
      $images = [$img0, $img1, $img2, $img3, $img4, $img5];

  var imageIndex = 0,
      firstPageLoad = true,
      $windowWidth = $(window).width(),
      $windowHeight = $(window).height(),
      socialButtonWidth,
      fullButtonPanelWidth,
      navHeight,
      navPadding,
      maxHeight;

  // helper functions
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

  // animate the side panel/navbar on mobile
  function animateSidePanel() {
    $subPanel.removeClass('p24').addClass('p8')
             .children('.center').removeClass('center');
    getSocialButtonSizes();
    $socialButtons3And4.addClass('inline');
    $buttonLinks.css({ width: toPx(socialButtonWidth), height: toPx(socialButtonWidth) });
    // $socialButtons7.css({ marginLeft: toPx(navPadding) });
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

  // switch tabs on side panel/navbar buttons
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
  $pageLinks.on('click', switchTab);

  // rotate images on highlighted projects
  function switchImage() {
    imageIndex = (imageIndex + 1) % 6;
    $projectImages.hide();
    $images[imageIndex].show();
  }
  var intervalID = setInterval(switchImage, 3000);
});
