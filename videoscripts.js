'use strict';

var playVideo = function playVideo() {
  var backButton, playToggle, mute, fullscreen, next;
  var videoData, videoID;
  var videoContainer, video, buttons;
  var playButton, pause, muteButton, unmuteButton;

  function load() {
    var r = new XMLHttpRequest();
    r.open('GET', 'videos.json', true);
    r.onload = function onload() {
      videoData = JSON.parse(r.response);
      if (r.status >= 200 && r.status < 400) {
        display();
      } else {
        console.log('Engin myndbönd');
      }
    };

    r.onerror = function onerror() {
      console.log('villa i tengingu');
    };
    r.send();
  }

  function init(video) {
    videoContainer = video;
    videoID = parseInt(window.location.search.substr(4), 10);

    load();
  }

  //Create image element
  function createImg(url) {
    var element = document.createElement('img');
    element.setAttribute('src', url);
    return element;
  }

  //Create poster element
  function createVideo(url, poster) {
    var element = document.createElement('video');
    element.setAttribute('src', url);
    element.setAttribute('poster', poster);
    element.setAttribute('class', 'video-vid');
    return element;
  }

  //Create element with class
  function classElement(type, klasi) {
    var element= document.createElement(type);
    element.setAttribute('class', klasi);
    return element;
  }

  function clickPlayToggle() {
    if (video.paused) {
      video.play();
      overVid(false);
      playToggle.removeChild(playToggle.firstChild);
      playToggle.appendChild(pause);
    } else {
      video.pause();
      overVid(true);
      playToggle.removeChild(playToggle.firstChild);
      playToggle.appendChild(playButton);
    }
  }

  function goBack() {
    video.currentTime -= 2;
  }

  function clickNext() {
    video.currentTime += 2;
  }

  function clickMute() {
    if (!video.muted) {
      video.muted = true;
      mute.removeChild(mute.firstChild);
      mute.appendChild(unmuteButton);
    } else {
      video.muted = false;
      mute.removeChild(mute.firstChild);
      mute.appendChild(muteButton);
    }
  }

  function clickFullscreen() {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  }

  function clear(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }


  function overVid(value) {
    var overl = document.querySelector('.over');
    var toggle = document.querySelector('.playToggle');
    if (value) {
      overl.style.display = '';
      toggle.style.display = '';
    } else {
      overl.style.display = 'none';
      toggle.style.display = 'none';
    }
  }

  //Searches for the right video according to the given video ID
  function videoSearch(videoID, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id === videoID) {
        return array[i];
      }
    }
    return null;
  }

  function display() {

    clear(videoContainer);
    var videoAvailable = videoSearch(videoID, videoData.videos);

    if (videoAvailable) {
      var title = classElement('h2', 'heading heading__two');
      title.appendChild(document.createTextNode(videoAvailable.title));
      videoContainer.appendChild(title);

      var around = classElement('div', 'around');
      video = createVideo(videoAvailable.video, videoAvailable.poster);
      around.addEventListener('click', clickPlayToggle);
      around.appendChild(video);
      around.appendChild(classElement('div', 'playToggle'));
      around.appendChild(classElement('div', 'over'));
      videoContainer.appendChild(around);

      buttons = createButtons();
      videoContainer.appendChild(buttons);

      var url = classElement('a', 'video-url');
      url.setAttribute('href', 'index.html');
      url.appendChild(document.createTextNode('Til baka'));
      videoContainer.appendChild(url);

    } else {
      console.log('Engin myndbönd');
    }
  }

  function createButtons() {

    //Image for buttons
    muteButton = createImg('img/mute.svg');
    unmuteButton = createImg('img/unmute.svg');
    playButton = createImg('img/play.svg');
    pause = createImg('img/pause.svg');

    var element = classElement('div', 'buttons');
    var img;

    //Back button
    backButton = classElement('button', 'button');
    img = createImg('img/back.svg');
    backButton.appendChild(img);
    element.appendChild(backButton);
    backButton.addEventListener('click', goBack);

    //Play/pause toggle
    playToggle = classElement('button', 'button');
    img = createImg('img/play.svg');
    playToggle.appendChild(img);
    element.appendChild(playToggle);
    playToggle.addEventListener('click', clickPlayToggle);

    // Mute button
    mute = classElement('button', 'button');
    img = createImg('img/mute.svg');
    mute.appendChild(img);
    element.appendChild(mute);
    mute.addEventListener('click', clickMute);

    // Fullscreen button
    fullscreen = classElement('button', 'button');
    img = createImg('img/fullscreen.svg');
    fullscreen.appendChild(img);
    element.appendChild(fullscreen);
    fullscreen.addEventListener('click', clickFullscreen);

    // Next button
    next = classElement('button', 'button');
    img = createImg('img/next.svg');
    next.appendChild(img);
    element.appendChild(next);
    next.addEventListener('click', clickNext);

    return element;
  }

  return {
    init: init
  };
}();

document.addEventListener('DOMContentLoaded', function () {
  var video = document.querySelector('.video');
  playVideo.init(video);
});
