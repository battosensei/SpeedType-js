var canvas = document.getElementById('myCanvas')
var ctx = canvas.getContext('2d')
document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)
canvas.addEventListener('mousedown', getPosition, false)
canvas.addEventListener('mouseup', getPosition2, false)
document.addEventListener('mousemove', mouseMoveHandler, false)
var lP = false
var rP = false
var newWordTimer = 100
var fallingSpeed = 0.2
var hasStarted = false
var isViewingScores = false
var isOnStartScreen = true
var x = 0
var y = 0
var qButton = false
var wButton = false
var eButton = false
var rButton = false
var tButton = false
var yButton = false
var uButton = false
var iButton = false
var oButton = false
var pButton = false
var aButton = false
var sButton = false
var dButton = false
var fButton = false
var gButton = false
var hButton = false
var jButton = false
var kButton = false
var lButton = false
var zButton = false
var xButton = false
var cButton = false
var vButton = false
var bButton = false
var nButton = false
var mButton = false
var shiftButton = false
var enterButton = false
var backButton = false
var canPressAgain = true
var mouseIsDown = false
var gameScore = 0
var word = []
var wordString = ''
var fallingWords = []
var possibleWords
var wordsMissed = 0
var err1 = false
var err2 = false
var err3 = false

var scoresAreLoaded = false
var canLoadScores = true
var showScores = false
var enterGame = false
var endOfGame = false
var gameName = ''
var wordAddSpeed = 800

var snd = new Audio()
snd.src =
  'https://raw.githubusercontent.com/dgatewood/SpeedType/master/resources/pop.wav'

fetch(
  'https://raw.githubusercontent.com/dgatewood/SpeedType/master/resources/nouns.json'
)
  .then(function (response) {
    return response.json()
  })
  .then(function (myJson) {
    ///console.log(JSON.stringify(myJson));
    //possibleWords = JSON.stringify(myJson);
    possibleWords = myJson
    console.log(possibleWords)
  })

function mouseMoveHandler (e) {
  x = e.clientX - canvas.offsetLeft
  y = e.clientY - canvas.offsetTop
}

function getPosition2 (event) {
  mouseIsDown = false
}

function getPosition (event) {
  x = event.x - canvas.offsetLeft
  y = event.y - canvas.offsetTop
  mouseIsDown = true
  //console.log("Mouse is pressed");
  //alert("x:" + x + " y:" + y);
}

function FallingWord (x1, y1, w) {
  this.x = x1
  this.y = y1
  this.word = w
  this.wordArray = w.split('')
  this.isCorrect = true
  this.length = w.length
}

async function fetchUsers (endpoint) {
  const res = await fetch(endpoint)
  let data = await res.json()
  canLoadScores = false
  ctx.fillStyle = 'rgb(255, 89, 0)'
  ctx.fillRect(0, 0, 800, 600)

  ctx.fillStyle = 'rgb(89, 0, 255)'
  ctx.font = '60px Arial'
  ctx.fillText('Leaderboard', 100, 50)

  ctx.fillStyle = 'rgb(89, 0, 255)'
  ctx.font = '30px Arial'
  ctx.fillText('Place', 50, 190)

  ctx.fillStyle = 'rgb(89, 0, 255)'
  ctx.font = '30px Arial'
  ctx.fillText('Name', 200, 190)

  ctx.fillStyle = 'rgb(89, 0, 255)'
  ctx.font = '30px Arial'
  ctx.fillText('Score', 450, 190)

  line(0, 200, 800, 200, 'rgb(0, 255, 89)')
  line(150, 200, 150, 600, 'rgb(0, 255, 89)')
  line(400, 200, 400, 600, 'rgb(0, 255, 89)')

  //data = data.map(user => user.userName);
  for (var a = 0; a < data.length; a++) {
    ctx.fillStyle = 'rgb(89, 0, 255)'
    ctx.font = '30px Arial'
    ctx.fillText(a + 1, 50, 230 + a * 30)
  }
  for (var a = 0; a < data.length; a++) {
    ctx.fillStyle = 'rgb(89, 0, 255)'
    ctx.font = '30px Arial'
    ctx.fillText(data[a].name, 200, 230 + a * 30)
  }
  for (var a = 0; a < data.length; a++) {
    ctx.fillStyle = 'rgb(89, 0, 255)'
    ctx.font = '30px Arial'
    ctx.fillText(data[a].score, 450, 230 + a * 30)
  }
  //console.log(data);
  scoresAreLoaded = true
  canLoadScores = false
}

