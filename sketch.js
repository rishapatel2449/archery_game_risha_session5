var splashScreen
var playbutton
var gameState="wait"
var bg
var bgl2
var player
var player_img
var board
var boardl2, board3;
var board_img, board3_img;
var arrow, arrow_img, arrowGroup;
var numberOfArrows=10;
var score=0;
var shootSound, checkPointSound, dieSound, winSound;

function preload(){
splashScreen=loadImage("assets/Archery2.gif")
bg=loadImage("assets/bg1.jpg")
player_img=loadImage("assets/archer.png")
board_img=loadImage("assets/board_2_img.png")
arrow_img = loadImage("assets/arrow.png")
bgl2=loadImage("assets/bg2.jpg")
board3_img=loadImage("assets/board3.png")
shootSound = loadSound("assets/shoot.mp3")
dieSound = loadSound("assets/die.mp3")
checkPointSound = loadSound("assets/checkpoint.mp3")
winSound = loadSound("assets/twinkle.mp3")
}

function setup(){
createCanvas(windowWidth,windowHeight)

playbutton = createImg("assets/p-.png");
playbutton.position(800, 360);
playbutton.size(350, 200);
playbutton.hide();

aboutbutton = createImg("assets/a-.png");
aboutbutton.position(590, 355);
aboutbutton.size(350, 200);
aboutbutton.hide();

   player = createSprite(480, 500);
   player.addImage("main", player_img);
   player.scale=0.7;
   player.visible = false;

   board = createSprite(1200, 600);
   board.addImage("board", board_img);
   board.scale=0.5;
   board.visible = false;
   //board.debug = true;
   board.setCollider("rectangle", 0, 0, 30, board.height);

   boardl2 = createSprite(1000, 600);
   boardl2.addImage("boardl2", board_img);
   boardl2.scale=0.5;
   boardl2.visible = false;
   //board.debug = true;
   boardl2.setCollider("rectangle", 0, 0, 30, board.height);

   board3 = createSprite(1150, 600);
   board3.addImage(board_img);
   board3.scale=0.5;
   board3.visible = false;
   //board.debug = true;
   board3.setCollider("rectangle", 0, 0, 30, board.height);
   

   arrowGroup = new Group();
}

function draw(){
    if (gameState=="wait"){
        background(splashScreen);
        playbutton.show();
        aboutbutton.show();

        aboutbutton.mousePressed(() => {
            playbutton.hide();
            aboutbutton.hide();
            gameState = "about";
    
        })
    }

        if (gameState == "about") {
            aboutgame();
        }
        playbutton.mousePressed(() => {
            aboutbutton.hide();
            playbutton.hide();
            gameState = "play";
    
        })

        if (gameState=="play"){
            background(bg);
            player.visible = true;
            board.visible = true;
            boardMovement();

            for (var i = 0; i < arrowGroup.length; i++) {
                if (board.isTouching(arrowGroup.get(i))) {
                    score += 5
                    arrowGroup.get(i).remove()
                }
            }


            if (score >= 20 && numberOfArrows > 0) {
                checkPointSound.play();
                gameState = "nextlevelinfo";
                arrowGroup.destroyEach();
                player.visible = false;
                board.visible=false;
    
            }

            if (gameState == "nextlevelinfo") {
                nextlevelpopup();
    
            }


            if(numberOfArrows==0){
                dieSound.play();
                lost();
                arrowGroup.destroyEach();
                player.visible=false;
                board.visible=false;
            }
        }

        if (gameState=="level2"){
            background(bgl2);
            player.y=400
            player.x=270
            player.visible = true;
            board3.visible = true;
            boardl2.visible = true;

            boardMovementl2();

            for (var i = 0; i < arrowGroup.length; i++) {
                if (boardl2.isTouching(arrowGroup.get(i))) {
                    score += 5
                    arrowGroup.get(i).remove()
                }
            }

            for (var i = 0; i < arrowGroup.length; i++) {
                if (board3.isTouching(arrowGroup.get(i))) {
                    score += 10
                    arrowGroup.get(i).remove()
                }
            }


            if (score >= 50 && numberOfArrows > 0) {
                gameState = "win";
                arrowGroup.destroyEach();
                player.visible = false;
                boardl2.visible=false;
    
            }

            if (gameState == "win") {
                winSound.play();
                win();
                arrowGroup.destroyEach();
                player.visible=false;
                board.visible=false;
                boardl2.visible=false;
                board3.visible=false;
    
            }


            if(numberOfArrows==0){
                dieSound.play();
                lost();
                arrowGroup.destroyEach();
                player.visible=false;
                board.visible=false;
                boardl2.visible=false;
                board3.visible=false;
    
            }

        }
    

drawSprites();

if (gameState == "play" || gameState == "level2") {
    fill("black");
    textSize(40);
    text("SCORE: " + score, 150, 50);

    fill("black");
    textAlign("center");
    textSize(40);
    text("Remaining Arrows : " + numberOfArrows, 1100, 50);



}
}

