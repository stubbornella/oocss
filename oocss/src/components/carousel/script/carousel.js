/* ===============================================================================
 * carousel\script
 * =============================================================================== */

/* ==========================================================================
 * @File         carousel.js.coffee
 * @desc         Component Class.
 * @name         Carousel
 * @author       pflannery
 * @tested       Chrome, Firefox, IE7-11
 * @requires     jquery
 * ========================================================================== */


(function() {
  var Carousel;

  if (!window.oocss) {
    window.oocss = {};
  }

  $(document).ready(function() {
    oocss.carousel.setupAnim();
    oocss.carousel.startAll();
  });

  window.oocss.carousel = new (Carousel = (function() {
    var _renderSlide;

    function Carousel() {}

    Carousel.prototype.defaultInterval = 4000;

    Carousel.prototype.defaultTransitionIn = "fadeIn";

    Carousel.prototype.defaultTransitionOut = "fadeOut";

    Carousel.prototype.defaultTransitionDuration = 1000;

    Carousel.prototype.startAll = function() {
      var $carousel, $carousels, index, _i, _ref, _results;
      $carousels = $(".carousel");
      _results = [];
      for (index = _i = 0, _ref = $carousels.length; 0 <= _ref ? _i < _ref : _i > _ref; index = 0 <= _ref ? ++_i : --_i) {
        _results.push($carousel = this.start($carousels[index]));
      }
      return _results;
    };

    Carousel.prototype.start = function(carouselSelector) {
      var $carousel, interval;
      $carousel = $(carouselSelector);
      interval = $carousel.attr("data-interval") || Carousel.prototype.defaultInterval;
      $carousel.get(0).timerHandle = window.setInterval(function() {
        var $currentSlide, $slides, newSlideIndex, selectedSlideIndex;
        $slides = $(".carouselSlide", $carousel);
        selectedSlideIndex = parseInt($carousel.attr("data-selected")) || 0;
        $currentSlide = $($slides[selectedSlideIndex]);
        newSlideIndex = $currentSlide.attr("data-next-slide") || (selectedSlideIndex + 1) % $slides.length;
        return _renderSlide($carousel, $slides, selectedSlideIndex, newSlideIndex);
      }, interval);
    };

    Carousel.prototype.stop = function(carouselSelector) {
      var $carousel;
      $carousel = $(carouselSelector);
      clearTimeout($carousel.get(0).timerHandle);
    };

    Carousel.prototype.isAnimating = function(carouselSelector) {
      return $(carouselSelector).attr("data-animating") === "true";
    };

    Carousel.prototype.select = function(carouselSelector, newSlideIndex, transitionIn, transitionOut) {
      var $carousel, $slides, selectedSlideIndex;
      $carousel = $(carouselSelector);
      if (this.isAnimating($carousel)) {
        return;
      }
      this.stop(carouselSelector);
      selectedSlideIndex = parseInt($carousel.attr("data-selected")) || 0;
      $slides = $(".carouselSlide", $carousel);
      _renderSlide($carousel, $slides, selectedSlideIndex, newSlideIndex, transitionIn, transitionOut);
      this.start(carouselSelector);
    };

    Carousel.prototype.next = function(carouselSelector, transitionIn, transitionOut) {
      var $carousel, $slides, newSlideIndex, selectedSlideIndex;
      $carousel = $(carouselSelector);
      if (this.isAnimating($carousel)) {
        return;
      }
      this.stop(carouselSelector);
      selectedSlideIndex = parseInt($carousel.attr("data-selected")) || 0;
      $slides = $(".carouselSlide", $carousel);
      newSlideIndex = (selectedSlideIndex + 1) % $slides.length;
      _renderSlide($carousel, $slides, selectedSlideIndex, newSlideIndex, transitionIn, transitionOut);
      this.start(carouselSelector);
    };

    Carousel.prototype.prev = function(carouselSelector, transitionIn, transitionOut) {
      var $carousel, $slides, newSlideIndex, selectedSlideIndex;
      $carousel = $(carouselSelector);
      if (this.isAnimating($carousel)) {
        return;
      }
      this.stop($carousel);
      selectedSlideIndex = parseInt($carousel.attr("data-selected")) || 0;
      $slides = $(".carouselSlide", $carousel);
      if (selectedSlideIndex !== 0) {
        newSlideIndex = (selectedSlideIndex - 1) % $slides.length;
      } else {
        newSlideIndex = $slides.length - 1;
      }
      _renderSlide($carousel, $slides, selectedSlideIndex, newSlideIndex, transitionIn, transitionOut);
      this.start(carouselSelector);
    };

    Carousel.prototype.setupAnim = function() {
      return jQuery.fn.extend({
        slideOutLeft: function(opts) {
          var me, next;
          me = this;
          next = opts.complete;
          opts.complete = function() {
            me.css("left", 0);
            return next.call(me);
          };
          return me.animate({
            left: -me.outerWidth()
          }, opts);
        },
        slideOutRight: function(opts) {
          var me, next;
          me = this;
          next = opts.complete;
          opts.complete = function() {
            me.css("left", 0);
            return next.call(me);
          };
          me.css("left", 0);
          return me.animate({
            left: me.outerWidth()
          }, opts);
        },
        slideOutDown: function(opts) {
          var me, next;
          me = this;
          next = opts.complete;
          opts.complete = function() {
            me.css("top", 0);
            return next.call(me);
          };
          me.css("top", 0);
          return me.animate({
            top: me.outerHeight()
          }, opts);
        },
        slideOutUp: function(opts) {
          var me, next;
          me = this;
          next = opts.complete;
          opts.complete = function() {
            me.css("top", 0);
            return next.call(me);
          };
          me.css("top", 0);
          return me.animate({
            top: -me.outerHeight()
          }, opts);
        },
        slideInLeft: function(opts) {
          var me, next;
          me = this;
          next = opts.complete;
          opts.complete = function() {
            me.css("left", 0);
            return next.call(me);
          };
          me.css("left", -me.outerWidth());
          return me.animate({
            left: 0
          }, opts);
        },
        slideInRight: function(opts) {
          var me, next;
          me = this;
          next = opts.complete;
          opts.complete = function() {
            me.css("left", 0);
            return next.call(me);
          };
          me.css("left", me.outerWidth());
          return me.animate({
            left: 0
          }, opts);
        },
        slideInDown: function(opts) {
          var me, next;
          me = this;
          next = opts.complete;
          opts.complete = function() {
            me.css("top", 0);
            return next.call(me);
          };
          me.css("top", -me.outerHeight());
          return me.animate({
            top: 0
          }, opts);
        },
        slideInUp: function(opts) {
          var me, next;
          me = this;
          next = opts.complete;
          opts.complete = function() {
            me.css("top", 0);
            return next.call(me);
          };
          me.css("top", me.outerHeight());
          return me.animate({
            top: 0
          }, opts);
        }
      });
    };

    _renderSlide = function($carousel, $slides, currentSlideIndex, newSlideIndex, transitionIn, transitionOut) {
      var $currentSlide, $nextSlide, transitionDurationIn, transitionDurationOut;
      $currentSlide = $($slides[currentSlideIndex]);
      $nextSlide = $($slides[newSlideIndex]);
      transitionIn = transitionIn || $nextSlide.attr("data-transition-in") || $carousel.attr("data-transition-in") || Carousel.prototype.defaultTransitionIn;
      transitionOut = transitionOut || $currentSlide.attr("data-transition-out") || $carousel.attr("data-transition-out") || Carousel.prototype.defaultTransitionOut;
      transitionDurationIn = $currentSlide.attr("data-transition-duration-in") || $currentSlide.attr("data-transition-duration") || $carousel.attr("data-transition-duration") || Carousel.prototype.defaultTransitionDuration;
      transitionDurationOut = $nextSlide.attr("data-transition-duration-out") || $nextSlide.attr("data-transition-duration") || $carousel.attr("data-transition-duration") || Carousel.prototype.defaultTransitionDuration;
      if (transitionOut && transitionOut !== "none") {
        $carousel.attr("data-animating", "true");
        $currentSlide[transitionOut]({
          duration: transitionDurationOut,
          queue: true,
          complete: function() {
            $(this).removeClass("carouselSlideActive");
            $(this).css("display", "");
            if (transitionIn && transitionIn !== "none") {
              if (transitionIn === "slideInRight" || transitionIn === "slideInLeft" || transitionIn === "slideInDown" || transitionIn === "slideInUp") {
                $nextSlide.addClass("carouselSlideActive");
              }
              $nextSlide[transitionIn]({
                duration: transitionDurationIn,
                queue: true,
                complete: function() {
                  if (transitionIn === "fadeIn") {
                    $nextSlide.addClass("carouselSlideActive");
                  }
                  $carousel.attr("data-animating", "false");
                }
              });
            } else {
              $carousel.attr("data-animating", "false");
            }
          }
        });
      } else {
        $(this).removeClass("carouselSlideActive");
        $slides.css("display", "");
        if (transitionIn && transitionIn !== "none") {
          if (transitionIn === "slideInRight" || transitionIn === "slideInLeft" || transitionIn === "slideInDown" || transitionIn === "slideInUp") {
            $nextSlide.addClass("carouselSlideActive");
          }
          $carousel.attr("data-animating", "true");
          $nextSlide[transitionIn]({
            duration: transitionDurationIn,
            queue: true,
            complete: function() {
              if (transitionIn === "fadeIn") {
                $nextSlide.addClass("carouselSlideActive");
              }
              $carousel.attr("data-animating", "false");
            }
          });
        }
      }
      $carousel.attr("data-selected", newSlideIndex);
      $carousel.trigger("change", newSlideIndex);
    };

    return Carousel;

  })());

}).call(this);

