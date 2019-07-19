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


//init defines each variable.
function init() {
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
}

//handle incoming click event listeners for race buttons
function raceSelector(e) {
  var inc = e.currentTarget.getAttribute('data-img');
  if(cur != inc){
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
          cur = inc;
        }
      }, 400);
    }, 400);
  }
}
