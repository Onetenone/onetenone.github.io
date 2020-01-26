    //小方块食物对象
    (function(){
        var elements=[];
        //小方块食物,有颜色,宽,高,横纵坐标
        function Food(width,height,color,x,y){
            this.width=width||20;//宽
            this.height=height||20;//高
            this.color=color||"green";//颜色
            this.x=x||0;//横坐标
            this.y=y||0;//纵坐标
        };
        //初始化小方块食物
        Food.prototype.init=function(map){
          //删除多余的小方块
          remove();
          //创建div
          var div=document.createElement("div");
          //把创建的div加入到地图map中
          map.appendChild(div);
          //设置div样式
          div.style.position="absolute";
          div.style.width=this.width+"px";
          div.style.height=this.height+"px";
          div.style.backgroundColor=this.color;
          this.x=parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
          this.y=parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
          div.style.left=this.x+"px";
          div.style.top=this.y+"px";
          //把小方块食物添加到数组中存储
          elements.push(div);
        };
        //私有方法删除小方块食物
        function remove(){
            for(var i=0;i<elements.length;i++){
                var ele=elements[i];
                //在父级元素中删除这个子元素
                ele.parentNode.removeChild(ele);
                //在数组中删除这个小方块
                elements.splice(i,1);
            };
        };
        //把Food暴露为外部使用
        window.Food=Food;
      }());