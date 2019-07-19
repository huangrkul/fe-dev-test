// Scroll Event cycle
// Adapted from http://www.html5rocks.com/en/tutorials/speed/animations/

var latestKnownScrollY = 0;
var currentScrollY = 0;
var scrollTicking = false;
var scrollLoadBufferFinished = false;
var scrollDirection = "";
//Global viewport init check (will be updated onResize)
var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) // from http://stackoverflow.com/a/8876069
var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) // from http://stackoverflow.com/a/8876069

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
  if(!scrollTicking) {
    requestAnimationFrame(scrollUpdate)
  }
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
  //triggerIterate(scrollTriggerEls);
}

//Actual Events!
window.addEventListener('scroll', onScroll, false);
window.addEventListener('resize', onResize, false);


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


//Helper event to avoid jumpy nav or scroll behavior
window.addEventListener("load", function(){
  window.setTimeout(function(){
    scrollLoadBufferFinished = true;
  }, 100);
}, false);


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
