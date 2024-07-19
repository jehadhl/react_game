import { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import socket from "../../utils/socket";
import axios from "axios";
import { baseurl } from "../../utils/constant";

export const useJoinValue = () => {
  const [value, setValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const generateAutoPlayers = () => {
    const autoPlayers = [];
    const messages = [
      "Hi, I'm CPU1!",
      "Hello, CPU2 here!",
      "Hey, CPU3 joining in!",
      "Greetings from CPU4!",
    ];

    const joinTime = new Date().toISOString();

    for (let i = 1; i <= 4; i++) {
      autoPlayers.push({
        id: i,
        name: `CPU${i}`,
        points: 300 * i,
        multiplier: (Math.random() * 10).toFixed(2),
        joinTime: joinTime,
        message: messages[i - 1],
      });
    }
    return autoPlayers;
  };

  const handleSubmit = async (handleUserJoin: (type: any) => void) => {
    const autoPlayers = generateAutoPlayers();

    try {
      if (value.trim() !== "") {
        const res = await axios.post(`${baseurl}api/join_room`, {
          name: value,
        });
        const data = res.data;
        autoPlayers.forEach((autoPlayer, index) => {
          setTimeout(() => {
            socket.emit("sendMessage", {
              sender: autoPlayer.name,
              content: autoPlayer.message,
            });
          }, index * 2000);
        });
        handleUserJoin(data);
      } else {
        toast.error("Please enter your name.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error joining game:", error);
    }
  };

  return {
    value,
    handleSubmit,
    handleInputChange,
  };
};
