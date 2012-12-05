$(document).ready(function() {
  $('.modalClickLink').click(function(e) {
    console.log("Clicked");
    $(this).prev().show();
    e.preventDefault();
  });
});
