function reload() {
  window.location.reload();
}
let score = 0;

function play() {
  let modaleStart = document.querySelector(".modaleStart");
  modaleStart.style.visibility = "hidden";
  let gameOver = false;

  /////////////////////////////
  /////////////////////////////////
  ///////////////////////////////////Class forme
  ///////////////////////////////////
  ///////////////////////////////////

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

    deplacement() {
      let deplacementInterval = setInterval(() => {
        //////deplacement invader

        this.display();

        this.positionX += this.deplacementX;
        this.positionY += this.deplacementY;
        if (this.positionY - this.height > positionContainer.bottom) {
          let contact = document.getElementById(this.id);
          contact.remove();
          return;
        } else if (
          this.positionX + this.deplacementX >
          positionContainer.right
        ) {
          this.deplacementX = -this.deplacementX;
        } else if (
          this.positionX + this.deplacementX <
          positionContainer.left
        ) {
          this.deplacementX = -this.deplacementX;
        } else {
          this.deplacementX;
        }

        ///////colision invader ships

        let centerX = this.positionX + this.width / 2;
        let centerY = this.positionY + this.height / 2;

        if (
          centerX > spaceShips.positionX &&
          centerX < spaceShips.positionX + spaceShips.width &&
          centerY > spaceShips.positionY &&
          centerY < spaceShips.positionY + spaceShips.height
        ) {
          let test = document.getElementById(this.id);
          gameOver = true;
          let modaleVar = document.querySelector(".modaleLoose");
          modaleVar.style.visibility = "visible";
          test.remove();
          clearInterval(invaderIntervale);
          clearInterval(deplacementInterval);
        }

        if (
          centerX > rocket.positionX &&
          centerX < rocket.positionX + rocket.width &&
          centerY > rocket.positionY &&
          centerY < rocket.positionY + rocket.height
        ) {
          rocket.positionX = spaceShips.positionX;
          rocket.positionY = spaceShips.positionY;
          let test = document.getElementById(this.id);
          test.remove();
          console.log("killed");

          score += 10;
          let scoreText = document.querySelector(".scoreCourant");
          scoreText.innerText = `Score : ${score}`;
        }

        let id = document.getElementById(this.id);
        if (id) id.remove();
      }, 50);
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
        if (gameOver == true) {
          let rocketId = document.getElementById(this.id);
          clearInterval(interval);
          rocketId.remove();
        } else if (this.positionY > 0) {
          let id1 = document.getElementById(this.id);
          this.positionY -= this.deplacementY;
          id1.remove();
          this.display();
        } else if (this.positionY <= 0) {
          this.positionX = spaceShips.positionX;
          this.positionY = spaceShips.positionY;
        }
      }, 50);
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
      if (
        spaceShips.positionX <
        positionContainer.right - spaceShips.width / 2
      ) {
        spaceShips.positionX += 10;
      }
    }

    if (e.keyCode == 37) {
      if (
        spaceShips.positionX >
        positionContainer.left + spaceShips.width / 2
      ) {
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
    var randomNum = randomNumber(20);

    if (randomNum < 10) {
      return -10;
    } else {
      return 10;
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
      10,
      "none"
    );
    invader.display();
    invader.deplacement();
  }

  let invaderIntervale = setInterval(creatInvader, 1000);

  //////////
  /////////
  //////////Rocket
  /////////
  //////////

  let rocket = new Rocket(
    30,
    50,
    spaceShips.positionX,
    spaceShips.positionY,
    "grey",
    "none",
    1,
    0,
    20,
    "none"
  );

  rocket.display();
  rocket.deplacementV();
}
