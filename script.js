/////////////////////////////
/////////////////////////////////
///////////////////////////////////Class forme
///////////////////////////////////
///////////////////////////////////

class Forme {
  constructor(width, height, positionX, positionY, couleur, radius, id, clas) {
    this.width = width;
    this.height = height;
    this.positionX = positionX;
    this.positionY = positionY;
    this.couleur = couleur;
    this.radius = radius;
    this.id = id;
    this.clas = clas;
  }
  //////methode d'affichage
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

/////////////////////////////
/////////////////////////////////
///////////////////////////////////Class invader
///////////////////////////////////
///////////////////////////////////

class Invader extends Forme {
  constructor(
    width,
    height,
    positionX,
    positionY,
    couleur,
    radius,
    id,
    deplacementX,
    deplacementY,
    direction
  ) {
    super(width, height, positionX, positionY, couleur, radius, id);
    this.deplacementX = deplacementX;
    this.deplacementY = deplacementY;
    this.direction = direction;
  }

  callBackMove = () => {
    let id = document.getElementById(this.id);

    //////deplacement invader

    this.positionX += this.deplacementX;
    this.positionY += this.deplacementY;
    if (this.positionY - this.height > positionContainer.bottom) {
      id.style.display = "none";
      return;
    } else if (this.positionX + this.deplacementX > positionContainer.right) {
      this.deplacementX = -this.deplacementX;
    } else if (this.positionX + this.deplacementX < positionContainer.left) {
      this.deplacementX = -this.deplacementX;
    } else {
      this.deplacementX;
    }

    id.remove();
    this.display();

    ///////colision invader ships

    let centerX = this.positionX + this.width / 2;
    let centerY = this.positionY + this.height / 2;

    if (this.positionY + this.deplacementY > positionContainer.bottom) {
      id.remove();
    }

    if (
      centerX > spaceShips.positionX &&
      centerX < spaceShips.positionX + spaceShips.width &&
      centerY > spaceShips.positionY &&
      centerY < spaceShips.positionY + spaceShips.height
    ) {
      alert("you loose");
    }
  };

  ////////methode déplacement
  deplacement() {
    setInterval(this.callBackMove, randomNumberMinMax(10, 30));
  }
}

/////////////////////////////
////////////////////////////////////
////////////////////////////////Classe Rocket
/////////////////////////////////////
///////////////////////////////////

class Rocket extends Invader {
  constructor(
    width,
    height,
    positionX,
    positionY,
    couleur,
    radius,
    id,
    deplacementX,
    deplacementY,
    direction
  ) {
    super(
      width,
      height,
      positionX,
      positionY,
      couleur,
      radius,
      id,
      deplacementX,
      deplacementY,
      direction
    );
  }

  deplacementV() {
    let interval = setInterval(() => {
      let id1 = document.getElementById(this.id);
      if (this.positionY > 0) {
        this.positionY -= this.deplacementY;
        this.display;
      }

      if (this.positionY <= 0) {
        clearInterval(interval);
      }
    }, 10);
  }
}

/////////////
/////////////
//////////////taille du conteneur
///////////////
//////////////////

let container = document.querySelector(".container");
let positionContainer = container.getBoundingClientRect();
let containerWidth = positionContainer.right;

/////////////////////////////
/////////////////////////////////
///////////////////////////////////spaceShips
///////////////////////////////////
///////////////////////////////////

/////position de depart ships
let shipsStartPositionX =
  (positionContainer.right + positionContainer.left) / 2;
let shipsStartPositionY = positionContainer.bottom;

/////creation de ships
let spaceShips = new Forme(
  80,
  50,
  shipsStartPositionX,
  shipsStartPositionY,
  "blue",
  "none",
  2
);

spaceShips.display();

//////////déplacement de ships
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
});

/////////////////////////////
/////////////////////////////////
///////////////////////////////////randomNumber
///////////////////////////////////
///////////////////////////////////

function randomNumber(number) {
  return Math.floor(Math.random() * number);
}

function randomNumberMinMax(Min, Max) {
  return Math.floor(Math.random() * (Max - Min) + Min);
}

////////////////////////////////
/////////////////////////////////
//////////////////////////////// invader
////////////////////////////////
//////////////////////////////////

///////function pour directionX l'invader
function plusOuMoin() {
  var randomNum = randomNumber(10);

  if (randomNum < 5) {
    return -5;
  } else {
    return 5;
  }
}

//////creation de l'invader
function creatInvader() {
  let invader = new Invader(
    50,
    50,
    randomNumber(positionContainer.right),
    -50,
    "red",
    "40px",
    randomNumber(10000),
    plusOuMoin(),
    5,
    "none"
  );
  invader.display();
  invader.deplacement();
}

setInterval(creatInvader, 1000);

//////////
/////////
//////////Rocket
/////////
//////////

document.addEventListener("keydown", (e) => {
  if (e.key === "x" || e.key === "X") {
    let rocket = new Rocket(
      30,
      50,
      spaceShips.positionX,
      spaceShips.positionY,
      "grey",
      "none",
      1,
      0,
      5,
      "none"
    );
    console.log("toto");

    rocket.deplacementV();
  }
});