function aboutgame() {

    swal({
        title: "About Game === How to Play!!",
        text: "Play an archery game. Click spacebar to release the arrow!!!",
        textAlign: "center",
        imageUrl: "assets/splash.gif",
        imageSize: "200x200",
        confirmButtonText: "Lets Play",
        confirmButtonColor: "brown",
    },
        function () {
            gameState = "wait"
        }

    )


}

function spawnArrows() {

    arrow = createSprite(player.x + 10,440, 20, 20);
    arrow.addImage(arrow_img);
    arrow.scale = 0.2;

    //arrow.debug = true;
    arrow.setCollider("rectangle", 0, 0,arrow.width-20, arrow.height);
    arrow.velocityX = 20;

    arrow.depth = player.depth;
    player.depth = player.depth + 1;

    board.depth = arrow.depth;
    arrow.depth = arrow.depth + 1;


    arrowGroup.add(arrow);


}

function keyReleased() {
    if (keyCode === 32) {
        shootSound.play();
        if (numberOfArrows > 0) {
            spawnArrows();
            numberOfArrows -= 1;
        }
    }
}

function lost() {

    swal({
        title: "You LOST!",
        imageUrl: "assets/game_over_4.png",
        imageSize: "200x200",
        confirmButtonText: "Try Again",
        confirmButtonColor: "brown",
    },
        function () {
            window.location.reload();
        }

    )


}

function nextlevelpopup() {

    swal({
        title: "HURRAYY!! You have reached Level 2",
        text: "Time for the next level.\n Make a score of 50 to win the game!",
        imageUrl: "assets/level_up.png",
        imageSize: "200x200",
        confirmButtonText: "Let's Win!",
        confirmButtonColor: "brown",
    },
        function () {

            gameState = "level2"
        }

    )

}

function win() {

    swal({
        title: "You Won!",
        text: "Congratulations you won the game! \n ",
        imageUrl: "assets/You Win.png",
        imageSize: "200x200",
        confirmButtonText: "Restart",
        confirmButtonColor: "brown",
    },
        function () {
            window.location.reload();
        }
    )
}

function boardMovement()
{
    if (board.y == 600) {
        board.velocityY = -10;
        board.y -= 10;


    }

    if (board.y == 110) {
        board.y = board.y + 10;
        board.velocityY = 10;
    }
}

function boardMovementl2()
{
    if (boardl2.y == 600) {
        boardl2.velocityY = -7;
        boardl2.y -= 7;


    }

    if (boardl2.y == 110) {
        boardl2.y = boardl2.y + 7;
        boardl2.velocityY = 7;
    }

    if (board3.y == 600) {
        board3.velocityY = -10;
        board3.y -= 10;

    }

    if (board3.y == 110) {
        board3.y = board3.y + 10;
        board3.velocityY = 10;
    }
}