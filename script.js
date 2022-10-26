var myKey = "AIzaSyB9-8mGjHltKseE44030BmzF_o5kWbRhFI";
var newUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=petak&key=${myKey}`;
var request = new XMLHttpRequest();
var items;
var videos = document.querySelector(".videos");
var iframe = document.querySelector("iframe");
var search = document.querySelector(".search");
var searchInput = document.querySelector(".search-input");

window.addEventListener("load", function () {
  request.open(
    "GET",
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&key=${myKey}`
  );

  request.send();

  request.onload = function () {
    items = JSON.parse(request.responseText).items;

    console.log(JSON.parse(request.responseText));
    for (var i = 0; i < items.length; i++) {
      var video = document.createElement("div");
      video.classList.add("video");
      var thumbnail = document.createElement("img");
      thumbnail.classList.add("thumbnail");
      thumbnail.setAttribute("src", items[i].snippet.thumbnails.default.url);

      var title = document.createElement("div");
      title.classList.add("title");
      title.textContent = items[i].snippet.title;
      video.appendChild(thumbnail);
      video.appendChild(title);
      videos.appendChild(video);

      video.addEventListener("click", changeSrc(i));
    }
  };
});

function changeSrc(i) {
  return function () {
    iframe.classList.remove("hidden");
    iframe.setAttribute(
      "src",
      `https://www.youtube.com/embed/${items[i].id.videoId}`
    );
  };
}

search.addEventListener("click", function () {
  iframe.setAttribute("src", "");
  var videosAll = document.querySelectorAll(".video");
  var titles = document.querySelectorAll(".title");
  var thumbnails = document.querySelectorAll(".thumbnail");
  console.log(videosAll);
  request.open(
    "GET",
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${searchInput.value}&key=${myKey}`
  );
  searchInput.value = "";

  request.send();

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      console.log(request.responseText);
      items = JSON.parse(request.responseText).items;

      if (iframe.className !== "hidden") {
        iframe.classList.add("hidden");
      }

      for (var i = 0; i < items.length; i++) {
        titles[i].textContent = items[i].snippet.title;
        thumbnails[i].setAttribute(
          "src",
          items[i].snippet.thumbnails.default.url
        );
      }
    }
  };
});