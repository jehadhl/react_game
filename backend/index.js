const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cors());

const generateUniqueId = () =>
  "player-" + Math.random().toString(36).substr(2, 16);

const generateRandomNumber = (minRange, maxRange) => {
  return Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
};

const formatTime = (date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

let messages = [];
let players = [];
let crashGame = 0;
let gameBoard = [];
const time = 15000;
let stopPoint = 0;

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    players = [];
    messages = [];
  });

  socket.on("start_game", (speed) => {
    console.log(speed);
    const intervalTime = time / (speed * 10);
    console.log(intervalTime);
    crashGame = 0;
    gameBoard = [];
    let elapsedTime = 0;
    stopPoint = generateRandomNumber(1, 15); // generate random number
    const intervalId = setInterval(() => {
      crashGame += 0.25;
      elapsedTime += intervalTime / 1000; //convert to milisecond to second

      gameBoard.push({ time: elapsedTime, value: crashGame });
      io.emit("updateCrashGame", { crashGame, gameBoard });
      console.log(stopPoint);
      if (crashGame >= stopPoint) {
        clearInterval(intervalId);
        checkResults();
        io.emit("gameFinish", "Finish");
      }
    }, intervalTime);
  });

  socket.on("sendMessage", (message) => {
    console.log(message);
    messages.push(message);
    io.emit("receiveMessage", message);
  });
});

const checkResults = () => {
  players.forEach((player) => {
    if (player.multiplier !== "-" && player.points !== "-") {
      if (crashGame > player.multiplier) {
        console.log(player.totalPoint, player.points, player.multiplier);
        player.isSuccess = true;
        player.totalPoint += player.points * player.multiplier;
      } else {
        player.isSuccess = false;
        player.points = 0;
      }
    }
  });
  // io.emit("round_results", { players });
};

app.post("/api/join_room", (req, res) => {
  const { name } = req.body;
  const totalPoint = generateRandomNumber(100, 1000);

  players.push({
    id: generateUniqueId(),
    points: "-",
    playerName: name,
    multiplier: "-",
    date: formatTime(new Date()),
    totalPoint: 1000,
    isSuccess: false,
  });

  for (let i = 0; i < 4; i++) {
    players.push({
      id: generateUniqueId(),
      points: "-",
      playerName: `CPU-${i + 1}`,
      multiplier: "-",
      date: formatTime(new Date()),
      totalPoint,
      isSuccess: false,
    });
  }

  res.send({ players });
});

app.post("/api/start_round", (req, res) => {
  const { point: realPoints, multiplier: realMultiplier } = req.body;
  //   console.log(realPoints, realMultiplier, "helloooooooooooo", req.body);
  const totalPoint = generateRandomNumber(100, 1000);

  // Real player
  players[0].points = realPoints;
  players[0].multiplier = realMultiplier;
  players[0].totalPoint -= realPoints;

  // Auto player
  for (let i = 1; i < 5; i++) {
    players[i].points = generateRandomNumber(10, 1000);
    players[i].multiplier = generateRandomNumber(1, 30);
    players[i].totalPoint = totalPoint - realPoints;
  }
  res.send({ players });
});

app.get("/api/check_results", (req, res) => {
  res.send({ players });
});

app.get("/api/rankings", (req, res) => {
  const sortedPlayers = [...players].sort(
    (a, b) => b.totalPoint - a.totalPoint
  );
  res.send({ players: sortedPlayers });
});

server.listen(8000, () => {
  console.log("Listening on port 8000");
});
