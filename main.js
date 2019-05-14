$(document).ready(function() {
  var pageURL = $(location).attr("href");
  var timestamp;
  var pageURL;
  var date = new Date();
  var data;
  var ajax;

  setInterval(() => {
    if (ajax) {
      ajax.abort();
    }
    pageURL = $(location).attr("href");
    timestamp = $.now();

    data = JSON.stringify({ pageURL: pageURL, timestamp: timestamp });
    clientServer(data);
  }, 60000);

  window.onbeforeunload = function() {
    if (ajax) {
      ajax.abort();
    }
    pageURL = $(location).attr("href");
    timestamp = $.now();
    var seconds = date.getSeconds();
    data = JSON.stringify({ pageURL: pageURL, timestamp: timestamp });
    clientServer(data);
  };

  function clientServer(data) {
    console.log(data);
    ajax = $.ajax({
      type: "POST",
      url: "http://127.0.0.1:4000/server",
      data: data,
      cache: false,
      error: function(e) {
        console.log(e);
      },
      dataType: "json",
      contentType: "application/json"
    });
  }
});