function line (x1, y1, x2, y2, col = 'black') {
  ctx.beginPath()
  ctx.strokeStyle = col
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  ctx.closePath()
}

//fetchUsers('http://localhost:9090/wordscores/getscores');

function startScreen () {
  ctx.fillStyle = 'rgb(89, 0, 255)'
  ctx.fillRect(0, 0, 800, 600)
  ctx.fillStyle = 'rgb(255, 89, 0)'
  ctx.font = 'italic bold 128px bodini'
  ctx.fillText('Word Pop', 150, 200)
  ///this else/if is for start button
  if (x >= 300 && x <= 500 && y > 350 && y <= 450) {
    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.fillRect(295, 345, 210, 110)
    ctx.fillStyle = 'rgb(0, 255, 89)'
    ctx.fillRect(300, 350, 200, 100)
    ctx.fillStyle = 'rgb(255, 89, 0)'
    ctx.font = 'italic bold 32px bodini'
    ctx.fillText('Start Game', 320, 400)
    if (mouseIsDown) {
      enterGame = true
      canSubmit = true
    }
  } else {
    ctx.fillStyle = 'rgb(89, 0, 255)'
    ctx.fillRect(300, 350, 200, 100)
    ctx.fillStyle = 'rgb(255, 89, 0)'
    ctx.font = 'italic bold 32px bodini'
    ctx.fillText('Start Game', 320, 400)
  }

  if (x >= 300 && x <= 500 && y > 460 && y <= 560) {
    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.fillRect(295, 455, 210, 110)
    ctx.fillStyle = 'rgb(0, 255, 89)'
    ctx.fillRect(300, 460, 200, 100)
    ctx.fillStyle = 'rgb(255, 89, 0)'
    ctx.font = 'italic bold 32px bodini'
    ctx.fillText('View Scores', 320, 510)

    if (mouseIsDown) {
      showScores = true
      canLoadScores = true
    }
  } else {
    ctx.fillStyle = 'rgb(89, 0, 255)'
    ctx.fillRect(300, 460, 200, 100)
    ctx.fillStyle = 'rgb(255, 89, 0)'
    ctx.font = 'italic bold 32px bodini'
    ctx.fillText('View Scores', 320, 510)
  }
}

function scoreScreen () {
  if (!scoresAreLoaded && canLoadScores) {
    fetchUsers('http://192.168.1.166:9090/wordscores/getscores')
  } else {
    if (x >= 500 && x <= 700 && y > 50 && y <= 150) {
      ctx.fillStyle = 'rgb(0, 0, 0)'
      ctx.fillRect(495, 25, 210, 110)
      ctx.fillStyle = 'rgb(0, 255, 89)'
      ctx.fillRect(500, 30, 200, 100)
      ctx.fillStyle = 'rgb(255, 89, 0)'
      ctx.font = 'italic bold 32px bodini'
      ctx.fillText('Exit Scores', 520, 85)
      if (mouseIsDown) {
        showScores = false
        scoresAreLoaded = false
      }
    }

    //change x and y for else below
    else {
      ctx.fillStyle = 'rgb(89, 0, 255)'
      ctx.fillRect(500, 30, 200, 100)
      ctx.fillStyle = 'rgb(255, 89, 0)'
      ctx.font = 'italic bold 32px bodini'
      ctx.fillText('Exit Scores', 520, 85)
    }
  }
}

