try {
  function getinfo() {
    $.getJSON(
      "https://www.saveoffline.com/process/?url=" +
        $("#url_input").val() +
        "&type=json",
      function(data) {
        if (data.hasOwnProperty("error")) {
          $("#validplz").show();
          $("#validplz").text(
            "Please specify a valid media url. The problem is: " +
              data.error.replace(/_/g, " ").replace(/-/g, " ") +
              "."
          );
          return;
        }
        $("#validplz").hide();
        $("#title").html(data.title);
        $("#thumbnail").attr(
          "src",
          data.thumbnail.replace("hqdefault", "mqdefault")
        );
        $("#urls").empty();

        for (var i = 0; i < data.urls.length; i++) {
          var $input = $(
            '<a href="' +
              data.urls[i].id +
              '">' +
              data.urls[i].label +
              "</a><br>"
          );
          $input.appendTo($("#urls"));
        }
        if (data.thumbnail !== "") {
          var $input = $(
            '<a href="' + data.thumbnail + '">thumbnail 4:3</a><br>"'
          );
          $input.appendTo($("#urls"));
          var $input = $(
            '<a href="' +
              data.thumbnail.replace("hqdefault", "mqdefault") +
              '">thumbnail 16:9</a><br>"'
          );
          $input.appendTo($("#urls"));
        }
      }
    );
  }
} catch (err) {
  console.log("Error: " + err);
  $("#validplz").show();
  $("#validplz").text("Please specify a valid media url.");
}
