import './scss/about.scss';
// image loaded check
// source: https://cobwwweb.com/wait-until-all-images-loaded
 $(document).ready(function() {
   // Images loaded is zero because we're going to process a new set of images.
   var imagesLoaded = 0;
   // Total images is still the total number of <img> elements on the page.
   var totalImages = $('img').length;

   // Step through each image in the DOM, clone it, attach an onload event
   // listener, then set its source to the source of the original image. When
   // that new image has loaded, fire the imageLoaded() callback.
   $('img').each(function(idx, img) {
     $('<img>').on('load', imageLoaded).attr('src', $(img).attr('src'));
   });

   // Do exactly as we had before -- increment the loaded count and if all are
   // loaded, call the allImagesLoaded() function.
   function imageLoaded() {
     imagesLoaded++;
     if (imagesLoaded == totalImages) {
       allImagesLoaded();
     }
   }

   function allImagesLoaded() {
     init();
   }
 });

var initReady = false;

// Scroll Event cycle variables////////////////////////////////////////////////////////////////////////
// Adapted from http://www.html5rocks.com/en/tutorials/speed/animations/
var latestKnownScrollY = 0;
var currentScrollY = 0;
var scrollTicking = false;
var scrollLoadBufferFinished = false;
var scrollDirection = "";
//Global viewport init check (will be updated onResize)
var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) // from http://stackoverflow.com/a/8876069
var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) // from http://stackoverflow.com/a/8876069

//scrolltrigger variables
var raceBios
var raceIcons;

var scrollTriggerEls = [

  raceBios = {
    el : document.getElementById('raceImgBox'),
    triggered : false,
    triggerPerc : 80,
    init : function() {
      var interval = 120;
      Utils.setAni("raceImgBox",1,"zoom-enter");
      Utils.setAni("raceTxtBox",300,"fadein-left");
      Utils.setAni("raceBtnImg0",600,"icon-animate");
      Utils.setAni("raceBtnImg1",600+interval,"icon-animate");
      Utils.setAni("raceBtnImg2",600+interval*2,"icon-animate");
      Utils.setAni("raceBtnImg3",600+interval*3,"icon-animate");
      Utils.setAni("raceBtnImg4",600+interval*4,"icon-animate");
      Utils.setAni("raceBtnImg5",600+interval*5,"icon-animate");
      Utils.setAni("raceBtnImg6",600+interval*6,"icon-animate");
      raceAutoTimer();
    }
  }
  // raceIcons = {
  //   el : document.getElementById('raceIcons'),
  //   triggered : false,
  //   triggerPerc : 99,
  //   init : function() {
  //     var interval = 120;
  //     Utils.setAni("raceBtnImg0",1,"icon-animate");
  //     Utils.setAni("raceBtnImg1",interval,"icon-animate");
  //     Utils.setAni("raceBtnImg2",interval*2,"icon-animate");
  //     Utils.setAni("raceBtnImg3",interval*3,"icon-animate");
  //     Utils.setAni("raceBtnImg4",interval*4,"icon-animate");
  //     Utils.setAni("raceBtnImg5",interval*5,"icon-animate");
  //     Utils.setAni("raceBtnImg6",interval*6,"icon-animate");
  //   }
  //}
];
///////////////////////////////////////////////////////////////////////////////////////////////////////


//video variable
var vidTera;

//these variables are for race selection feature
var raceTitle;
var raceTitleArray = [
  "Aman","Baraka","Castanic","Elin","High Elf","Human","Popori"
];

var raceDesc;
var raceDescArray = [
  //Aman
  "Amani are always the loudest voices in defense of freedom—either their own, or someone else’s—and once given, will never go back on their word.",
  //Baraka
  "A peaceful and noble race, barakas are nonetheless ferocious in defense of the weak.",
  //Catanic
  "Known for their dark, wry humor and bold manner, castanics refuse to be chained to their dark past, and strive each day to forge a new future.",
  //Elin
  "Never aging, the wise and battleworn elins still appear as vulnerable and innocent as their goddess was in the moment of their creation.",
  //High Elf
  "The high elves' historical and magical knowledge make them the caretakers of culture for the entire world.",
  //Human
  "Cursed by their creator to wander without a homeland, humans turned adversity to advantage during their long exile by studying the culture and crafts of other races.",
  //Popori
  "Nature spirits awakened by the elins, a popori’s diminutive stature and fuzzy appearance belie their instinctive ferocity in battle."
];

var raceImgArray;
var raceBtnArray;

//current frame
var cur = 0;
//incoming frame
var inc = 0;

var raceTimer;
var isStopped = false;

