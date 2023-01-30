console.log('Welcome to Tic Tac Toe');
let music = new Audio('audio/music.mp3');
let audioTurn = new Audio('audio/click.mp3');
let audioGameOver = new Audio('audio/gameOver.wav');
let resetAudio = new Audio('audio/reset-audio.wav');
let turn = 'X';
let boxes = document.getElementsByClassName('box');
let reset = document.getElementById('reset');
let line = document.querySelector('.line');
const titleText = document.querySelector('.title-text');
const pauseMusic = document.querySelector('.pause-music');
let gameOver = false;

// Function to change the turn
const changeTurn = () => {
  return turn === 'X' ? 'O' : 'X';
};

pauseMusic.addEventListener('click', function () {
  if (pauseMusic.innerText === 'playMusic') {
    music.play();
    pauseMusic.innerText = 'pause music';
  } else if (pauseMusic.innerText === 'pause music') {
    music.pause();
    pauseMusic.innerText = 'playMusic';
  }
});

// Function to cheak for a win
const cheakWin = () => {
  let boxtext = document.getElementsByClassName('boxtext');
  let wins = [
    [0, 1, 2, 1, -7.5, 0],
    [2, 5, 8, 7, 0.5, 90],
    [6, 7, 8, 1, 7.5, 0],
    [0, 3, 6, -7, 0.5, 90],
    [3, 4, 5, 1, 0.5, 0],
    [1, 4, 7, 0, 0.5, 90],
    [0, 4, 8, 0, 0.5, 52],
    [2, 4, 6, 0, 0.5, 311],
  ];
  wins.forEach(e => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ''
    ) {
      titleText.innerHTML = boxtext[e[0]].innerText + ' WON';
      document.querySelector('.info').innerText = '';
      gameOver = true;
      // document
      //   .querySelector('.imgBox')
      //   .getElementsByTagName('img')[0].style.width = '300px';

      line.classList.remove('hidden');
      line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      audioGameOver.play();
    }
  });
  if (gameOver)
    setTimeout(() => {
      document.querySelector('.gameField').style.display = 'none';
    }, 500000000);
};

// Game Logics
music.addEventListener('canplaythrough', event => {
  /* the audio is now playable; play it if permissions allow */
  music.play();
});
Array.from(boxes).forEach(element => {
  let boxtext = element.querySelector('.boxtext');
  element.addEventListener('click', () => {
    if (boxtext.innerText === '') {
      boxtext.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      cheakWin();

      if (!gameOver) {
        document.getElementsByClassName('info')[0].innerText =
          'Turn for ' + turn;
      }
    }
  });
});
// console.log(Array.from(boxes));

/// Add onclick listener to reset button
reset.addEventListener('click', el => {
  el.preventDefault();
  resetAudio.play();
  let boxtexts = document.querySelectorAll('.boxtext');
  Array.from(boxtexts).forEach(element => {
    element.innerText = '';
  });
  turn = 'X';
  gameOver = false;
  titleText.innerHTML = 'Welcome to TicTacToe';
  document.getElementsByClassName('info')[0].innerText = 'Turn for ' + turn;
  document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width =
    '0';
  if (!gameOver) document.querySelector('.gameField').style.display = 'flex';
  line.classList.add('hidden');
});
