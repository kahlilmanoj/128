import React, { useState, useEffect } from "react";
import cloneDeep from "lodash.clonedeep";
import { useEvent, getColors} from "./util";


function App() {
  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;

  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

const [gameOver, setGameOver] = useState(false);


// Initialize
const initialize = () => {

  let newGrid = cloneDeep(data);
  console.log(newGrid);

  addNumber(newGrid);
  console.table(newGrid);
  addNumber(newGrid);
  console.table(newGrid);
  setData(newGrid);
};

 // AddNumber - Add an item
 const addNumber = (newGrid) => {
  let added = false;
  let gridFull = false;
  while (!added) {
    if (gridFull) {
      break;
    }

    let rand1 = Math.floor(Math.random() * 4);
    let rand2 = Math.floor(Math.random() * 4);
    if (newGrid[rand1][rand2] === 0) {
      newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
      added = true;
    }
    
     if(gridFull){
      
      let gameOverr = checkIfGameOver();
      if (gameOverr) {
        alert("game over");
      }

  }
} 
};

 // Swipe Left
 const swipeLeft = (dummy) => {
  console.log("swipe left");
  let oldGrid = data;
  let newArray = cloneDeep(data);

  for (let i = 0; i < 4; i++) {
    let b = newArray[i];
    let slow = 0;
    let fast = 1;
    while (slow < 4) {
      if (fast === 4) {
        fast = slow + 1;
        slow++;
        continue;
      }
      if (b[slow] === 0 && b[fast] === 0) {
        fast++;
      } else if (b[slow] === 0 && b[fast] !== 0) {
        b[slow] = b[fast];
        b[fast] = 0;
        fast++;
      } else if (b[slow] !== 0 && b[fast] === 0) {
        fast++;
      } else if (b[slow] !== 0 && b[fast] !== 0) {
        if (b[slow] === b[fast]) {
          b[slow] = b[slow] + b[fast];
          b[fast] = 0;
          fast = slow + 1;
          slow++;
        } else {
          slow++;
          fast = slow + 1;
        }
      }
    }
  }
  if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
    addNumber(newArray);
  }
  if (dummy) {
    return newArray;
  } else {
    setData(newArray);
    checkIf2048(newArray);
  }
};

//swipe right
const swipeRight = (dummy) => {
  console.log("swipe right");
  let oldData = data;
  let newArray = cloneDeep(data);

  for (let i = 3; i >= 0; i--) {
    let b = newArray[i];
    let slow = b.length - 1;
    let fast = slow - 1;
    while (slow > 0) {
      if (fast === -1) {
        fast = slow - 1;
        slow--;
        continue;
      }
      if (b[slow] === 0 && b[fast] === 0) {
        fast--;
      } else if (b[slow] === 0 && b[fast] !== 0) {
        b[slow] = b[fast];
        b[fast] = 0;
        fast--;
      } else if (b[slow] !== 0 && b[fast] === 0) {
        fast--;
      } else if (b[slow] !== 0 && b[fast] !== 0) {
        if (b[slow] === b[fast]) {
          b[slow] = b[slow] + b[fast];
          b[fast] = 0;
          fast = slow - 1;
          slow--;
        } else {
          slow--;
          fast = slow - 1;
        }
      }
    }
  }
  if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
    addNumber(newArray);
  }
  if (dummy) {
    return newArray;
  } else {
    setData(newArray);
    checkIf2048(newArray);
  }
};

//swipe down
const swipeDown = (dummy) => {
  console.log("swipe down");
  console.log(data);
  let b = cloneDeep(data);
  let oldData = JSON.parse(JSON.stringify(data));
  for (let i = 3; i >= 0; i--) {
    let slow = b.length - 1;
    let fast = slow - 1;
    while (slow > 0) {
      if (fast === -1) {
        fast = slow - 1;
        slow--;
        continue;
      }
      if (b[slow][i] === 0 && b[fast][i] === 0) {
        fast--;
      } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
        b[slow][i] = b[fast][i];
        b[fast][i] = 0;
        fast--;
      } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
        fast--;
      } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
        if (b[slow][i] === b[fast][i]) {
          b[slow][i] = b[slow][i] + b[fast][i];
          b[fast][i] = 0;
          fast = slow - 1;
          slow--;
        } else {
          slow--;
          fast = slow - 1;
        }
      }
    }
  }
  if (JSON.stringify(b) !== JSON.stringify(oldData)) {
    addNumber(b);
  }
  if (dummy) {
    return b;
  } else {
    setData(b);
    checkIf2048(b);
  }
};

