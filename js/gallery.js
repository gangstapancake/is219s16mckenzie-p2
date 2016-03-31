// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	if(mCurrentIndex < mImages.length)
	{	
		mCurrentIndex++;
	}
	else
	{
		mCurrentIndex = 0;
	}
	
	$('.thumbnail').attr('src', mImages[mCurrentIndex].img);
	$('.location').text = mImages[mCurrentIndex].location;
	$('.description').text = mImages[mCurrentIndex].description;
	$('.date').text = mImages[mCurrentIndex].date;
	console.log('swap photo');
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function reqListener () {
console.log(this.responseText);
}

mRequest.onreadystatechange = function() {
if (mRequest.readyState == 4 && mRequest.status == 200) {
    mJson = JSON.parse(mRequest.responseText);
    myFunction(mJson);
    }
};

mRequest.addEventListener("load", reqListener);
mRequest.open("GET", mUrl, true);
mRequest.send();

function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() 
{
	
    myFunction(mJson);
	console.log('window loaded');

}, false);


	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	//2. description of photo
	//3. the date when the photo was taken
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
	
	function GalleryImage(location,description,date,url) {
		this.location = location;
		this.description = description;
		this.date = date;
		this.img = img;
		
	}
	
	function myFunction(mJson)
	{
		//for(var i = 0; i < mJson.length;i++)
		for(var obj in mJson)
		{
			GalleryImage.img = mJson[obj].imgPath;
			GalleryImage.location = mJson[obj].imgLocation;
			GalleryImage.description = mJson[obj].description;
			GalleryImage.date = mJson[obj].date;
			
			mImages.push(mJson[obj]);
			console.log(mJson[obj]);
		}
	
	}





