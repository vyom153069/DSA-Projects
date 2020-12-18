

// canvas is used to draw graphics

function init(){
    
    canvas=document.getElementById('mycanvas');
    W=canvas.width=1000;
    H=canvas.height=1000;
    pen=canvas.getContext('2d');
    cs=67;
    food=getRandomFood();
    game_over=false;
    score=0;


    food_img=new Image();
    food_img.src="./assets/apple.png";

    trophy=new Image();
    trophy.src="./assets/trophy.png";
    snake={
        init_len:5,
        color:"blue",
        cells:[],
        direction:"right",
        createSnake:function(){
            for(var i=this.init_len;i>0;i--){
                this.cells.push({x:i,y:0})
            }
        },
        drawSnake:function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle=this.color; 
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3)
            }
        },
        updateSnake:function(){

            var headX=this.cells[0].x;
            var headY=this.cells[0].y;

            if(headX==food.x&&headY==food.y){
                food=getRandomFood();
                score++;
            }else{
                this.cells.pop();
            }
            
            var X,Y;
            if(this.direction=="right"){
                X=headX+1;
                Y=headY;
            }
            else if(this.direction=="left"){
                X=headX-1;
                Y=headY;
            }
            else if(this.direction=="up"){
                X=headX;
                Y=headY-1;
            }
            else if(this.direction=="down"){
                X=headX;
                Y=headY+1;
            }
            
            this.cells.unshift({x:X,y:Y});

            //out
            var last_x=Math.round(W/cs);
            var last_y=Math.round(H/cs);
            if(this.cells[0].y<0||this.cells[0].x<0||this.cells[0].y>last_y||this.cells[0].x>last_x){
                game_over=true;
            }
        }
    };
    snake.createSnake();
    function keyPressed(e){
        // console.log(e.key);
        if(e.key=="ArrowLeft"){
            snake.direction="left";
        }else if(e.key=="ArrowRight"){
            snake.direction="right";
        }else if(e.key=="ArrowDown"){
            snake.direction="down";
        }else if(e.key=="ArrowUp"){
            snake.direction="up";
        }
    }
    document.addEventListener('keydown',keyPressed);
    
}

function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

    pen.drawImage(trophy,18,20,cs,cs);
    pen.fillStyle="blue";
    pen.font="20px Roboto"
    pen.fillText(score,50,50);
}

function update(){
   snake.updateSnake();
   
}
function getRandomFood(){
    var foodX=Math.round(Math.random()*(W-cs)/cs);
    var foodY=Math.round(Math.random()*(H-cs)/cs);
    var food={
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food;
}
function gameLoop(){
    if(game_over==true){
        clearInterval(f); 
        alert("Game Over");
        return;
    }
    draw();
    update();
}

init();
var f=setInterval(gameLoop,100);
