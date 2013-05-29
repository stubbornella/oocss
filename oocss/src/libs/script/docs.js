$(function () {

  docsMenu('docH2');

  if (document.getElementById('docNav')) {
    document.getElementById('toggleCode').onclick = function () {
      toggleDoc('hideCode');
    };

    document.getElementById('toggleDesignNotes').onclick = function () {
      toggleDoc('hideDesigNotes');
    };
  }

  // showViewPortDimensions();
});

var docsMenu;
(function () {
  var docNav, navWrapper, navTrigger, navWrapperInner, docNavInner;

  function updateNavWrapperPosition(navWrapperStartPos) {
    if (navWrapperStartPos < 0) {
      navWrapperStartPos = findPos(navWrapper).top
    }
    if (getScrollTop() > navWrapperStartPos) {
      navWrapper.classList.add("docNavFixed");
    } else {
      navWrapper.classList.remove("docNavFixed");
    }
  }

  docsMenu = function (classname) {
    docNav = document.getElementById('docNav');
    navWrapper = document.getElementById('docNavWrapper');
    navWrapperInner = document.getElementById('docNavWrapperInner');
    docNavInner = document.getElementById('docNavInner');
    navTrigger = document.getElementById('docNavTrigger');

    if (!docNav) return;

    var headings = document.getElementsByClassName(classname);
    //sort headings
    headings = Array.prototype.slice.call(headings).sort(function (a, b) {
      return a.innerHTML < b.innerHTML ? -1 : 1;
    });

    for (var i = 0; i < headings.length; i++) {
      var id = headings[i].getAttribute('id'),
        componentName = headings[i].innerHTML,
        navItem = '<li><a href="#' + id + '">' + componentName + '</a></li>';

      docNav.innerHTML += (navItem);
    }

    //Toggle docNav
    navTrigger.onclick = (function () {
      var classname = 'docNavActive',
        classRe = new RegExp("(^|\\s)" + classname + "(\\s|$)", 'g');

      if (classRe.test(navWrapper.className)) {
        navWrapper.className = navWrapper.className.replace(classRe, ' ');
      } else {
        navWrapper.className += ' ' + classname;
        updateToolbarSize();
      }
    });


    var navWrapperStartPos = -1;
    //Make docNav stick to top of viewport when scrolling. Uncomment this if you want to have menu that sticks to top of viewport
    window.addEventListener('scroll', function () {
      updateNavWrapperPosition(navWrapperStartPos);
    });

    window.addEventListener('resize', function () {
      updateToolbarSize();
    });

    updateNavWrapperPosition(navWrapperStartPos);
  };

  var diffHeight = -1,
    heightTrigger = 0,
    bottomgap = 5;

  function updateToolbarSize() {

    // if docNav opened calculate diffHeight
    if (diffHeight == -1 && /docNavActive/.test(navWrapper.className)) {
      diffHeight = docNavInner.offsetHeight - docNav.offsetHeight;
      heightTrigger = docNavInner.offsetHeight + docNavInner.offsetTop;
    }

    var newHeight = window.innerHeight - diffHeight - docNavInner.offsetTop; //navTrigger.offsetHeight;
    if (heightTrigger > window.innerHeight - bottomgap) {
      docNav.style.height = newHeight - bottomgap + 'px';
    } else {
      docNav.style.height = 'auto';
    }
  }
})();


//Cross browser for scrolling detection. Uncomment this if you want to have menu that sticks to top of viewport
function getScrollTop() {
  if (typeof pageYOffset != 'undefined') {
    //most browsers
    return pageYOffset;
  }
  else {
    var B = document.body; //IE 'quirks'
    var D = document.documentElement; //IE with doctype
    D = (D.clientHeight) ? D : B;
    return D.scrollTop;
  }
}


//Toggle
function toggleDoc(classname) {
  var html = document.documentElement,
    classRe = new RegExp("(^|\\s)" + classname + "(\\s|$)", 'g');

  //toggle the css class
  if (classRe.test(html.className)) {
    html.className = html.className.replace(classRe, '');
  } else {
    html.className += ' ' + classname;
  }
}

function findPos(obj) {
  var curleft = 0, curtop = 0;
  do {
    curleft += obj.offsetLeft;
    curtop += obj.offsetTop;
  } while (obj = obj.offsetParent);

  return {left: curleft, top: curtop};
}

function showViewPortDimensions() {
  var $div = $('<div style="position: fixed; background: #fff; top:0; left: 0; border:1px solid black; padding:2px;z-index: 99999;font-size: 12px;"></div>');

  function updateViewportDimensions() {
    $div.html(window.innerWidth + '&times;' + window.innerHeight);
  }

  $('body').prepend($div);
  $(window).resize(updateViewportDimensions);
  updateViewportDimensions();
}