//init defines each variable.
function init() {
  initReady = true;
  vidTera = document.getElementById("vidTera");
  raceTitle = document.getElementById("raceTitle");
  raceDesc = document.getElementById("raceDesc");
  raceImgArray = document.getElementsByClassName("race-img");
  raceBtnArray = document.getElementsByClassName("race-btn");

  //add event listener and data value to all race buttons
  for (var i = 0; i < raceBtnArray.length; i++) {
    raceBtnArray[i].addEventListener("click",raceSelector);
    raceBtnArray[i].setAttribute('data-img', [i]);
  }
  //initial race from the array is displayed first.
  raceTitle.innerHTML = raceTitleArray[0];
  raceDesc.innerHTML = raceDescArray[0];

  window.addEventListener('scroll', onScroll, false);
  window.addEventListener('resize', onResize, false);

  Utils.setAni("playBtn",1,"inbottom-settle");
  Utils.setAni("videoContainer",1,"expand-out");
  Utils.setAni("vidTera",800,"fadein");
}

function raceAutoTimer() {
  if(!isStopped){
    raceTimer = window.setInterval(raceCarousel,8000);
  }
}

function raceCarousel() {
  if(inc < raceBtnArray.length - 1){
    inc++;
  } else {
    inc = 0;
  }
  raceSwap();
}

//handle incoming click event listeners for race buttons
function raceSelector(e) {
  clearInterval(raceTimer);
  isStopped = true;
  inc = e.currentTarget.getAttribute('data-img');
  if(cur != inc){
    raceSwap();
  } else {
    setTimeout(function(){
      isStopped = false;
      raceAutoTimer();
    },1000)
  }
}

function raceSwap() {
  for (var i = 0; i < raceBtnArray.length; i++) {
    raceBtnArray[i].removeEventListener("click",raceSelector);
  }
  raceImgArray[cur].classList.add('zoom-out');
  raceTitle.classList.add('fadeout-right');
  raceDesc.classList.add('fadeout-right-stagger');

  setTimeout(function(){
    raceImgArray[cur].classList.add('hide');
    raceImgArray[cur].classList.remove('zoom-out');
    raceImgArray[cur].classList.remove('zoom-enter');

    raceImgArray[inc].classList.add('zoom-enter');
    raceImgArray[inc].classList.remove('hide');

    raceTitle.innerHTML = raceTitleArray[inc];
    raceTitle.classList.remove('fadeout-right');
    raceTitle.classList.add('fadein-left');

    raceDesc.innerHTML = raceDescArray[inc];
    raceDesc.classList.remove('fadeout-right-stagger');
    raceDesc.classList.add('fadein-left-stagger');

    setTimeout(function(){
      for (var i = 0; i < raceBtnArray.length; i++) {
        raceBtnArray[i].addEventListener("click",raceSelector);
      }
      cur = inc;
      if(isStopped){
        isStopped = false;
        raceAutoTimer();
      }
    }, 400);
  }, 400);
}

// Scroll Event cycle functions////////////////////////////////////////////////////////////////////////
// Adapted from http://www.html5rocks.com/en/tutorials/speed/animations/
//Resize update window dimensions
function onResize() {
  requestAnimationFrame(resizeUpdate);
}
function resizeUpdate() {
  viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0); //Might be an expensive re-draw... though infrequent except for de-bugging.
  viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) // from http://stackoverflow.com/a/8876069
  currentScrollY = window.scrollY;
  //also do a scroll check
  requestTick();
}


function onScroll() {
  currentScrollY = window.scrollY;
  requestTick();
}

function requestTick() {
  requestAnimationFrame(scrollUpdate)
  scrollTicking = true; //Restrict rAF call to one currently happening
}

//meat and potatoes update for scroll. Could change per page (could call page specific event functions??)
function scrollUpdate() {
  scrollTicking = false;
  scrollDirection = scrollDirHandler(currentScrollY, latestKnownScrollY);

  //Update the latestKnownScrollY with the current scroll position
  latestKnownScrollY = currentScrollY;
  triggerSectionCheck();
}

function triggerSectionCheck() {
  if(initReady){
    triggerIterate(scrollTriggerEls);
  }
}

//Helper function for scrollDirection handling
function scrollDirHandler(pageYpos, lastYpos) {
	  if (pageYpos > lastYpos) {
			return "down";
		} else if (pageYpos < lastYpos) {
			return "up";
		} else {
			return "none";
		}
}

