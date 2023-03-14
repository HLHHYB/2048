//定义数字2-4096共计12种背景颜色
let colors = new Array("#FFDE00", "#FFAB00", "#FF7800", "#FF2500", "#FF0048", '#F700FF', "#5900FF", "#0033FF",
	"#00A1FF", "#00FF6B", "#76FF00", "#EDFF00");

//设置游戏地图的根标签id
let root = "map";
//方块的初始颜色
let bgForInit = "#886C64";
//得分
let score = 0;

/**
 * 根据数值设置方块的颜色和内容
 *
 */
function setColor(){
    for (let i = 0; i < colors.length; i++) {
        colors[i] = {
            "color": colors[i],
            "value": Math.pow(2, i + 1)
        };
    }
    // console.log(colors);
}
// setColor()
/**
 * 设置方块的初始状态，即所有方块为空
 */
function setBlockState() {
    let maps = document.querySelectorAll(".map>div>div");
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            maps[i * 4 + j].innerHTML = "";
            maps[i * 4 + j].style.backgroundColor = bgForInit;
            maps[i * 4 + j].setAttribute("state", 0);
        }
    }
}
// setBlockState()


/**
 * 地图中随机生成2或4，生成随机数求余，利用结果对应位置和数字
 */
function randomBlock() {
    let maps = document.querySelectorAll(".map>div>div");
    let random = Math.floor(Math.random() * 16);
    let random2 = Math.floor(Math.random() * 2);
    if (maps[random].innerHTML == "") {
        if (random2 == 0) {
            maps[random].innerHTML = 2;
            maps[random].style.backgroundColor = colors[0].color;
        }
        else {
            maps[random].innerHTML = 4;
            maps[random].style.backgroundColor = colors[1].color;
        }
    }
    else {
        randomBlock();
    }
}
// randomBlock()

/**
 * 计算分数，把所有方块的值相加，显示在分数标签中
 */
function countScore() {
    let maps = document.querySelectorAll(".map>div>div");
    for (let i = 0; i < maps.length; i++) {
        score += (Number)(maps[i].innerHTML);
    }
    document.querySelector(".realScore").innerHTML = score;
    // console.log(score)
}
// countScore();

/**
 * 游戏结束判断（无空闲方块且相邻无合并可能）
 */
function isGameOver() {
    let maps = document.querySelectorAll(".map>div>div");
    //这里的意思是判断每一个方块是否为空
    for (let i = 0; i < maps.length; i++) {
        if (maps[i].innerHTML == "") {
            return false;
        }
    }
    //这里的意思是判断每一行的每一个方块的右边和下面的方块是否相等
    for (let i = 0; i < maps.length; i++) {
        //i % 4 != 3的意思是判断最后一列的方块不用判断右边的方块
        if (i % 4 != 3) {
            //maps[i].innerHTML == maps[i + 1].innerHTML的意思是判断每一个方块的右边的方块是否相等
            if (maps[i].innerHTML == maps[i + 1].innerHTML) {
                return false;
            }
        }
        //i < 12的意思是判断最后一行的方块不用判断下面的方块
        if (i < 12) {
            //maps[i].innerHTML == maps[i + 4].innerHTML的意思是判断每一个方块的下面的方块是否相等
            if (maps[i].innerHTML == maps[i + 4].innerHTML) {
                return false;
            }
        }
    }
    return true;
}

/**
 * 上下左右四个方向的移动
 */
