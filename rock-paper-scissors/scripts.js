//Game data
let playerWins = 0;
let computerWins = 0;

let gameOver = false;
const choices = ['', 'Rock', 'Scissors', 'Paper'];

//DOM data
const results = document.querySelector('#result-text-container');
const buttonClicked = Array.from(document.querySelectorAll('.game-button'));
const playerWinsText = document.querySelector('#player-wins .score-number');
const computerWinsText = document.querySelector('#computer-wins .score-number');

buttonClicked.forEach(button => button.addEventListener('click', playRound));

//Make a restart button
const restartButton = document.createElement('button');
restartButton.addEventListener('click', resetGame);
restartButton.innerHTML = 'Restart';
restartButton.setAttribute('id', 'restart-button');


function getComputerChoice(){
    const computerChoice = Math.floor(Math.random() * 3);

    return computerChoice + 1;
}

function refreshScore(){
    playerWinsText.textContent = playerWins;
    computerWinsText.textContent = computerWins;
}

function resetGame(){
    const currResultText = document.createElement('p');
    gameOver = false;
    playerWins = 0;
    results.innerHTML = '';
    computerWins = 0;
    refreshScore();
}


function playRound(userChoice){
    if(gameOver){
        return;
    }

    const currResultText = document.createElement('p');

    //Extracts data key from button
    //1 - Rock
    //2 - Scissors
    //3 - Paper
    const playerKey = Number(this.getAttribute('data-key'));
    const computerKey = getComputerChoice();

    if(computerKey === ((playerKey % 3) + 1)){
        //Player wins;
        currResultText.textContent = "Player wins round! " + choices[playerKey] + ' beats ' + choices[computerKey];
        playerWins++;
    } else if (playerKey === ((computerKey % 3) + 1)){
        currResultText.textContent = "Computer wins round! " + choices[playerKey] + ' loses against ' + choices[computerKey];
        computerWins++;
        //Computer wins
    } else {
        //Tie   
        currResultText.textContent = "Tie! " + choices[playerKey] + ' ties with ' + choices[computerKey];
    }

    results.appendChild(currResultText);
    
    if(playerWins > 2 || computerWins > 2){
        const gameOverText = document.createElement('p');
        gameOver = true;
        if(playerWins > 2){
            gameOverText.textContent = 'Player wins the game!';

        } else if(computerWins > 2){
            gameOverText.textContent = 'Computer wins the game!';
        }
        gameOver = true;

        //Add button to restart game
        results.appendChild(restartButton);
       
    }

    refreshScore();
}







