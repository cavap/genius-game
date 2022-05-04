const gameSpeed = 1000;
const opacityIntensity = 0.5, clearOpacity = 1;
let gameSequence;
let userSequence;
let allowClick;

const colorsEnum = {
    green: 0,
    red: 1,
    yellow: 2,
    blue: 3
}

function getKeyByValue(value){
    for(key in colorsEnum){
        if(colorsEnum[key] == value) return key;
    }
}





function checkClickOnRightColor(id){
    return id === gameSequence[userSequence.length - 1];
}

function blinkFullGrid(i = 0){
    if(i < 4){
        document.getElementById('green').style.opacity = opacityIntensity;
        document.getElementById('red').style.opacity = opacityIntensity;
        document.getElementById('yellow').style.opacity = opacityIntensity;
        document.getElementById('blue').style.opacity = opacityIntensity;
        setTimeout(() => {
            document.getElementById('green').style.opacity = clearOpacity;
            document.getElementById('red').style.opacity = clearOpacity;
            document.getElementById('yellow').style.opacity = clearOpacity;
            document.getElementById('blue').style.opacity = clearOpacity;
            setTimeout(() => blinkFullGrid(i + 1), gameSpeed / 5);
        }, gameSpeed / 5);
    }
}

function endGame(){
    blinkFullGrid();
    document.getElementById('buttonStart').disable = false;
    allowClick = false;
}

function setupNextLevel(){
    document.getElementById('currentScore').textContent = userSequence.length;
    bestScore = document.getElementById('bestScore');
    if(userSequence.length > parseInt(bestScore.textContent)) bestScore.textContent = userSequence.length;
    setTimeout(() => nextLevel(), gameSpeed * 2);
    userSequence = [];
    allowClick = false;
}

function showUserClick(id){
    document.getElementById(id).style.opacity = opacityIntensity;
    setTimeout(() => {
        document.getElementById(id).style.opacity = clearOpacity;
    }, gameSpeed / 2);
}

function handleClick(id) {
    if(allowClick){
        userSequence.push(id);
        if(checkClickOnRightColor(id)){
            showUserClick(id);
        } else {
            endGame();
            return;
        }

        if(userSequence.length === gameSequence.length){
            setupNextLevel();
        }
    }
}

function showGameSequence(i = 0){
    if(i < gameSequence.length){
        document.getElementById(gameSequence[i]).style.opacity = opacityIntensity;
        setTimeout(() => {
            document.getElementById(gameSequence[i]).style.opacity = clearOpacity;
            setTimeout(() => showGameSequence(i + 1), gameSpeed / 5);
        }, gameSpeed);
    } else {
        allowClick = true;
    }
    return false;
}

function getRandomNumber(){
    return Math.floor(Math.random() * 4);
}

function addToGameSequence(){
    gameSequence.push(getKeyByValue(getRandomNumber()));
}

function nextLevel(){
    addToGameSequence();
    showGameSequence()
}

function startGame(){
    if(!document.getElementById('buttonStart').disable){
        gameSequence = [];
        userSequence = [];
        document.getElementById('buttonStart').disable = true;
        document.getElementById('currentScore').textContent = 0;
        allowClick = false;
        nextLevel();
    }
}