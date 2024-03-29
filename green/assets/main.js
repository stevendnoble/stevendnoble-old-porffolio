$(function() {
  var $pageLinks = $('.page-link'),
      $links = $('.links'),
      $subPanel = $('.sub-panel'),
      $fadePanel = $('.fade-panel'),
      $socialButtons = $('.social-buttons'),
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
      $fadeOutBg = $('.fade-out-bg'),
      $images = [$img0, $img1, $img2, $img3, $img4, $img5];

  var imageIndex = 0,
      firstPageLoad = true,
      $windowWidth ,
      $windowHeight,
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
    if (!firstPageLoad) {
      window.location.reload(false);
    }
    $windowWidth = $(window).width();
    $windowHeight = $(window).height();
    socialButtonWidth = Math.floor(($windowWidth - 100) / 7);
    fullButtonPanelWidth = (socialButtonWidth + 12) * 7;
    navHeight = socialButtonWidth + 16;
    navPadding = ($windowWidth - fullButtonPanelWidth - 16) / 2;
    maxHeight = $windowHeight - navHeight;
  }
  $(window).on('load resize', getSocialButtonSizes);

  // animate the side panel/navbar on mobile
  function fadeOutButtons() {
    $fadePanel.fadeOut(1000, animateSidePanel);
    $nameAndPicture.animate({ height: 0 }, 2000);
  }

  function animateSidePanel() {
    $buttonLinks.css({ width: toPx(socialButtonWidth), height: toPx(socialButtonWidth) });
    $socialButtons.css({ maxWidth: $windowWidth });
    $fadeOutBg.removeClass('pb40');
    if (socialButtonWidth < 32) {
      $fa2x.removeClass('fa-2x');
    }
    $nameAndPicture.hide();
    $subPanel.animate({ height: toPx(navHeight) }, 2000, fadeInButtons);
  }

  function fadeInButtons() {
    $fullHeight.css({ maxHeight: toPx(maxHeight) });
    $subPanel.removeClass('full-height');
    $fadePanel.fadeIn(2000);
  }

  // switch tabs on side panel/navbar buttons
  function switchTab() {
    event.preventDefault();
    var show = $(this).attr('href');
    $links.hide();
    $(show).show();
    if (firstPageLoad && $windowWidth === $subPanel.width()) {
      firstPageLoad = false;
      fadeOutButtons();
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
