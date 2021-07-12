const width = 28;
const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
const squares = [];
let score = 0;
const startButton = document.getElementById("start-button");

// 28*28 = 784
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0,
  1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4,
  4, 4, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1,
];
//create board
function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    // create div
    const square = document.createElement("div");
    //put those div in the main div "grid"
    grid.appendChild(square);
    //put all those square in squares array
    squares.push(square);
    //conditions to add class in each div
    if (layout[i] === 0) {
      squares[i].classList.add("pac-dot");
      squares[i].innerHTML = ".";
    } else if (layout[i] === 1) {
      squares[i].classList.add("wall");
    } else if (layout[i] === 3) {
      squares[i].classList.add("power-pellet");
    } else if (layout[i] === 2) {
      squares[i].classList.add("ghost-lair");
    }
  }
}
createBoard();
// Start the game

startButton.addEventListener("click", start);
function start() {
  document.addEventListener("keyup", movePacman);
  ghosts.forEach((ghost) => moveGhost(ghost));
}

// starting position of pacman

let pacmanCurrentIndex = 490;
squares[pacmanCurrentIndex].classList.add("pac-man");
squares[pacmanCurrentIndex].classList.add("pac-man-right");

function removePacman() {
  squares[pacmanCurrentIndex].classList.remove("pac-man");
  squares[pacmanCurrentIndex].classList.remove("pac-man-right");
  squares[pacmanCurrentIndex].classList.remove("pac-man-left");
  squares[pacmanCurrentIndex].classList.remove("pac-man-down");
  squares[pacmanCurrentIndex].classList.remove("pac-man-up");
}

//control pacman
//up key = 38
//left key = 37
//right key = 39
//down key = 40
function movePacman(e) {
  removePacman();
  switch (e.keyCode) {
    case 37:
      if (
        pacmanCurrentIndex % width !== 0 &&
        !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
        !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
      )
        pacmanCurrentIndex -= 1;
      if (squares[pacmanCurrentIndex - 1] === squares[363]) {
        pacmanCurrentIndex = 391;
      }
      squares[pacmanCurrentIndex].classList.add("pac-man");
      squares[pacmanCurrentIndex].classList.add("pac-man-left");
      break;
    case 38:
      if (
        pacmanCurrentIndex - width >= 0 &&
        !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
        !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")
      )
        pacmanCurrentIndex -= width;
      squares[pacmanCurrentIndex].classList.add("pac-man");
      squares[pacmanCurrentIndex].classList.add("pac-man-up");
      break;
    case 39:
      if (
        pacmanCurrentIndex % width < width - 1 &&
        !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
        !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
      )
        pacmanCurrentIndex += 1;
      if (squares[pacmanCurrentIndex + 1] === squares[392]) {
        pacmanCurrentIndex = 364;
      }
      squares[pacmanCurrentIndex].classList.add("pac-man");
      squares[pacmanCurrentIndex].classList.add("pac-man-right");
      break;
    case 40:
      if (
        pacmanCurrentIndex + width < width * width &&
        !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
        !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")
      )
        pacmanCurrentIndex += width;
      squares[pacmanCurrentIndex].classList.add("pac-man");
      squares[pacmanCurrentIndex].classList.add("pac-man-down");
      break;
  }
  pacDotEaten();
  powerPelletEaten();
  checkForGameOver();
  checkForWin();
}

// function pacman eating the dots and add score
function pacDotEaten() {
  if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
    score++;
    scoreDisplay.innerHTML = score;
    squares[pacmanCurrentIndex].classList.remove("pac-dot");
    squares[pacmanCurrentIndex].innerHTML = "";
  }
}

//function for the logical of eating point and scared each ghost
function powerPelletEaten() {
  //if square pacman is in contains a power pellet
  if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
    score += 10;
    ghosts.forEach((ghost) => (ghost.isScared = true));
    setTimeout(unScaredGhosts, 10000);
    squares[pacmanCurrentIndex].classList.remove("power-pellet");
  }
}
//unscarred each ghost
function unScaredGhosts() {
  ghosts.forEach((ghost) => (ghost.isScared = false));
}

// create class ghost
class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;
  }
}

const ghosts = [
  new Ghost("blinky", 348, 250),
  new Ghost("pinky", 376, 200),
  new Ghost("inky", 351, 150),
  new Ghost("clyde", 379, 250),
];
//draw my ghost onto my grid
ghosts.forEach((ghost) => {
  squares[ghost.currentIndex].classList.add(ghost.className);
  squares[ghost.currentIndex].classList.add("ghost");
});
//move each ghost

function moveGhost(ghost) {
  const directions = [-1, +1, width, -width];
  // directions.sort();
  let direction = directions[Math.floor(Math.random() * directions.length)];

  ghost.timerId = setInterval(function () {
    //if the next square your ghost is going to go to does not have a ghost and does not have a wall
    if (
      !squares[ghost.currentIndex + direction].classList.contains("ghost") &&
      !squares[ghost.currentIndex + direction].classList.contains("wall")
    ) {
      //remove the ghosts classes
      squares[ghost.currentIndex].classList.remove(ghost.className);
      squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost");
      //move into that space
      ghost.currentIndex += direction;
      squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      //else find a new random direction ot go in
    } else {
      const TimeID = setInterval(function () {
        direction = directions[Math.floor(Math.random() * directions.length)];
      }, 3000);
    }

    //if the ghost is currently scared
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add("scared-ghost");
    }

    //if the ghost is currently scared and pacman is on it
    if (
      ghost.isScared &&
      squares[ghost.currentIndex].classList.contains("pac-man")
    ) {
      squares[ghost.currentIndex].classList.remove(
        ghost.className,
        "ghost",
        "scared-ghost"
      );
      ghost.currentIndex = ghost.startIndex;
      scoreDisplay.innerHTML = score += 100;
      squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
    }
    checkForGameOver();
  }, ghost.speed);
}

//check for game over
function checkForGameOver() {
  // if the square pacman is in contains a ghost and the square ghost is not scared
  if (
    squares[pacmanCurrentIndex].classList.contains("ghost") &&
    !squares[pacmanCurrentIndex].classList.contains("scared-ghost")
  ) {
    // forEach ghost - we need to stop moving
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    //removeEventListener from our control function
    document.removeEventListener("keyup", movePacman);
    // tell the game is over
    setTimeout(function () {
      alert("Game over");
    }, 500);
  }
}

// check for win
function checkForWin() {
  //if the score is equal to 274 you win
  if (score > 274) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener("keyup", movePacman);
    startButton.removeEventListener("click", start);
    setTimeout(function () {
      alert(" You win!!!");
    }, 500);
  }
}