function keyDownHandler (e) {
  if (e.keyCode == 65 && canPressAgain) {
    aButton = true
    if (shiftButton) {
      word.push('A')
    } else {
      word.push('a')
    }
    canPressAgain = false
  } else if (e.keyCode == 66 && canPressAgain) {
    bButton = true
    if (shiftButton) {
      word.push('B')
    } else {
      word.push('b')
    }
    canPressAgain = false
  } else if (e.keyCode == 67 && canPressAgain) {
    cButton = true
    if (shiftButton) {
      word.push('C')
    } else {
      word.push('c')
    }
    canPressAgain = false
  } else if (e.keyCode == 68 && canPressAgain) {
    dButton = true
    if (shiftButton) {
      word.push('D')
    } else {
      word.push('d')
    }
    canPressAgain = false
  } else if (e.keyCode == 69 && canPressAgain) {
    eButton = true
    if (shiftButton) {
      word.push('E')
    } else {
      word.push('e')
    }
    canPressAgain = false
  } else if (e.keyCode == 70 && canPressAgain) {
    fButton = true
    if (shiftButton) {
      word.push('F')
    } else {
      word.push('f')
    }
    canPressAgain = false
  } else if (e.keyCode == 71 && canPressAgain) {
    gButton = true
    if (shiftButton) {
      word.push('G')
    } else {
      word.push('g')
    }
    canPressAgain = false
  } else if (e.keyCode == 72 && canPressAgain) {
    hButton = true
    if (shiftButton) {
      word.push('H')
    } else {
      word.push('h')
    }
    canPressAgain = false
  } else if (e.keyCode == 73 && canPressAgain) {
    iButton = true
    if (shiftButton) {
      word.push('I')
    } else {
      word.push('i')
    }
    canPressAgain = false
  } else if (e.keyCode == 74 && canPressAgain) {
    jButton = true
    if (shiftButton) {
      word.push('J')
    } else {
      word.push('j')
    }
    canPressAgain = false
  } else if (e.keyCode == 75 && canPressAgain) {
    kButton = true
    if (shiftButton) {
      word.push('K')
    } else {
      word.push('k')
    }
    canPressAgain = false
  } else if (e.keyCode == 76 && canPressAgain) {
    lButton = true
    if (shiftButton) {
      word.push('L')
    } else {
      word.push('l')
    }
    canPressAgain = false
  } else if (e.keyCode == 77 && canPressAgain) {
    mButton = true
    if (shiftButton) {
      word.push('M')
    } else {
      word.push('m')
    }
    canPressAgain = false
  } else if (e.keyCode == 78 && canPressAgain) {
    nButton = true
    if (shiftButton) {
      word.push('N')
    } else {
      word.push('n')
    }
    canPressAgain = false
  } else if (e.keyCode == 79 && canPressAgain) {
    oButton = true
    if (shiftButton) {
      word.push('O')
    } else {
      word.push('o')
    }
    canPressAgain = false
  } else if (e.keyCode == 80 && canPressAgain) {
    pButton = true
    if (shiftButton) {
      word.push('P')
    } else {
      word.push('p')
    }
    canPressAgain = false
  } else if (e.keyCode == 81 && canPressAgain) {
    qButton = true
    if (shiftButton) {
      word.push('Q')
    } else {
      word.push('q')
    }
    canPressAgain = false
  } else if (e.keyCode == 82 && canPressAgain) {
    rButton = true
    if (shiftButton) {
      word.push('R')
    } else {
      word.push('r')
    }
    canPressAgain = false
  } else if (e.keyCode == 83 && canPressAgain) {
    sButton = true
    if (shiftButton) {
      word.push('S')
    } else {
      word.push('s')
    }
    canPressAgain = false
  } else if (e.keyCode == 84 && canPressAgain) {
    tButton = true
    if (shiftButton) {
      word.push('T')
    } else {
      word.push('t')
    }
    canPressAgain = false
  } else if (e.keyCode == 85 && canPressAgain) {
    uButton = true
    if (shiftButton) {
      word.push('U')
    } else {
      word.push('u')
    }
    canPressAgain = false
  } else if (e.keyCode == 86 && canPressAgain) {
    vButton = true
    if (shiftButton) {
      word.push('V')
    } else {
      word.push('v')
    }
    canPressAgain = false
  } else if (e.keyCode == 87 && canPressAgain) {
    wButton = true
    if (shiftButton) {
      word.push('W')
    } else {
      word.push('w')
    }
    canPressAgain = false
  } else if (e.keyCode == 88 && canPressAgain) {
    xButton = true
    if (shiftButton) {
      word.push('X')
    } else {
      word.push('x')
    }
    canPressAgain = false
  } else if (e.keyCode == 89 && canPressAgain) {
    yButton = true
    if (shiftButton) {
      word.push('Y')
    } else {
      word.push('y')
    }
    canPressAgain = false
  } else if (e.keyCode == 90 && canPressAgain) {
    zButton = true
    if (shiftButton) {
      word.push('Z')
    } else {
      word.push('z')
    }
    canPressAgain = false
  }

  ///This is for shift
  else if (e.keyCode == 16 && canPressAgain) {
    shiftButton = true
    //word.push("z");
    //canPressAgain = false;
  } else if (e.keyCode == 13 && canPressAgain) {
    ///enter
    enterButton = true
    for (var a = 0; a < fallingWords.length; a++) {
      if (
        fallingWords[a].length == wordString.length &&
        wordString == fallingWords[a]
      ) {
        score++
        fallingWords.splice(a, 1)
        wordString = ''
        word.length = 0
        console.log('WordString is : ' + wordString)
        console.log('Word length is : ' + word.length)
      }
    }
    canPressAgain = false
  } else if (e.keyCode == 8) {
    ///backspace
    backButton = true
    word.pop()
    canPressAgain = false
  }
}
function keyUpHandler (e) {
  if (e.keyCode == 65) {
    aButton = false
    canPressAgain = true
  } else if (e.keyCode == 16) {
    shiftButton = false
    //canPressAgain = false;
  } else if (e.keyCode == 66) {
    bButton = false
    canPressAgain = true
  } else if (e.keyCode == 67) {
    cButton = false
    canPressAgain = true
  } else if (e.keyCode == 68) {
    dButton = false
    canPressAgain = true
  } else if (e.keyCode == 69) {
    eButton = false
    canPressAgain = true
  } else if (e.keyCode == 70) {
    fButton = false
    canPressAgain = true
  } else if (e.keyCode == 71) {
    gButton = false
    canPressAgain = true
  } else if (e.keyCode == 72) {
    hButton = false
    canPressAgain = true
  } else if (e.keyCode == 73) {
    iButton = false
    canPressAgain = true
  } else if (e.keyCode == 74) {
    jButton = false
    canPressAgain = true
  } else if (e.keyCode == 75) {
    kButton = false
    canPressAgain = true
  } else if (e.keyCode == 76) {
    lButton = false
    canPressAgain = true
  } else if (e.keyCode == 77) {
    mButton = false
    canPressAgain = true
  } else if (e.keyCode == 78) {
    nButton = false
    canPressAgain = true
  } else if (e.keyCode == 79) {
    oButton = false
    canPressAgain = true
  } else if (e.keyCode == 80) {
    pButton = false
    canPressAgain = true
  } else if (e.keyCode == 81) {
    qButton = false
    canPressAgain = true
  } else if (e.keyCode == 82) {
    rButton = false
    canPressAgain = true
  } else if (e.keyCode == 83) {
    sButton = false
    canPressAgain = true
  } else if (e.keyCode == 84) {
    tButton = false
    canPressAgain = true
  } else if (e.keyCode == 85) {
    uButton = false
    canPressAgain = true
  } else if (e.keyCode == 86) {
    vButton = false
    canPressAgain = true
  } else if (e.keyCode == 87) {
    wButton = false
    canPressAgain = true
  } else if (e.keyCode == 88) {
    xButton = false
    canPressAgain = true
  } else if (e.keyCode == 89) {
    yButton = false
    canPressAgain = true
  } else if (e.keyCode == 90) {
    zButton = false
    canPressAgain = true
  } else if (e.keyCode == 13) {
    ///enter
    enterButton = false
    canPressAgain = true
  } else if (e.keyCode == 8) {
    ///backspace
    backButton = false
    canPressAgain = true
  }
}

