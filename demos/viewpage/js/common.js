function my$(id) {
    return document.getElementById(id);
};

function myNames(label) {
    return document.getElementsByTagName(label);
};

function myClass(name) {
    return document.getElementsByClassName(name);
};

//获取任意父级元素的第一个子级元素
function getFirstElementChild(element) {
    if (element.firstElementChild) {
        return element.firstElementChild
    } else {
        var node = element.firstChild;
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        };
        return node;
    };
};

//获取任意父级元素的最后一个子元素
function getLastElementChild(element) {
    if (element.lastElementChild) {
        return element.lastElementChild
    } else {
        var node = element.lastChild;
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        };
        return node;
    };
};
//获取一个元素设置任意属性
function getStyle(element, attr) {
    return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] :
        element.currentStyle(attr);

};

//获取鼠标滚动侧边栏左侧和上侧出去的值
function getScroll(element) {
    return {
        left: window.pageYOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        top: window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    };

};

//匀速动画移动函数
function evenAnimate(element, target) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        //当前位置
        var current = element.offsetLeft;
        //每次移动的距离
        var step = 10;
        //判断当前位置和目标位置决定方向
        step = current < target ? step : -step;
        //当前移动到的位置
        current += step;
        if (Math.abs(current - target) > Math.abs(step)) {
            element.style.left = current + "px";
        } else {
            clearInterval(element.timeId);
            element.style.left = target + "px";
        };
    }, 10)
}

//变速动画移动函数
function changeAnimate(element, target) {
    clearInterval(element.timeId)
    element.timeId = setInterval(function () {
        var flag = true;
        //当前位置
        var current = element.offsetLeft;
        //移动速度
        var step = (target - current) / 10;
        //判断是否大于0,大于0向上取整否则向下
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current += step; //移动后的值
        element.style.left = current + "px";
        if (current != target) {
            flag = false;
        } else {
            clearInterval(element.timeId);
        };
        //    step=step>0?Math.ceil(step):Math.floor(step);
        //    current+=step;
        //    if(Math.abs(current-target)>Math.abs(step)){
        //        element.style.left=current+"px";
        //    }else{
        //        clearInterval(element.timeId);
        //        element.style.left=target+"px";
        //    };
    }, 10);
};

//缓动动画移动函数并增加多个属性=====>终极版
function gradualAnimate(element, json, fn) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var flag = true; //假设此时全部到达指定位置
        for (var attr in json) {
            if (attr == "opacity") {
                var current = getStyle(element, attr) * 100;
                //目标位置
                var target = json[attr] * 100;
                //移动步数
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step; //移动后的值
                element.style[attr] = current / 100;
            } else if (attr == "zIndex") {
                element.style[attr] = json[attr];
            } else { //普通属性
                //当前位置
                var current = parseInt(getStyle(element, attr));
                //目标位置
                var target = parseInt(json[attr]);
                //移动步数
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step; //移动后的值
                element.style[attr] = current + "px";
                if (current != target) {
                    flag = false;
                    if (fn) {
                        fn();
                    };
                };
            };
        };
        if (flag) {
            clearInterval(element.timeId);
        };
    }, 10);
};