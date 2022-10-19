// Following tutorial: https://www.youtube.com/watch?v=GFO_txvwK_c

// choose starting animation state
let playerState = "idle";
// configure dropdown to change player state
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", function (e) {
  playerState = e.target.value;
});

// assign canvas and get the context
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

// canvas default 300 x 150, must set to match CSS
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

// creates image element like HTML <img />
const playerImage = new Image();
playerImage.src = "./assets/character_sprite.png";
//Width of one frame = px size of width of file divided by # of frames
const spriteWidth = 575;
//Height of one frame = same as width but for height
const spriteHeight = 523;
// choose how fast/slow animation is
let gameFrame = 0;
const staggerFrames = 2;
// map out sprite animations and different properties
const spriteAnimations = [];
const animationStates = [
  {
    name: "idle",
    frames: 7
  },
  {
    name: "jump",
    frames: 7
  },
  {
    name: "fall",
    frames: 7
  },
  {
    name: "run",
    frames: 9
  },
  {
    name: "dizzy",
    frames: 11
  },
  {
    name: "sit",
    frames: 5
  },
  {
    name: "roll",
    frames: 7
  },
  {
    name: "bite",
    frames: 7
  },
  {
    name: "ko",
    frames: 12
  },
  {
    name: "gethit",
    frames: 4
  }
];

animationStates.forEach((state, index) => {
  let frames = {
    loc: []
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});

// function to animate sprite loop
function animate() {
  // clear old paint from canvas between each frame x,y,w,h
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // variable to cycle between 0 and amt of frames(starting at 0)
  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  /* drawImage: can pass 3, 5, or 9 arguments.
  First is always image you want to draw
  Second, Third, Fourth, Fifth: starting x,y,w,h specify rectangular area to crop from sprite sheet
  Sixth, Seventh, Eigth, Ninth: destination x,y,w,h specify where we want the cropped area to be displayed on the canvas*/
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  gameFrame++;
  // built in method, calls function once. creates loop if called meta
  requestAnimationFrame(animate);
}

animate();