//Helper function for visibility. Kind of layout thrash-y but all scroll check boundingClients seem rough
function isVisible(node) {
  // Am I visible?
  // Height and Width are not explicitly necessary in visibility detection,
  // the bottom, right, top and left are the
  // essential checks. If an image is 0x0, it is technically not visible, so
  // it should not be marked as such.
  // That is why either width or height have to be > 0.
  var rect = node.getBoundingClientRect();

  //return rect dimensions if true
  if ((rect.height > 0 || rect.width > 0) && rect.bottom >= 0 && rect.right >= 0 && rect.top <= (viewportHeight) && rect.left <= (viewportWidth)) {
    return rect;
  }
  else {
    return false;
  }
}

function triggerIterate(triggerArray) {
  for (var i = 0; i < triggerArray.length; i++) {

    //if not triggered already
    if (!triggerArray[i].triggered) {
      //isVisible will return the trigger El rectBounds if true
      var ele = triggerArray[i].el;
      var divY = isVisible(ele).top;
      if(!isVisible(ele) == false){
        var percVisible = Math.round((divY / viewportHeight) * 100);
        //&& percVisible >=0
        if(percVisible < triggerArray[i].triggerPerc){
          triggerArray[i].init();
          triggerArray[i].triggered = true;
        }
      }
    }
  }
}
//////////////////////////////////////////////////////////////////////////////////

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());



//custom event polyfill for IE9 - IE10
(function () {
  function CustomEvent (event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  };
  CustomEvent.prototype = window.CustomEvent.prototype;
  window.CustomEvent = CustomEvent;
})();


var Utils = (function() {
  return {
    bindAnimationEnd : function(el, myFunc) {
      var myEl;
      if (el.nodeType && el.nodeType == 1) {
        // console.log("bind an element")
        myEl = el;
      } else {
        // console.log("bind an id: " + el)
        myEl = document.getElementById(el);
      }
      myEl.addEventListener('webkitAnimationEnd', myFunc, false);
      myEl.addEventListener('AnimationEnd', myFunc, false);
      myEl.addEventListener('MSAnimationEnd', myFunc, false);
      myEl.addEventListener('mozAnimationEnd', myFunc, false);
      myEl.addEventListener('animationend', myFunc, false);
      myEl.addEventListener('oanimationend', myFunc, false);
    },
    unbindAnimationEnd : function(el, myFunc) {
      var myEl;
      if (el.nodeType && el.nodeType == 1) {
        myEl = el;
      } else {
        myEl = document.getElementById(el);
      }
      myEl.removeEventListener('webkitAnimationEnd', myFunc, false);
      myEl.removeEventListener('AnimationEnd', myFunc, false);
      myEl.removeEventListener('MSAnimationEnd', myFunc, false);
      myEl.removeEventListener('mozAnimationEnd', myFunc, false);
      myEl.removeEventListener('animationend', myFunc, false);
      myEl.removeEventListener('oanimationend', myFunc, false);
    },
    removeClass : function(myEl, myClass) {
      document.getElementById(myEl).classList.remove(myClass);
    },
    addClass : function(myEl, myClass) {
      document.getElementById(myEl).classList.add(myClass);
    },
    hasClass : function(n,s) { //element name, string
      return"string"==typeof n||n instanceof String?document.getElementById(n).classList.contains(s):n.classList.contains(s)
    },
    addAni : function(myEl, myClass) {
      if (Utils.hasClass(myEl, "hide") || Utils.hasClass(myEl, myClass)){
        Utils.removeClass(myEl, "hide");
        Utils.removeClass(myEl, myClass);
      }
      Utils.addClass(myEl, myClass);
    },

    resetClass : function(myEl,myClass){document.getElementById(myEl).className=myClass;},

    setAni : function(elId, time, classname, action) {
      // elID - string, id of element to affect
      // time - time, in ms for anonymous setTimeout
      // classname - string, classname to pass to action function
      // action - string, name of Utils function to apply class transformation on an element. Works with functions that are Utils.action({{element ID as string}}, {{class name as string}}), such as addClass, removeClass, resetClass, or addAni. Default is set to addAni.
      if (typeof time !== "number") {
        console.log("%c Error in setAni for #" + elId + ". The setAni second argument must be a non-zero integer.", "color:red")
      }
      if (classname == undefined) {
        classname = "set-ani";
      }
      if(action == undefined) {
        action = "addAni";
      }
      setTimeout(function(){
        Utils[action](elId, classname);
      },time);
    },

    classSwap: function(ele, classArray, time, i) {
      if (!time) {time = "100";}
      if (i == undefined) {i = -1;}
      i++;
      if (i >= classArray.length) {
        Utils.addClass(ele, classArray[classArray.length-1]);
        return;
      };

      Utils.addClass(ele, classArray[i]);

      setTimeout(function() {
        Utils.removeClass(ele, classArray[i]);
        Utils.classSwap(ele, classArray, time, i);
      }, time);
    }
  }
})();