//swipe up
const swipeUp = (dummy) => {
  console.log("swipe up");
  let b = cloneDeep(data);
  let oldData = JSON.parse(JSON.stringify(data));
  for (let i = 0; i < 4; i++) {
    let slow = 0;
    let fast = 1;
    while (slow < 4) {
      if (fast === 4) {
        fast = slow + 1;
        slow++;
        continue;
      }
      if (b[slow][i] === 0 && b[fast][i] === 0) {
        fast++;
      } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
        b[slow][i] = b[fast][i];
        b[fast][i] = 0;
        fast++;
      } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
        fast++;
      } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
        if (b[slow][i] === b[fast][i]) {
          b[slow][i] = b[slow][i] + b[fast][i];
          b[fast][i] = 0;
          fast = slow + 1;
          slow++;
        } else {
          slow++;
          fast = slow + 1;
        }
      }
    }
  }
  if (JSON.stringify(oldData) !== JSON.stringify(b)) {
    addNumber(b);
  }
  if (dummy) { 
    return b;
  } else {
    setData(b);
    checkIf2048(b);
  }
};

//Check if over
const checkIfGameOver = () => {
  console.log("CHECKING GAME OVER");

  let checker = swipeLeft(true);

  if (JSON.stringify(data) !== JSON.stringify(checker)) {
    return false;
  }

  let checker2 = swipeDown(true);
  if (JSON.stringify(data) !== JSON.stringify(checker2)) {
    return false;
  }

  let checker3 = swipeRight(true);

  if (JSON.stringify(data) !== JSON.stringify(checker3)) {
    return false;
  }

  let checker4 = swipeUp(true);

  if (JSON.stringify(data) !== JSON.stringify(checker4)) {
    return false;
  }

  return true;
};

const checkIf2048 = (data1) => {
  let b = data1
  for (var i=0;i<b.length;i++){
    if (b[i].includes(2048)){
      console.log('Game Won');
      alert('YOU WON');
    }
  }
}
// Reset
const resetGame = () => {
  setGameOver(false);
  const emptyGrid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  addNumber(emptyGrid);
  addNumber(emptyGrid);
  setData(emptyGrid);
};

// Key 
const handleKeyDown = (event) => {
  if (gameOver) {
    return;
  }
  switch (event.keyCode) {
    case UP_ARROW:
      swipeUp();
      break;
    case DOWN_ARROW:
      swipeDown();
      break;
    case LEFT_ARROW:
      swipeLeft();
      break;
    case RIGHT_ARROW:
      swipeRight();
      break;
    default:
      break;
  }
  let gameOverr = checkIfGameOver();
  if (gameOverr) {
    setGameOver(true);
  }
};

useEffect(() => {
  initialize();
  // eslint-disable-next-line
}, []);

useEvent("keydown", handleKeyDown);


return (
  <div className="App">
    <div
      style={{
        width: 345,
        margin: "auto",
        marginTop: 30,
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            fontFamily: "sans-serif",
            flex: 1,
            fontWeight: "700",
            fontSize: 60,
            color: "#776e65",
          }}
        >
          2048
        </div>
        <div
          style={{
            flex: 1,
            marginTop: "auto",
          }}
        >
        </div>
      </div>

      <div
      style={{
        width: 345,
        margin: "auto",
        bottom: 30,
      }}></div>

      <div
        style={{
          background: "#AD9D8F",
          width: "max-content",
          height: "max-content",
          margin: "auto",
          padding: 5,
          borderRadius: 5,
          marginTop: 10,
          position: "relative",
        }}
      >
        {gameOver && (
          <div style={style.gameOverOverlay}>
            <div>
              <div
                style={{
                  fontSize: 30,
                  fontFamily: "sans-serif",
                  fontWeight: "900",
                  color: "#776E65",
                }}
              >
                Game Over
              </div>
              <div>
                <div
                  style={{
                    flex: 1,
                    marginTop: "auto",
                  }}
                >
                  <div onClick={resetGame} style={style.tryAgainButton}>
                    Try Again
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

          {data.map((row, oneIndex) => {
            return (
              <div style={{ display: "flex" }} key={oneIndex}>
                {row.map((digit, index) => (
                  <Block num={digit} key={index} />
                ))}
              </div>
            );
          })}
        
      </div>
    </div>
  </div>
);
}


const Block = ({ num }) => {
  const { blockStyle } = style;

  return (
    <div
      style={{
        ...blockStyle,
        background: getColors(num),
        color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
      }}
    >
      {num!== 0 ? num : ""}

    </div>
  );
};

const style = {
  blockStyle: {
    height: 80,
    width: 80,
    background: "lightgray",
    margin: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 45,
    fontWeight: "800",
    color: "white",
  },
};


export default App;
