    //蛇对象
    (function(){
        var elements=[];
        function Snake(width,height,direction){
             this.width=width||20;//宽
             this.height=height||20;//高
             //存储没个小蛇的身体部位
             this.body=[
                   {x:3,y:2,color:"red"},//头
                   {x:2,y:2,color:"yellow"},//身体
                   {x:1,y:2,color:"yellow"},//身体
                   {x:1,y:2,color:"yellow"},//身体
             ];
            this.direction=direction||"right";
        };
        //初始化小蛇
        Snake.prototype.init=function(map){
            remove();
            //循环遍历蛇的每个部位,并创建
            for(var i=0;i<this.body.length;i++){
                //获取蛇的每个部位,并初始化属性
                var getpro=this.body[i];
                //创建div
                var div=document.createElement("div");
                //把元素添加到地图上
                map.appendChild(div);
                //设置样式
                div.style.position="absolute";
                div.style.width=this.width+"px";
                div.style.height=this.height+"px";
                div.style.left=getpro.x*this.width+"px";
                div.style.top=getpro.y*this.height+"px";
                div.style.backgroundColor=getpro.color;
                //把小蛇存储到数组中,用于删除这个元素
                elements.push(div);
            };
        };
        //小蛇移动的方法
       Snake.prototype.move=function(food,map){
            var i=this.body.length-1;
            //改变小蛇的位置坐标
            for(;i>0;i--){
              this.body[i].x=this.body[i-1].x;
              this.body[i].y=this.body[i-1].y;
            }
            //判断方向改变小蛇的头
            switch(this.direction){
                case "right":
                    this.body[0].x+=1;
                    break;
                case "left":
                    this.body[0].x-=1;
                    break;
                case "top":
                    this.body[0].y-=1;
                    break;
                case "bottom":
                    this.body[0].y+=1;
                    break;
            };
        var headX=this.body[0].x*this.width;
        var headY=this.body[0].y*this.height;
        if(headX==food.x&&headY==food.y){
            var last=this.body[this.body.length-1];
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            });
            food.init(map);
        };
        };

        //私有方法删除多余的蛇部分
        function remove(){
            //获取蛇的身体部分
            var i=elements.length-1;
            //循环获取蛇元素
            for(;i>=0;i--){
                //获取没个蛇元素
                var ele=elements[i];
                //从父级元素中删除元素
                ele.parentNode.removeChild(ele);
                //从数组中删除这个元素
                elements.splice(i,1);
            };
        };
        
     //把小蛇暴露给外部
     window.Snake=Snake;
    }());