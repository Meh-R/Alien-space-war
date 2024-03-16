class Forme {
  constructor(width, height, positionX, positionY, couleur, radius, id) {
    this.width = width;
    this.height = height;
    this.positionX = positionX;
    this.positionY = positionY;
    this.couleur = couleur;
    this.radius = radius;
    this.id = id;
  }

  display() {
    let container = document.querySelector(".container");
    let item = document.createElement("div");
    item.style.width = `${this.width}px`;
    item.style.height = `${this.height}px`;
    item.style.backgroundColor = this.couleur;
    item.style.position = "absolute";
    item.style.top = `${this.positionY - this.height}px`;
    item.style.left = `${this.positionX - this.width / 2}px`;
    item.style.borderRadius = this.radius;
    item.id = this.id;
    container.appendChild(item);
  }
}

let container = document.querySelector(".container");
let positionContainer = container.getBoundingClientRect();
let containerWidth = positionContainer.right - positionContainer.left;
let shipsStartPositionX =
  (positionContainer.right + positionContainer.left) / 2;
let shipsStartPositionY = positionContainer.bottom;

let spaceShips = new Forme(
  80,
  50,
  shipsStartPositionX,
  shipsStartPositionY,
  "blue",
  "none",
  2
);

function randomNumber(number) {
  return Math.floor(Math.random() * number);
}

spaceShips.display();

console.log(spaceShips.positionX);

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    if (spaceShips.positionX < positionContainer.right - spaceShips.width / 2) {
      spaceShips.positionX += 10;
    }
  }

  if (e.keyCode == 37) {
    if (spaceShips.positionX > positionContainer.left + spaceShips.width / 2) {
      spaceShips.positionX -= 10;
    }
  }

  let id2 = document.getElementById("2");
  id2.remove();

  spaceShips.display();
  console.log(spaceShips.positionX);
});

let invader = new Forme();
