    //游戏对象
    (function(){
        var that=null;
        function Game(map){
         this.food=new Food();//食物对象
         this.snake=new Snake();//蛇对象
         this.map=map;//地图
         that=this;
        };
        //初始化游戏
        Game.prototype.init=function(){
            //初始化食物小方块
            this.food.init(this.map);
            //初始化蛇
            this.snake.init(this.map); 
            //自动移动小蛇
            this.runSnake(this.food,this.map);
            this.bindKey();
        };
        //自动移动小蛇
        Game.prototype.runSnake=function(food,map){
          var timeId= setInterval(function(){
                //移动小蛇
                 this.snake.move(food,map);
                 //初始化小蛇
                 this.snake.init(map);
                 var maxX=map.offsetWidth/this.snake.width;
                 var maxy=map.offsetHeight/this.snake.height;
                 var headX=this.snake.body[0].x; 
                 var headY=this.snake.body[0].y;
                 if(headX<0||headX>=maxX){
                  clearInterval(timeId);
                  alert("游戏结束");
                 }
                 if(headY<0||headY>=maxy){
                  clearInterval(timeId);
                  alert("游戏结束");
                 }
            }.bind(that),150);

        }
        //绑定按键
        Game.prototype.bindKey=function(){
            document.addEventListener("keydown",function(e){
             switch(e.keyCode){
                 case 65://a
                 case 37:this.snake.direction="left";break;//左
                 case 87://w
                 case 38:this.snake.direction="top";break;//上
                 case 68://d
                 case 39:this.snake.direction="right";break;//右
                 case 83://s
                 case 40:this.snake.direction="bottom";break;//下
             };
            }.bind(that),false);
        };
        window.Game=Game;
    }());