function moveUp() {
    let maps = document.querySelectorAll(".map>div>div");
    // console.log(maps)
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            // console.log(maps[i * 4 + j].innerHTML)
            if (maps[i * 4 + j].innerHTML == "") {
                for (let k = i + 1; k < 4; k++) {
                    if (maps[k * 4 + j].innerHTML != "") {
                        maps[i * 4 + j].innerHTML = maps[k * 4 + j].innerHTML;
                        maps[i * 4 + j].style.backgroundColor = maps[k * 4 + j].style.backgroundColor;
                        maps[k * 4 + j].innerHTML = "";
                        maps[k * 4 + j].style.backgroundColor = bgForInit;
                        break;
                    }
                }
            }
        }
    }
}
// moveUp()
function moveDown() {
    let maps = document.querySelectorAll(".map>div>div");
    for (let i = 3; i >= 0; i--) {
        for (let j = 0; j < 4; j++) {
            if (maps[i * 4 + j].innerHTML == "") {
                for (let k = i - 1; k >= 0; k--) {
                    if (maps[k * 4 + j].innerHTML != "") {
                        maps[i * 4 + j].innerHTML = maps[k * 4 + j].innerHTML;
                        maps[i * 4 + j].style.backgroundColor = maps[k * 4 + j].style.backgroundColor;
                        maps[k * 4 + j].innerHTML = "";
                        maps[k * 4 + j].style.backgroundColor = bgForInit;
                        break;
                    }
                }
            }
        }
    }
}
// moveDown()
function moveLeft() {
    let maps = document.querySelectorAll(".map>div>div");
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (maps[i * 4 + j].innerHTML == "") {
                for (let k = j + 1; k < 4; k++) {
                    if (maps[i * 4 + k].innerHTML != "") {
                        maps[i * 4 + j].innerHTML = maps[i * 4 + k].innerHTML;
                        maps[i * 4 + j].style.backgroundColor = maps[i * 4 + k].style.backgroundColor;
                        maps[i * 4 + k].innerHTML = "";
                        maps[i * 4 + k].style.backgroundColor = bgForInit;
                        break;
                    }
                }
            }
        }
    }
}
// moveLeft()
function moveRight() {
    let maps = document.querySelectorAll(".map>div>div");
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
            if (maps[i * 4 + j].innerHTML == "") {
                for (let k = j - 1; k >= 0; k--) {
                    if (maps[i * 4 + k].innerHTML != "") {
                        maps[i * 4 + j].innerHTML = maps[i * 4 + k].innerHTML;
                        maps[i * 4 + j].style.backgroundColor = maps[i * 4 + k].style.backgroundColor;
                        maps[i * 4 + k].innerHTML = "";
                        maps[i * 4 + k].style.backgroundColor = bgForInit;
                        break;
                    }
                }
            }
        }
    }
}
// moveRight()

/**
 * 设置方块的背景颜色
 */
function setBgColor() {
    let maps = document.querySelectorAll(".map>div>div");
    for (let i = 0; i < maps.length; i++) {
        switch (maps[i].innerHTML) {
            case "":
                maps[i].style.backgroundColor = bgForInit;
                break;
            case "2":
                maps[i].style.backgroundColor = "#FFDE00";
                break;
            case "4":
                maps[i].style.backgroundColor = "#FFAB00";
                break;
            case "8":
                maps[i].style.backgroundColor = "#FF7800";
                break;
            case "16":
                maps[i].style.backgroundColor = "#FF2500";
                break;
            case "32":
                maps[i].style.backgroundColor = "#FF0048";
                break;
            case "64":
                maps[i].style.backgroundColor = "#F700FF";
                break;
            case "128":
                maps[i].style.backgroundColor = "#5900FF";
                break;
            case "256":
                maps[i].style.backgroundColor = "#0033FF";
                break;
            case "512":
                maps[i].style.backgroundColor = "#00A1FF";
                break;
            case "1024":
                maps[i].style.backgroundColor = "#33b5e5";
                break;
            case "2048":
                maps[i].style.backgroundColor = "#00FF6B";
                break;
            case "4096":
                maps[i].style.backgroundColor = "#76FF00";
                break;
        }
    }
}

/**
 * 上下左右四个方向的合并
 */
