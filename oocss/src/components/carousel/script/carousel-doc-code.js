    
$(document).ready(function() {

    // Basic example
    $("#carouselBtn1").click(function() {
        oocss.carousel.select("#basicCarousel", 0);
    });
    $("#carouselBtn2").click(function() {
        oocss.carousel.select("#basicCarousel", 1);
    });
    $("#carouselBtn3").click(function() {
        oocss.carousel.select("#basicCarousel", 2);
    });
    
    $("#basicCarousel").change(function(event, index) {
        $(".carouselBtn").css("background-color","white");
        $("#carouselBtn" + (index+1)).css("background-color","lightGray");
    });
    
    // Advanced Example
    $(".arrowLeft").click(function() {
        oocss.carousel.prev($(this).parent(), 'slideInRight', 'slideOutLeft');
    });
    $(".arrowRight").click(function() {
        oocss.carousel.next($(this).parent(), 'slideInLeft', 'slideOutRight');
    });
    $(".arrowAbove").click(function() {
        oocss.carousel.prev($(this).parent(), 'slideInUp', 'slideOutUp');
    });
    $(".arrowBelow").click(function() {
        oocss.carousel.next($(this).parent(), 'slideInDown', 'slideOutDown');
    });

});