$(function () {
  var $showText = $('.show-text');
  var interval = 20;

  var subMessageText = 'Today, we\'re going to learn about my favorite thing... ME! Let\'s start with the agenda items. What would you like to learn about first?',
      hiSubMessage = new Message(subMessageText, '.hi-sub-message', null),
      hiMessage = new Message('Hi! I\'m Mr. Noble.', '.hi-message', hiSubMessage),
      messages = { hiMessage: hiMessage, hiSubMessage: hiSubMessage };

  var skillsSection = [
    {target: '.skills-1-', title: 'Languages', bullets: ['Ruby', 'JavaScript', 'HTML', 'CSS/SCSS']},
    {target: '.skills-2-', title: 'Frameworks', bullets: ['Ruby on Rails', 'Node/Express', 'Angular', 'Bootstrap']},
    {target: '.skills-3-', title: 'DB/Storage', bullets: ['Postgres', 'MongoDB', 'Redis']},
    {target: '.skills-4-', title: 'Other', bullets: ['Github', 'Heroku', 'jQuery', 'Rspec']},
  ];

  var experienceSection = [{
    target: '.experience-1-',
    title: 'Software Engineer, Rocksbox',
    bullets: [
      'Mar 2016 - Present',
      'Support existing software and develop features in a fast-paced jewelry subscription company.',
      'Contributions include:',
      '* Overhaul of wish list experience to increase purchase conversion',
      '* Redesign of stylist curation tool to include data-driven recommendations',
      '* Marketing campaigns to increase subscription conversion on incoming traffic',
      '* Warehouse optimizations to improve inventory management'
  ]}, {
    target: '.experience-2-',
    title: 'Outcomes Instructor, General Assembly',
    bullets: [
      'Jan 2017 - Present (part-time)',
      '* Interview preparation',
      '* Algorithms/data structures',
      '* Whiteboard practice'
  ]}, {
    target: '.experience-3-',
    title: 'HS Math/Special Education Teacher',
    bullets: [
      'Feb 2005 - Jun 2015',
      '* Taught various levels of several subjects',
      '* Adapted curriculum to students with varied skill levels',
      '* Coached an Academic Decathlon team, which led to organizing regional and state competitions for teams all over Massachusetts'
  ]}];

  var educationSection = [{
    target: '.education-1-',
    title: 'Grand Canyon University',
    bullets: [
      'Phoenix, AZ',
      'M.Ed. Special Education',
      '4.0 GPA'
  ]}, {
    target: '.education-2-',
    title: 'New York University',
    bullets: [
      'New York City, NY',
      'M.S. Mathematics',
      '3.6 GPA'
  ]}, {
    target: '.education-3-',
    title: 'Framingham State University',
    bullets: [
      'Framingham, MA, 2013-2015',
      'B.S. Mathematics, Minor: Economics',
      '3.6 GPA',
      'Frank Castagna Award for Excellence in Mathematics'
  ]}];

  function Message(text, target, nextMessage) {
    this.text = text;
    this.target = target;
    this.nextMessage = nextMessage;
  }

  function buildMessages(arr) {
    var result,
        nextMessage = null;
    while(arr.length) {
      var section = arr.pop();
      for(var j = section.bullets.length - 1; j >= 0; j--) {
        result = new Message(
          section.bullets[j],
          section.target + j,
          nextMessage
        );
        nextMessage = result;
      }
      result = new Message(
        section.title,
        section.target + 'title',
        nextMessage
      );
      nextMessage = result;
    }
    return result;
  }

  function showText(message, index) {
    if (index < message.text.length) {
      $(message.target).append(message.text[index++]);
      setTimeout(function () { showText(message, index); }, interval);
    } else if (message.nextMessage) {
      showText(message.nextMessage, 0);
    } else {
      bindClickHandlers();
    }
  }

  function clearBoard() {
    $('.clear').fadeOut(1500);
    setTimeout(function() {
      $('.empty').empty();
    }, 1500);
  }

  function handleClick(event) {
    var section = event.currentTarget.dataset.section,
        className = '.' + section;

    unbindClickHandlers();
    clearBoard();
    setTimeout(function() {
      $(className).show();
      showText(messages[section], 0);
    }, 2000);
  }

  function unbindClickHandlers() {
    $showText.off('click');
  }

  function bindClickHandlers() {
    $showText.on('click', handleClick);
  }

  messages.skills = buildMessages(skillsSection);
  messages.experience = buildMessages(experienceSection);
  messages.education = buildMessages(educationSection);

  showText(hiMessage, 0);
}); 
