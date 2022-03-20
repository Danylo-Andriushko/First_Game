let startBtn = document.querySelector('#start')
let screens = document.querySelectorAll('.screen')
let timeList = document.querySelector('#time-list')
let timeEl = document.querySelector('#time')
let board = document.querySelector('#board')
let time = 0
let score = 0
let colors = [ '#fa8072', '#ff1493', '#ff0000',
            '#ffff00','#00ff00','#008000',
            '#00ffff','#1e90ff','#0000ff',
            '#483d8b'
             ]
startBtn.addEventListener('click', (event)=>{
event.preventDefault()
screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) =>{
    if(event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time')) 
        screens[1].classList.add('up')
        startGame()    
    }
        
})
board.addEventListener('click',(event)=>{
    if(event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame(){
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}
function decreaseTime(){
    if(time===0){
        finishGame()
    }else{
        let current = --time
    if(current < 10){
        current = `0${current}`
    }
    setTime(current)
    }
    
}

function setTime(value){
    timeEl.innerHTML = `00:${value}`
}

function finishGame(){
    timeEl.parentNode.remove()
board.innerHTML = `<h1>Your score: <span class = "primary">${score}</span></h1>`
}

function getRandomColor(){
    let index =  Math.floor(Math.random() * colors.length)
     return colors[index]
 }

function setColor(element){
    let color = getRandomColor()
    element.style.background = color
}

function createRandomCircle(){
    let circle = document.createElement('div')
    let size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    let x = getRandomNumber(0, width - size)
    let y = getRandomNumber(0, height - size)
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.addEventListener('click', setColor(circle))
    board.append(circle)
}

function getRandomNumber(max, min){
    return Math.round(Math.random()*(max - min) + min)
}

