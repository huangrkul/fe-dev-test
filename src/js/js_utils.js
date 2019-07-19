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
