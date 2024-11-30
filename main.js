const colorNames = [
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "purple",
    "pink",
    "black",
    "white",
    "brown",
    "turquoise",
    "silver",
    "gold",
    "maroon",
    "teal",
    "lavender",
    "mint",
    "coral",
];

let winingScore = 3;
let targetColor = "";
let score = 0;
let timer = 120;
let gameInterval, timerInterval;
let bgm = document.getElementById('bgmusic');
let correctMusic = document.getElementById('correctMusic');
let inCorrectMusic = document.getElementById('incorrectMusic')
let setRandomColor = () => {
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        let randomeIndex = Math.floor(Math.random() * colorNames.length);
        let randomColor = colorNames[randomeIndex];
        cell.style.backgroundColor = randomColor;
        cell.setAttribute('data-color', randomColor);
    })
}
let setTargetColor = () => {
    let randomeIndex = Math.floor(Math.random() * colorNames.length);
    targetColor = colorNames[randomeIndex];
    document.querySelector('#targetColor').innerHTML = targetColor.toUpperCase();
}
let formateTime = (second) => {
    let minutes = Math.floor(second / 60);
    let secs = second % 60;
    return `${minutes}:${secs < 10 ? "0" : ''}${secs}`;
}
let updateTimer = () => {
    timer--;
    document.querySelector('#timer').innerHTML = formateTime(timer);
    if(timer <= 0){
        endGame(false);
    }
}
let endGame = (iswin) => {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    let overlay = iswin ? document.getElementById('congratesOverlay') : document.getElementById('loosOverlay');
    overlay.style.display = 'block';
    if(iswin){
        document.getElementById('winMusic').play();
    }else{
        document.getElementById('loseMusic').play();
    }
}

let handleClick = (e) => {
    let clickedColor = e.target.getAttribute('data-color');
    console.log(clickedColor)
    if (clickedColor === targetColor) {
        score++;
        document.querySelector('#score').textContent = score;
        if (score === winingScore) {
            endGame(true)
        }
        setRandomColor();
        setTargetColor();
        correctMusic.play();
    } else {
        inCorrectMusic.play();
    }
}
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleClick);
})
// handleClick()
let initializeGame = () => {
    score = 0
    timer = 120;
    document.querySelector('#score').textContent = score;
    document.querySelector('#timer').textContent = formateTime(timer);
    document.getElementById('congratesOverlay').style.display = "none";
    document.getElementById('loosOverlay').style.display = "none";
    setRandomColor();
    setTargetColor();
    gameInterval = setInterval(setRandomColor, 2000)
    timerInterval = setInterval(updateTimer, 1000)
    // let bgm = document.getElementById('bgmusic');
    // bgm.play();
}
document.getElementById('restartOverlayWin').addEventListener('click', initializeGame);
document.getElementById('restartOverlaylose').addEventListener('click', initializeGame);
initializeGame();





