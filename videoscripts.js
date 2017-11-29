'use strict';

/**
 * Vídjóspilari
 */
var playVideo = function playVideo() {
  var videoContainer, video, buttons;
  var playButton, pause, mute, unmute;
  var back, playToggle, mute, fullscreen, next;
  var videoData, videoID;

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
    element.setAttribute('class', 'video__vid');
    return element;
  }

  //Create element with class
  function classElement(type, klasi) {
    var element= document.createElement(type);
    element.setAttribute('class', klasi);
    return element;
  }

  function clear(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  /**
   * Bætir div með class overlay á video__wrapper
   */
  function videoOverlay(bool) {
    var pp = document.querySelector('.video__wrapper--playpause');
    var ol = document.querySelector('.video__wrapper--overlay');
    if (bool) {
      pp.style.display = '';
      ol.style.display = '';
    } else {
      pp.style.display = 'none';
      ol.style.display = 'none';
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

  // Föll þegar ýtt er á takka.
  function clickPlayToggle() {
    if (video.paused) {
      video.play();
      videoOverlay(false);
      playToggle.removeChild(playToggle.firstChild);
      playToggle.appendChild(pause);
    } else {
      video.pause();
      videoOverlay(true);
      playToggle.removeChild(playToggle.firstChild);
      playToggle.appendChild(playButton);
    }
  }

  function clickBack() {
    video.currentTime -= 3;
  }

  function clickNext() {
    video.currentTime += 3;
  }

  function clickMute() {
    if (!video.muted) {
      video.muted = true;
      mute.removeChild(mute.firstChild);
      mute.appendChild(unmute);
    } else {
      video.muted = false;
      mute.removeChild(mute.firstChild);
      mute.appendChild(mute);
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
  // ---------- Hér lýkur takkaföllum ------------

  /**
   * Skilar div með video buttons
   */
  function makeControls() {
    var element= classElement('div', 'video__buttons');
    var img = void 0;

    // Takki 1
    back = classElement('button', 'video__buttons--button');
    img = createImg('img/back.svg');
    back.appendChild(img);
    element.appendChild(back);

    // Takki 2
    playToggle = classElement('button', 'video__buttons--button');
    img = createImg('img/play.svg');
    playToggle.appendChild(img);
    element.appendChild(playToggle);

    // Takki 3
    mute = classElement('button', 'video__buttons--button');
    img = createImg('img/mute.svg');
    mute.appendChild(img);
    element.appendChild(mute);

    // Takki 4
    fullscreen = classElement('button', 'video__buttons--button');
    img = createImg('img/fullscreen.svg');
    fullscreen.appendChild(img);
    element.appendChild(fullscreen);

    // Takki 5
    next = classElement('button', 'video__buttons--button');
    img = createImg('img/next.svg');
    next.appendChild(img);
    element.appendChild(next);

    // Event listeners á takkana
    back.addEventListener('click', clickBack);
    playToggle.addEventListener('click', clickPlayToggle);
    mute.addEventListener('click', clickMute);
    fullscreen.addEventListener('click', clickFullscreen);
    next.addEventListener('click', clickNext);

    return element;
  }

  /**
   * Sýnir gögn sem finnast
   */
  function display() {
    clear(videoContainer);

    var videoAvailable = videoSearch(videoID, videoData.videos);

    // Ef vídjó finnst, sýndu það
    if (videoAvailable) {
      var title = classElement('h1', 'video__title');
      title.appendChild(document.createTextNode(videoAvailable.title));
      var vidwrapper = classElement('div', 'video__wrapper');
      video = createVideo(videoAvailable.video, videoAvailable.poster);
      vidwrapper.addEventListener('click', clickPlayToggle);
      vidwrapper.appendChild(video);
      vidwrapper.appendChild(classElement('div', 'video__wrapper--playpause'));
      vidwrapper.appendChild(classElement('div', 'video__wrapper--overlay'));
      buttons = makeControls();

      var link = classElement('a', 'video__link');
      link.setAttribute('href', 'index.html');
      link.appendChild(document.createTextNode('Til baka'));

      // Bæta vídjói og buttons í video div
      videoContainer.appendChild(title);
      videoContainer.appendChild(vidwrapper);
      videoContainer.appendChild(buttons);
      videoContainer.appendChild(link);
    } else {
      console.log('Engin myndbönd');
    }
  }

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

    //Image for buttons
    mute = createImg('img/mute.svg');
    unmute = createImg('img/unmute.svg');
    playButton = createImg('img/play.svg');
    pause = createImg('img/pause.svg');

    load();
  }

  return {
    init: init
  };
}();

document.addEventListener('DOMContentLoaded', function () {
  var video = document.querySelector('.video');
  playVideo.init(video);
});
