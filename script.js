////////////////fonction pour recharger le jeux

function reload() {
  window.location.reload();
}

/////////////// variable de score

let score = 0;

////////////// recuperation du dernier score

let lastScore = document.querySelector(".lastScore");
lastScore.innerText = `Last score ${window.localStorage.getItem(
  "scoreCourant",
  score
)}`;

////////////////////////////////
/////////////////////////////////
////////////////////////////////function play qui englobe toute les class et instance
///////////////////////////////////
/////////////////////////////////////

function plays() {
  /////////////////////modale de depart qui disparait en executant plays

  let modaleStart = document.querySelector(".modaleStart");
  modaleStart.style.visibility = "hidden";

  ////////variable de fin de jeux

  let gameOver = false;

  /////// mucic du jeux

  let soundGame = document.querySelector(".soundGame");
  soundGame.play();

  /////////////////////////////
  /////////////////////////////////
  ///////////////////////////////////Class forme

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
      item.style.backgroundImage = `url(${this.couleur})`;
      item.style.backgroundSize = "cover";
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

    /////////// Methode déplacement invader gestion de collision

    deplacement() {
      ////////////// setintervale pour crée les frame

      let deplacementInterval = setInterval(() => {
        //////////////supression de la frame
        let id = document.getElementById(this.id);
        if (id) id.remove();

        /////////////affichage de la frame

        this.display();

        ///////////////////////////////////deplacement de chaque frame

        this.positionX += this.deplacementX;
        this.positionY += this.deplacementY;

        let centerX = this.positionX + this.width / 2;
        let centerY = this.positionY + this.height / 2;

        //////////////////comportement dans son espace

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
        } else if (centerY - this.height * 2 > 1000) {
          let toto = document.getElementById(this.id);
          toto.remove();
        } else {
          this.deplacementX;
        }

        ///////colision invader avec ships

        if (
          centerX > spaceShips.positionX &&
          centerX < spaceShips.positionX + spaceShips.width &&
          centerY > spaceShips.positionY &&
          centerY < spaceShips.positionY + spaceShips.height
        ) {
          spaceShips.couleur = "./media/bang.png";
          spaceShips.display();
          let soundDestruction = document.querySelector(".soundDestruction");
          soundDestruction.play();
          gameOver = true;
          let tata = document.getElementById(this.id);
          tata.remove();
          let modaleVar = document.querySelector(".modaleLoose");
          modaleVar.style.opacity = "1";
          let soundGame = document.querySelector(".soundGame");
          soundGame.pause();
          let soundStart = document.querySelector(".soundStart");
          soundStart.play();
          let scoreFinale = document.querySelector(".scoreFinal");
          scoreFinale.innerText = `Score : ${score}`;

          clearInterval(invaderIntervale);
          clearInterval(deplacementInterval);
        }

        //////////////colision invader avec rocket
        if (
          centerX > rocket.positionX &&
          centerX < rocket.positionX + rocket.width &&
          centerY > rocket.positionY &&
          centerY < rocket.positionY + rocket.height
        ) {
          let soundExplosion = document.querySelector(".soundExplosion");
          soundExplosion.play();
          rocket.positionX = spaceShips.positionX;
          rocket.positionY = spaceShips.positionY;
          this.couleur = "./media/bang.png";
          let soundFire = document.querySelector(".soundFire");
          soundFire.play();
          score += 10;
          let scoreText = document.querySelector(".scoreCourant");
          scoreText.innerText = `Score : ${score}`;
          window.localStorage.setItem("scoreCourant", score);
          setTimeout(() => {
            clearInterval(deplacementInterval);
            let test = document.getElementById(this.id);
            test.remove();
          }, 400);
        }

        //////////////////vitesse entre chaque frame
      }, randomNumberMinMax(25, 50));
    }
  }

  /////////////////////////////
  ////////////////////////////////////
  ////////////////////////////////Classe Rocket

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

    //////////////////deplacement de la rocket

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
          let soundFire = document.querySelector(".soundFire");
          soundFire.play();
        }
      }, 50);
    }
  }

  /////////////
  /////////////
  //////////////taille du conteneur

  let container = document.querySelector(".container");
  let positionContainer = container.getBoundingClientRect();
  let containerWidth = positionContainer.right;

  /////////////////////////////
  /////////////////////////////////
  ///////////////////////////////////spaceShips

  /////position de depart ships
  let shipsStartPositionX =
    (positionContainer.right + positionContainer.left) / 2;
  let shipsStartPositionY = positionContainer.bottom;

  /////creation de ships
  let spaceShips = new Forme(
    150,
    150,
    shipsStartPositionX,
    shipsStartPositionY,
    "./media/red.png",
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
        spaceShips.positionX += 15;
      }
    }

    if (e.keyCode == 37) {
      if (
        spaceShips.positionX >
        positionContainer.left + spaceShips.width / 2
      ) {
        spaceShips.positionX -= 15;
      }
    }

    /////////////////////effacement image et nouvelle affichage

    let id2 = document.getElementById("2");
    id2.remove();

    spaceShips.display();
  });

  /////////////////////////////
  /////////////////////////////////
  ///////////////////////////////////randomNumber

  function randomNumber(number) {
    return Math.floor(Math.random() * number);
  }

  function randomNumberMinMax(Min, Max) {
    return Math.floor(Math.random() * (Max - Min) + Min);
  }

  ////////////////////////////////
  /////////////////////////////////
  //////////////////////////////// invader

  ///////function pour directionX l'invader

  function plusOuMoin() {
    var randomNum = randomNumber(20);

    if (randomNum < 10) {
      return -10;
    } else {
      return 10;
    }
  }

  //////////////// fonction instance invader
  function creatInvader() {
    let invader = new Invader(
      90,
      90,
      randomNumber(positionContainer.right),
      -50,
      "./media/spaceCraft.png",
      "40px",
      randomNumber(10000),
      plusOuMoin(),
      10,
      "none"
    );
    invader.display();
    invader.deplacement();
  }

  //////////////////// creation répeté d'invader
  let invaderIntervale = setInterval(creatInvader, 1000);

  ///////////////////instance rocket
  let rocket = new Rocket(
    90,
    150,
    spaceShips.positionX,
    spaceShips.positionY,
    "./media/bullet.png",
    "none",
    1,
    0,
    25,
    "none"
  );

  rocket.display();
  rocket.deplacementV();
  let soundFire = document.querySelector(".soundFire");
  soundFire.play();
}