function createWord () {
  wordString = word.join('')
}

function drawScore () {
  ctx.fillStyle = 'rgb(89, 0, 255)'
  ctx.font = 'italic bold 32px bodini'
  ctx.fillText('Score: ' + gameScore, 530, 590)
  ctx.fillStyle = 'rgb(89, 0, 255)'
  ctx.font = 'italic bold 32px bodini'
  ctx.fillText('Words Missed: ' + wordsMissed + '/6', 530, 560)
}

function drawFallingWords () {
  for (var a = 0; a < fallingWords.length; a++) {
    fallingWords[a].isCorrect = true
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'white'
    ctx.ellipse(
      fallingWords[a].x + (fallingWords[a].length / 2) * 16,
      fallingWords[a].y,
      40,
      fallingWords[a].length * 20,
      Math.PI / 2,
      0,
      2 * Math.PI
    )
    ctx.fill()
    ctx.stroke()
    for (var b = 0; b < fallingWords[a].length; b++) {
      if (fallingWords[a].wordArray[b].localeCompare(word[b])) {
        ctx.fillStyle = 'rgb(89, 0, 255)'
        ctx.font = 'italic bold 32px bodini'
        ctx.fillText(
          fallingWords[a].wordArray[b],
          fallingWords[a].x + b * 20,
          fallingWords[a].y
        )
        fallingWords[a].isCorrect = true
        //score++;
        //fallingWords.splice(a, 1);
      } else {
        ctx.fillStyle = 'rgb(255, 89, 0)'
        ctx.font = 'italic bold 32px bodini'
        ctx.fillText(
          fallingWords[a].wordArray[b],
          fallingWords[a].x + b * 20,
          fallingWords[a].y
        )
      }
    }
    fallingWords[a].y += fallingSpeed
    if (fallingWords[a].word === wordString && enterButton) {
      gameScore++
      snd.play()
      fallingWords.splice(a, 1)
      wordString = ''
      word.length = 0
      enterButton = false
    } else if (fallingWords[a].y >= 600) {
      wordsMissed++
      fallingWords.splice(a, 1)
      console.log('Missed words: ' + wordsMissed)
    }
    if (wordsMissed >= 6) {
      //end the game
      enterGame = false
      endOfGame = true
      wordString = ''
      word.length = 0
    }
  }
}

