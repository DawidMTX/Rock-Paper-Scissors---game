//Rules
const closeRulesBtn = document.querySelector('.rules__hands-close');
const openRulesBtn = document.querySelector('.rules__btn')
const rules = document.querySelector('.rules__hands');

//Buttons hands
const buttons = document.querySelectorAll('.buttons');
const handsImages = document.querySelector('.hands__images');
const handsSelected = document.querySelector('.hands__selected')

//Selected hands
const choicePlayer = document.querySelector('.player-choice .empty-place .choice');
const choiceComputer = document.querySelector('.computer-choice .empty-place .choice');

//score 
const points = document.querySelector('.score');
const nameOfResolutGame = document.querySelector('.result-game__name');

//play again
const playAgain = document.querySelector('.play-again')

//popup game-over and buttons
const gameOver = document.querySelector('.game-over')
const yesButton = document.querySelector('.yes');
const noButton = document.querySelector('.no');




const selected = {
    player: '',
    computer: '',
    score: 10,
}

const startGame = (e) => {
    selected.player = e.target.id;
    playerChoice(e.target.id);
    choiceComputer.innerHTML = '';
    nameOfResolutGame.textContent = '...';
    setTimeout(game, 500)
}

const game = () => {
    selected.computer = computerChoice();
    let resolut = resolutGame();
    score(resolut);
    points.textContent = selected.score;
    printResolut(resolut);
    if (selected.score === 0) {
        setTimeout(endGame, 700)
    }
}

const endGame = () => {
    gameOver.classList.add('show');
    yesButton.addEventListener('click', restartGame);
    noButton.addEventListener('click', thanksForTheGame)
}

const restartGame = () => {
    selected.player = '';
    selected.computer = '';
    selected.score = 10;
    gameOver.classList.remove('show');
    points.textContent = selected.score;
    backToSelectHands();
}

const thanksForTheGame = () => {
    document.querySelector('.name h2').textContent = 'Thank you for the game';
    document.querySelector('.name h3').textContent = 'See you later';
    document.querySelector('.yes-or-not-buttons').innerHTML = '';
}

const backToSelectHands = () => {
    handsImages.classList.remove('hands__images--hide');
    handsSelected.classList.add('hands__selected--hide');
    choicePlayer.classList.remove('shadow');
    startGame();
}

const score = (resolut) => {

    if (resolut === 'win') {
        selected.score++
    } else if (resolut === 'lose') {
        selected.score--
    } else { return }

}

const printResolut = (resolut) => {
    if (resolut === 'win') {
        nameOfResolutGame.textContent = 'you win';
    } else if (resolut === 'lose') {
        nameOfResolutGame.textContent = 'you lose'
    } else {
        nameOfResolutGame.textContent = 'draw'
    }
}

const resolutGame = () => {
    if (selected.player === selected.computer) {
        return 'draw'
    } else if (selected.player === 'rock' && selected.computer === 'scissors' ||
        selected.player === 'paper' && selected.computer === 'rock' ||
        selected.player === 'scissors' && selected.computer === 'paper') {
        return 'win'
    } else { return 'lose' }
}

const computerChoice = () => {

    let index = Math.floor(Math.random() * buttons.length);
    let name = buttons[index].id;
    choiceComputer.innerHTML = `<div class="${name}" id="${name}">
    <div class="background"><img class="image" src="images/icon-${name}.svg" alt="icon-${name}"></div>`;
    return name;
}

const playerChoice = (name) => {

    handsImages.classList.add('hands__images--hide');
    handsSelected.classList.remove('hands__selected--hide');
    choicePlayer.classList.add('shadow');
    choicePlayer.innerHTML = `<div class="${name}" id="${name}">
    <div class="background"><img class="image" src="images/icon-${name}.svg" alt="icon-${name}"></div>`;
}


//listener buttons
buttons.forEach(el => {
    el.addEventListener('click', (e) => { startGame(e) })
})

playAgain.addEventListener('click', backToSelectHands)





//function open and close rules
const showRules = () => {
    rules.classList.toggle('rules__hands--hide');
}
closeRulesBtn.addEventListener('click', showRules);
openRulesBtn.addEventListener('click', showRules)