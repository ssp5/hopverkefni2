'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// class VideoListClass {
var startup = function videoInterface() {

  var videoList;

  function load() {
    var r = new XMLHttpRequest();
    r.open('GET', 'videos.json', true);
    r.onload = function() {
      var videoData = JSON.parse(r.response);
      if (r.status >= 200 && r.status < 400) {
        showVideoList(videoData);
      } else {
        console.log('Engin myndbönd');
      }
    };
    r.onerror = function() {
      console.log('villa i tengingu');
    };
    r.send();
  }

  function init() {
    videoList = document.querySelector('.videoList');
    load();
  }

  function showVideoList(data) {
    // var videoList = document.querySelector('.videoList');
    //Create container for every category and insert title
    for(var i=0; i<data.categories.length; i++) {
      var categoryTitle = createElement('h2', 'heading heading__two', data.categories[i].title, videoList)
      var cardList = createElement('div', 'cardlist', null, categoryTitle);
      var cardlistRow = createElement('div', 'cardlist__row', null, cardList);
      //Create container for every video inside category and insert elements
      for(var k=0; k<data.categories[i].videos.length; k++) {
        var videoId = data.categories[i].videos[k];
        var video = data.videos[videoId-1];
        var videoTitle = video.title;
        var videoDate = videoId.created;
        var videoDuration = videoId.duration;
        var videoPoster = videoId.poster;
        var videoUrl = videoId.video;
        var videoDiv = document.createElement('div');
        createCard(videoId, video, cardlistRow);
      }
    }
  }

  function createCard(videoId, video, parent) {
    var cardlistCol = createElement('div', 'cardlist__col col-6 col-sm-12', null, parent);
    var card = createElement('div', 'card', null, cardlistCol);
    var cardImage = createElement('div', 'card_image', null, card);
    var videoLink = createElement('a', 'videoLink', null, cardImage);
    videoLink.href = 'video.html?id=' + videoId;
    var videoPoster = createElement('img', 'videoPoster', null, videoLink);
    videoPoster.src = video.poster;
    var thumbnail = createElement('div', 'thumbnail', minutes(video.duration), videoPoster);
    var cardContent = createElement('div', 'card_content', null, card)
    var videoTitle = createElement('h3', 'heading heading__three', video.title, cardContent);
    var videoDate = createElement('h3', 'text', findDate(video.created), cardContent);
  }

  function createElement(type, className, text, parent) {
    var element = document.createElement(type);
    element.className = className;
    if (text) {
      var textNode = document.createTextNode(text);
      element.appendChild(textNode);
    }
    parent.appendChild(element);
    return element;
  }

  function findDate(creation) {
    var dateCreated = new Date(creation);
    var currentDate = Date.now();
    var time = currentDate - dateCreated;
    console.log(time);

    if(time<6000) return 'Fyrir ' + Math.floor(time/1000) + ' sekúndum'; //ef minna en mínúta
    else if (time<6000*60) { //ef minna en klst
      time = Math.floor(time/6000);
      if (time!=1) return 'Fyrir ' + time + ' mínútum';
      else return 'Fyrir einni mínútu';
    }
    else if (time<6000*60*24) {
      time = Math.floor(time/(6000*60));
      if (time!=1) return 'Fyrir ' + time + ' klukkustundum';
      else return 'Fyrir einni klukkustund';
    }
    else if (time<6000*60*24*7) {
      time = Math.floor(time/(6000*60*24));
      if (time!=1) return 'Fyrir ' + time + ' dögum';
      else return 'Fyrir einum degi';
    }
    else if (time<6000*60*24*7*30) {
      time = Math.floor(time/(6000*60*24*7));
      if (time!=1) return 'Fyrir ' + time + ' vikum';
      else return 'Fyrir einni viku';
    }
    else if (time<6000*60*24*7*30*365) {
      time = Math.floor(time/(6000*60*24*7*30));
      if (time!=1) return 'Fyrir ' + time + ' mánuðum';
      else return 'Fyrir einum mánuði';
    }
    else {
      time = Math.floor(time/(6000*60*24*7*10*365));
      if (time!=1) return 'Fyrir ' + time + ' árum';
      else return 'Fyrir einu ári';
    }

  }

  //Converts seconds into minutes
  function minutes(seconds) {
    var minutes = Math.floor(seconds/60);
    var seconds = seconds - minutes*60;
    if (minutes<10) minutes = "0" + minutes;
    if (seconds<10) seconds = "0" + seconds;
    return (minutes + ":" + seconds);
  }

  return {
    init: init
  };
}();


// Störtum þessu öllu
// document.addEventListener('DOMContentLoaded', () => {
//   const videoListClass = new VideoListClass();
//   videoListClass.init();
// });

document.addEventListener('DOMContentLoaded', function () {
  startup.init();
});