function refreshTyping () {
  canPressAgain = true
}

function addNewWords () {
  newWordTimer--
  if (newWordTimer < 0) {
    newWordTimer = Math.floor(Math.random() * wordAddSpeed) + 100
    //console.log("possible word.nouns[3]: " + possibleWords.nouns[3]);
    var randomWord =
      possibleWords.nouns[
        Math.floor(Math.random() * possibleWords.nouns.length)
      ]
    var x2 = Math.floor(Math.random() * 700) + 50 - randomWord.length * 20
    if (x2 < 0) {
      x2 = 50
    }
    fallingWords.push(new FallingWord(x2, -50, randomWord))
    wordAddSpeed -= 5
  }
}

function wordScoreTerminal () {
  ctx.fillStyle = 'rgb(0, 255, 89)'
  ctx.fillRect(0, 525, 800, 600)
}

function drawWordGame () {
  ctx.fillStyle = 'rgb(255, 89, 0)'
  ctx.fillRect(0, 0, 800, 600)
  if (possibleWords == null) {
    ctx.fillStyle = 'rgb(89, 0, 255)'
    ctx.font = 'italic bold 32px bodini'
    ctx.fillText('Game is loading', 100, 200)
  } else {
    createWord()
    addNewWords()
    drawFallingWords()
    wordScoreTerminal()
    drawScore()
    ctx.fillStyle = 'rgb(89, 0, 255)'
    ctx.font = 'italic bold 32px bodini'
    ctx.fillText('Typed Word: ' + wordString, 25, 575)
  }
}