function mergeUp() {
    let maps = document.querySelectorAll(".map>div>div");
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (maps[i * 4 + j].innerHTML != "") {
                for (let k = i + 1; k < 4; k++) {
                    if (maps[k * 4 + j].innerHTML != "") {
                        if (maps[i * 4 + j].innerHTML == maps[k * 4 + j].innerHTML) {
                            maps[i * 4 + j].innerHTML = parseInt(maps[i * 4 + j].innerHTML) * 2;
                            maps[k * 4 + j].innerHTML = "";
                            setBgColor();
                        }
                        break;
                    }
                }
            }
        }
    }
}
// mergeUp()
function mergeDown() {
    let maps = document.querySelectorAll(".map>div>div");
    for (let i = 3; i >= 0; i--) {
        for (let j = 0; j < 4; j++) {
            if (maps[i * 4 + j].innerHTML != "") {
                for (let k = i - 1; k >= 0; k--) {
                    if (maps[k * 4 + j].innerHTML != "") {
                        if (maps[i * 4 + j].innerHTML == maps[k * 4 + j].innerHTML) {
                            maps[i * 4 + j].innerHTML = parseInt(maps[i * 4 + j].innerHTML) * 2;
                            maps[k * 4 + j].innerHTML = "";
                            setBgColor();
                        }
                        break;
                    }
                }
            }
        }
    }
}
// mergeDown()
function mergeLeft() {
    let maps = document.querySelectorAll(".map>div>div");
    //遍历每一个格子
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            //如果当前格子不为空
            if (maps[i * 4 + j].innerHTML != "") {
                //遍历当前格子右边的格子
                for (let k = j + 1; k < 4; k++) {
                    //如果右边的格子不为空
                    if (maps[i * 4 + k].innerHTML != "") {
                        //如果当前格子和右边的格子相等
                        if (maps[i * 4 + j].innerHTML == maps[i * 4 + k].innerHTML) {
                            //合并
                            maps[i * 4 + j].innerHTML = parseInt(maps[i * 4 + j].innerHTML) * 2;
                            maps[i * 4 + k].innerHTML = "";
                            setBgColor();
                        }
                        break;
                    }
                }
            }
        }
    }
}
// mergeLeft()
function mergeRight() {
    let maps = document.querySelectorAll(".map>div>div");
    //遍历每一个格子
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
            //如果当前格子不为空
            if (maps[i * 4 + j].innerHTML != "") {
                //遍历当前格子左边的格子
                for (let k = j - 1; k >= 0; k--) {
                    //如果左边的格子不为空
                    if (maps[i * 4 + k].innerHTML != "") {
                        //如果当前格子和左边的格子的值相等
                        if (maps[i * 4 + j].innerHTML == maps[i * 4 + k].innerHTML) {
                            //将当前格子的值*2
                            maps[i * 4 + j].innerHTML = parseInt(maps[i * 4 + j].innerHTML) * 2;
                            //将左边的格子的值置为空
                            maps[i * 4 + k].innerHTML = "";
                            setBgColor();
                        }
                        break;
                    }
                }
            }
        }
    }
}
// mergeRight()


/**
 * 游戏初始化
 */
function init() {
    setBlockState();
    setColor();
    randomBlock();
    countScore();
}

/**
 * 赢得游戏
 */
function isWin() {
    let maps = document.querySelectorAll(".map>div>div");
    for (let i = 0; i < maps.length; i++) {
        if (maps[i].innerHTML == 2048) {
            return true;
        }
    }
    return false;
}


/**
 * 开始游戏（游戏初始化，关联移动事件
 */
let flag = true;
function GameBegin() {
    if(flag) {
        flag = false;
        document.querySelector(".beginButton").innerHTML = "重新开始";
        init();
        document.onkeydown = function (e) {
            switch (e.keyCode) {
                case 37:
                    moveLeft();
                    mergeLeft();
                    break;
                case 38:
                    moveUp();
                    mergeUp();
                    break;
                case 39:
                    moveRight();
                    mergeRight();
                    break;
                case 40:
                    moveDown();
                    mergeDown();
                    break;
            }
            randomBlock();
            countScore();
            if (isGameOver()) {
                alert("游戏结束");
                window.location.reload();
            }
            if (isWin()) {
                alert("恭喜你，你赢了");
                window.location.reload();
            }
        }
    }
    else{
        if (isGameOver()) {
            alert("游戏结束");
            window.location.reload();
        }
        if (isWin()) {
            alert("恭喜你，你赢了");
            window.location.reload();
        }
        else{
            confirm("游戏是否重新开始？");
            if (confirm)
            {
                window.location.reload();
            }
        }
    }
}