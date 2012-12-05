/**
 * Dropdown
 */

$.fn.dropdown = function() {
    this.each(function() {
    var $this = $(this),
        $ddTrigger = $this.find('.dropdownTrigger'),
        $ddBox = $this.find('.dropdownBox');

    // Add aria roles and attributes
    $ddTrigger.attr({
      'aria-haspopup':'true',
      'tabindex':0,
      'role':'menuitem'
    });
    $ddBox.attr('aria-hidden', 'true');

    // Need to add class 'active' when hover over dropdownBox as well.. 
    // Not sure how to do it in a way where I don't need to duplicate the functions :\
    $ddTrigger.hover(function() {
      $this.addClass('active');
      $ddBox.attr('aria-hidden', 'false');
    }, function() {
      $this.removeClass('active');
      $ddBox.attr('aria-hidden', 'true');
    });

    // $('.dropdownBox', $this).hover(function() {
    //   $this.toggleClass('active');
    // });
    })
}

$(function() {
    $('.dropdown').dropdown();
});