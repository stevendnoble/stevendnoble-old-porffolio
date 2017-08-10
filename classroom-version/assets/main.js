$(function () {

  var interval = 10;

  var subMessageText = 'Today, we\'re going to learn about my favorite thing... ME! Let\'s start with the agenda items. What would you like to learn about first?',
      hiSubMessage = new Message(subMessageText, '.hi-sub-message', null),
      hiMessage = new Message('Hi! I\'m Mr. Noble.', '.hi-message', hiSubMessage);

  var skillsSection = [
    {target: '.skills-1-', title: 'Languages', bullets: ['Ruby', 'JavaScript', 'HTML', 'CSS/SCSS']},
    {target: '.skills-2-', title: 'Frameworks', bullets: ['Ruby on Rails', 'Node/Express', 'Angular', 'Bootstrap']},
    {target: '.skills-3-', title: 'DB/Storage', bullets: ['Postgres', 'MongoDB', 'Redis']},
    {target: '.skills-4-', title: 'Other', bullets: ['Github', 'Heroku', 'jQuery', 'Rspec']},
  ];
  var skills = buildMessages(skillsSection);

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
  var experience = buildMessages(experienceSection);

  function Message(text, target, nextMessage) {
    this.text = text;
    this.target = target;
    this.nextMessage = nextMessage;
  }

  function buildMessages(messageObjects) {
    var result = [],
        nextMessage;
    for(var i = messageObjects.length - 1; i >= 0; i--) {
      var messageObject = messageObjects[i];
      for(var j = messageObject.bullets.length - 1; j >= 0; j--) {
        nextMessage = result.length === 0 ? null : result[result.length - 1];
        result.push(new Message(messageObject.bullets[j], (messageObject.target + j), nextMessage));
      }
      result.push(new Message(messageObject.title, (messageObject.target + 'title'), result[result.length - 1]));
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
      setClickHandlers();
    }
  }

  function clearBoard(callback) {
    $('.clear').fadeOut(1500);
    $('.empty').empty();
  }

  function unbindClickHandlers() {
    $('.skills').off('click');
    $('.experience').off('click');
  }

  function clickHandler(event) {
    var className = event.currentTarget.className;
    clearBoard();
    unbindClickHandlers();
    setTimeout(function() {
      $('.' + className).show();
      showText(event.data.message, 0);
    }, 2000);
  }

  function setClickHandlers() {
    $('.skills').on('click', { message: skills[skills.length-1] }, clickHandler);
    $('.experience').on('click', { message: experience[experience.length-1] }, clickHandler);
  }

  showText(hiMessage, 0);
}); 
