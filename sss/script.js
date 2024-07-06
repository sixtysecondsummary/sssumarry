
  
document.getElementById('share-button').addEventListener('click', async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Web Share API Demo',
                text: 'Check out this awesome demo!',
                url: 'https://example.com'
            });
            console.log('Content shared successfully');
        } catch (error) {
            console.error('Error sharing content:', error);
        }
    } else {
        alert('Web Share API is not supported in your browser.');
    }
});
 

  
document.addEventListener('DOMContentLoaded', function() {
  for (let i = 1; i <= 10; i++) {
      document.getElementById('link' + i).addEventListener('click', function(e) {
          e.preventDefault();
          let div = document.getElementById('div' + i);
          if (div.style.display === 'none' || div.style.display === '') {
              div.style.display = 'block';
          } else {
              div.style.display = 'none';
          }
      });
  }
});
</script>

  
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
              console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch(error => {
              console.log('Service Worker registration failed:', error);
          });
  }

  const links = document.querySelectorAll('.link');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.querySelector('.modal-close');



  modalClose.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
      if (e.target === modal) {
          modal.style.display = 'none';
      }
  });
</script>


  
document.getElementById('about').addEventListener('click', function(event) {
event.preventDefault();
var aboutDiv = document.getElementById('aboutDiv');
if (aboutDiv.style.display === 'none' || aboutDiv.style.display === '') {
    aboutDiv.style.display = 'block';
} else {
    aboutDiv.style.display = 'none';
}
});
</script>

  
document.getElementById('showVideoLink').addEventListener('click', function(event) {
event.preventDefault();
var videoDiv = document.getElementById('videoDiv');
if (videoDiv.style.display === 'none' || videoDiv.style.display === '') {
    videoDiv.style.display = 'block';
} else {
    videoDiv.style.display = 'none';
}
});
</script>



  
var radius = 240; // how big of the radius
var autoRotate = true; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var imgWidth = 120; // width of images (unit: px)
var imgHeight = 170; // height of images (unit: px)

// Link of background music - set 'null' if you dont want to play background music
var bgMusicURL = 'https://api.soundcloud.com/tracks/143041228/stream?client_id=587aa2d384f7333a886010d5f52f302a';
var bgMusicControls = true; // Show UI music control

/*
NOTE:
 + imgWidth, imgHeight will work for video
 + if imgWidth, imgHeight too small, play/pause button in <video> will be hidden
 + Music link are taken from: https://hoangtran0410.github.io/Visualyze-design-your-own-/?theme=HauMaster&playlist=1&song=1&background=28
 + Custom from code in tiktok video  https://www.facebook.com/J2TEAM.ManhTuan/videos/1353367338135935/
*/


// ===================== start =======================
// animation start after 1000 miliseconds
setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid]; // combine 2 arrays

// Size of images
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

// Size of ground - depend on radius
var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
for (var i = 0; i < aEle.length; i++) {
aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
aEle[i].style.transition = "transform 1s";
aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
}
}

function applyTranform(obj) {
// Constrain the angle of camera (between 0 and 180)
if(tY > 180) tY = 180;
if(tY < 0) tY = 0;

// Apply the angle
obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
ospin.style.animationPlayState = (yes?'running':'paused');
}

var sX, sY, nX, nY, desX = 0,
desY = 0,
tX = 0,
tY = 10;

// auto spin
if (autoRotate) {
var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

// add background music
if (bgMusicURL) {
document.getElementById('music-container').innerHTML += `
<audio src="${bgMusicURL}" ${bgMusicControls? 'controls': ''} autoplay loop>    
<p>If you are reading this, it is because your browser does not support the audio element.</p>
</audio>
`;
}

// setup events
document.onpointerdown = function (e) {
clearInterval(odrag.timer);
e = e || window.event;
var sX = e.clientX,
sY = e.clientY;

this.onpointermove = function (e) {
e = e || window.event;
var nX = e.clientX,
  nY = e.clientY;
desX = nX - sX;
desY = nY - sY;
tX += desX * 0.1;
tY += desY * 0.1;
applyTranform(odrag);
sX = nX;
sY = nY;
};

this.onpointerup = function (e) {
odrag.timer = setInterval(function () {
desX *= 0.95;
desY *= 0.95;
tX += desX * 0.1;
tY += desY * 0.1;
applyTranform(odrag);
playSpin(false);
if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
  clearInterval(odrag.timer);
  playSpin(true);
}
}, 17);
this.onpointermove = this.onpointerup = null;
};

return false;
};

document.onmousewheel = function(e) {
e = e || window.event;
var d = e.wheelDelta / 20 || -e.detail;
radius += d;
init(1);
};

</script>
