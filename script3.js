let gif;
let gifX, gifY, gifScale;
let gifFinished = false;
let showGifs = false;
let imageLoaded = false;

function preload() {
  gif = loadImage('Explosion2.gif', () => {
    imageLoaded = true;
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  randomizeGif();

  window.addEventListener('scroll', checkScroll);
  
  let canvas = document.getElementsByTagName('canvas')[0];
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
}

function draw() {
  clear();

  if (showGifs && imageLoaded) {
    push();
    translate(gifX, gifY);
    scale(gifScale);
    image(gif, 0, 0);
    pop();

    if (frameCount % gif.numFrames() === 0 && !gifFinished) {
      gifFinished = true;
      randomizeGif();
      gifFinished = false;
    }
  }
}

function checkScroll() {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

  const scrollPercent = (scrollTop / scrollHeight) * 100;

  // Show GIFs if the scroll percentage reaches x%
  if (scrollPercent >= 80) {
    showGifs = true;
    window.removeEventListener('scroll', checkScroll);
  }
}

function randomizeGif() {
  if (imageLoaded) {
    gifScale = random(0.5, 1);
    gifX = random(0, width - gif.width * gifScale);
    gifY = random(0, height - gif.height * gifScale);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
