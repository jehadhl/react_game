import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./Chat.module.scss";
import Button from "../Button/Button";
import socket from "../../utils/socket";
import axios from "axios";
import { baseurl } from "../../utils/constant";

const Chat = () => {
  const [value, setValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages: any) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  console.log(messages);
  const handleSendChat = async () => {
   
    
    
    socket.emit("sendMessage", {
      sender: "jehad",
      content: value,
    });

    setValue("")

    
  };
  return (
    <section>
      <h1 className={styles.title}>Chat</h1>
      <div className={styles.chat}>
        <div className={styles.chatBox}>
          {messages.map((item: any) => {
            return (
              <div className={styles.box}>
                <h1 className={styles.title_box}>{item.sender}</h1>
                <p className={styles.content}>{item.content}</p>
              </div>
            );
          })}
        </div>
        <div className={styles.send}>
          <div className={styles.WrapInput}>
            <input
              type="text"
              value={value}
              onChange={handleInputChange}
              placeholder="Please Enter your name"
              className={styles.input}
            />
          </div>
          <div className="w-[20%]">
            <Button text={"Start"} handleClick={handleSendChat} disable={value.length === 0} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
