// Enemies our player must avoid
const allEnemies = [];



//selects the life class elements and adds them in an array
let lifes = document.querySelectorAll('.life');//select all hearts
let lifesList = Array.from(lifes); //get all heart and add them to array 
let life = 3;//life number



class Enemy {

    constructor(x, y, speed) {
        const sprite = 'images/enemy-bug.png';
        this.y = y;
        this.x = x;
        this.speed = speed;
        this.sprite = sprite; //enemy image
        this.height = 70; // enemy's height
        this.width = 70; //enemy's width

        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images

        /* allEnemies.push(this); */
    };



    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        //regular speed from the begining
        this.x = this.x + (this.speed * dt);
        if (this.x > 505) {
            this.x = -100;


        //after 1 min the bugs speed will increase
        }
        if ((min === 2 && sec === 59) || (min === 1 && sec === 59)) {
            this.speed = this.speed + 1;

        }

        //collision detector  from https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection

        allEnemies.forEach(function (enemy) {
            if (enemy.x < player.x + player.width &&
                enemy.x + enemy.width > player.x &&
                enemy.y < player.y + player.height &&
                enemy.height + enemy.y > player.y) {
                player.x = 200;
                player.y = 390;
                life--;
                countLifes();
                console.log('collision detected!');//debbuging 
            }
        })

        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
    };

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var points_value = 0;
let points = document.querySelector('.points');
let modal_points = document.querySelector('.modal-score');


class Player {
    constructor(x, y) {

        const sprite = 'images/char-boy.png';
        this.x = x;//x position
        this.y = y;// y position
        this.sprite = sprite;
        this.height = 70; //player's height
        this.width = 70; //player's width

    }


    update(dt) {

        //If statement for Score counting  if Player reach y position points will increased after 0.5 sec.
        if (this.y <= -10) {

            setTimeout(startBack => {
                this.y = 390;
                points_value += 15;
                points.innerText = "Score :" + points_value;
            }, 500);

        }

    };

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    handleInput(e) {

        // Switch method to handle key inputs and get reactions to them

        switch (e) {
            case 'left':
                if (this.x > 0) // for checking player position to not disapear outside of the field
                {
                    this.x = this.x - 100
                    console.log(e);
                }
                break;

            case 'up':
                if (this.y > -10) // for checking player position to not disapear outside of the field
                {
                    this.y = this.y - 80
                    console.log(e);
                }
                break;

            case 'right':
                if (this.x < 400) // for checking player position to not disapear outside of the field
                {
                    this.x = this.x + 100
                    console.log(e);
                }
                break;

            case 'down':
                if (this.y < 390) // for checking player position to not disapear outside of the field
                {
                    this.y = this.y + 80
                    console.log(e);
                }
                break;
        }
    };

}

//Creating objects of Enemies and Player

const player = new Player(200, 390);
allEnemies.push(new Enemy(0, 140, 75));
allEnemies.push(new Enemy(0, 60, 40));
allEnemies.push(new Enemy(0, 220, 105));
allEnemies.push(new Enemy(0, 140, 85));
allEnemies.push(new Enemy(0, 220, 95));
allEnemies.push(new Enemy(0, 60, 68));
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };


    player.handleInput(allowedKeys[e.keyCode]);
});
//if collision detected  life image is deleted
function countLifes() {
    if (life === 2) {
        lifesList[2].classList.add('hide');
    } else if (life === 1) {
        lifesList[1].classList.add('hide');
    } else if (life === 0) {
        lifesList[0].classList.add('hide');
    }
}


let counter;
let sec = 0;
let min = 3;
// for time counting 
function timeCount() {
    let timer = document.querySelector('.time');


    counter = setInterval(function () {
        //if the 3 minutes expired, stops the timer and calls modal
        if (min === 0 && sec === 0 || life === 0) {
           //Shows modal when times ends
            (function () {
                modal.style.display = "block";
                points.style.display = "none";
                modal_points.innerText = `Your Score :${points_value} `;

            })();

            clearInterval(counter, 1000);

        } else { //else continues counting down
            sec--;
        };
        if (sec < 0) {
            min--;
            sec = 59;
        };
        timer.innerText = min + 'm ' + sec + 's';
    }, 1000);
}

timeCount();

// MODAL

 function reset() {
     // noop
     location.reload(true);
 }

// Get the modal
const modal = document.getElementById('myModal');


// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    reset();
    modal.style.display = "none";
}

// Restart button 
const restartBtn = document.getElementById('restart-icon');
restartBtn.onclick = function() {
     reset();
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
         reset();
        modal.style.display = "none";
    }
}


 

