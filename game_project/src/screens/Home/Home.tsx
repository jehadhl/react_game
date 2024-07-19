import React, { useCallback, useEffect, useState } from "react";
import styles from "./Home.module.scss";
import Welcome from "../../components/Welcome/Welcome";
import Box from "../../components/Box/Box";
import Chat from "../../components/Chat/Chat";
import Chart from "../../components/Chart/Chart";
import Play from "../../components/Play/Play";
import imgOne from "../../assets/icons/point.png";
import imgTwo from "../../assets/icons/user.png";
import imgThree from "../../assets/icons/time.png";
import Rank from "../../components/Rank/Rank";
import { Slider } from "@mui/material";
import socket from "../../utils/socket";
import axios from "axios";
import { baseurl } from "../../utils/constant";

const Home = () => {
  const [userJoined, setUserJoined] = useState<boolean>(false);
  const [players, setPlayers] = useState<any>([]);
  const [start, setStart] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [crashGame, setCrashGame] = useState(0);
  const [gameBoard, setGameBoard] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [finish , setFinish] = useState(false)

  const handleSpeedChange: any = (event: any, newValue: number) => {
    console.log(newValue, "helloooo");
    setSpeed(newValue);
  };
  const handleUserJoin = useCallback((joinedPlayers: any) => {
    setUserJoined(true);
    setPlayers(joinedPlayers.players);
  }, []);

  const handleStartGame = (startGame: any) => {
    setStart(true);
    console.log(startGame, "newdatatatsdasd");
    // setPlayers(startGame);
    setPlayers(startGame.players);
  };

  useEffect(() => {
    if (start) {
      socket.emit("start_game", speed);
      socket.on("updateCrashGame", ({ crashGame, gameBoard }) => {
        setCrashGame(crashGame);
        setGameBoard(gameBoard);
      });

      return () => {
        socket.off("updateCrashGame");
      };
    }
  }, [start]);

  useEffect(() => {
    const fetchResultsAndRankings = async () => {
      try {
        const [resultsResponse, rankingsResponse] = await Promise.all([
          axios.get(`${baseurl}api/check_results`),
          axios.get(`${baseurl}api/rankings`),
        ]);
        setRankings(rankingsResponse.data.players);
        console.log(resultsResponse.data.players);
        setPlayers(resultsResponse.data.players);
      } catch (error) {
        console.error("Error fetching results and rankings:", error);
      }
    };
    socket.on("gameFinish", async (title) => {
      console.log(title);
      setFinish(true)
      if (title === "Finish") {
        await fetchResultsAndRankings();
      }
    });

    return () => {
      socket.off("gameFinish");
    };
  }, []);

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.gridSection}>
          <div className={styles.secOne}>
            {userJoined ? (
              <>
                <Play
                  userJoined={userJoined}
                  players={players}
                  handleStartGame={handleStartGame}
                  finish={finish}
                />
                <div>
                  <h1 className="font-bold text-white text-2xl">Speed</h1>
                  <Slider
                    value={speed}
                    min={1}
                    max={5}
                    step={1}
                    onChange={handleSpeedChange}
                    aria-label="Range Slider"
                    valueLabelDisplay="auto"
                  />
                </div>
              </>
            ) : (
              <Welcome handleUserJoin={handleUserJoin} />
            )}
          </div>
          <div className={styles.secTwo}>
            <div className={styles.flexBox}>
              <Box
                src={imgOne}
                alt="img_0"
                text={userJoined ? players[0].totalPoint : ""}
              />
              <Box
                src={imgTwo}
                alt="img_1"
                text={userJoined ? players[0].playerName : ""}
              />
              <Box
                src={imgThree}
                alt="img_2"
                text={userJoined ? players[0].date : ""}
              />
            </div>
            <Chart gameBoard={gameBoard} crashGame={crashGame} />
          </div>
        </div>
        <div className={styles.chatRank}>
          <Rank rankings={rankings} />
          <Chat />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