function drawMissedWords () {
  var shiftOver = 0
  var shiftDown = 0
  for (var a = 1; a < wordsMissed + 1; a++) {
    console.log('This is being hit.')
    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.fillRect(200 + shiftDown, 200 + shiftOver, 20, 20)
    shiftDown += 30
    if (a % 4 == 0) {
      shiftDown = 0
      shiftOver += 30
    }
  }
}

function drawEndOfGame () {
  ctx.fillStyle = 'rgb(255, 89, 0)'
  ctx.fillRect(0, 0, 800, 600)

  ctx.fillStyle = 'rgb(89, 0, 255)'
  ctx.font = 'italic bold 128px bodini'
  ctx.fillText('Game Over', 100, 110)

  ctx.fillStyle = 'rgb(89, 0, 255)'
  ctx.font = 'italic bold 32px bodini'
  gameName = word.join('')
  if (gameName.length > 10) {
    err1 = true
    word.length = 11
  } else {
    err1 = false
  }
  ctx.fillStyle = 'rgb(0, 255, 89)'
  ctx.beginPath()
  ctx.arc(125, 235, 25, 0, 2 * Math.PI)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(325, 235, 25, 0, 2 * Math.PI)
  ctx.fill()
  ctx.fillRect(125, 210, 200, 50)
  ctx.fillStyle = 'rgb(89, 0, 255)'
  ctx.fillText('Enter Your Name: ', 100, 200)
  ctx.fillText(gameName, 150, 250)
  ctx.fillText('Your Score: ' + gameScore, 100, 300)
  if (err1) {
    ctx.fillStyle = 'rgb(0, 255, 89)'
    ctx.fillText('Name must be less than 10 characters!', 100, 400)
  }

  if (x >= 500 && x <= 700 && y > 175 && y <= 275) {
    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.fillRect(495, 170, 210, 110)
    ctx.fillStyle = 'rgb(0, 255, 89)'
    ctx.fillRect(500, 175, 200, 100)
    ctx.fillStyle = 'rgb(255, 89, 0)'
    ctx.font = 'italic bold 32px bodini'
    ctx.fillText('Submit', 550, 225)
    if (mouseIsDown && canSubmit) {
      canSubmit = false
      enterGame = false
      endOfGame = false
      showScores = false
      //submit form
      //var url = 'http://localhost:9090/wordscores/savescore';
      var url = 'http://192.168.1.166:9090/wordscores/savescore'
      var data = JSON.stringify({
        score: gameScore,
        name: gameName
      })

      fetch(url, {
        method: 'POST', // or 'PUT'
        body: data, // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.text())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error))
      gameScore = 0
      wordsMissed = 0
      fallingWords.length = 0
      word.length = 0
      showScores = true
      scoresAreLoaded = false
      canLoadScores = true
    }
  }

  //change x and y for else below
  else {
    ctx.fillStyle = 'rgb(89, 0, 255)'
    ctx.fillRect(500, 175, 200, 100)
    ctx.fillStyle = 'rgb(255, 89, 0)'
    ctx.font = 'italic bold 32px bodini'
    ctx.fillText('Submit', 550, 225)
  }
}

function draw () {
  if (endOfGame) {
    drawEndOfGame()
  }
  //ctx.clearRect(0, 0, 800, 600);
  else if (!enterGame && !showScores) {
    ctx.clearRect(0, 0, 800, 600)
    startScreen()
  } else if (showScores) {
    scoreScreen()
  } else if (enterGame) {
    drawWordGame()
  }
}
setInterval(draw, 2)
setInterval(refreshTyping, 5)
