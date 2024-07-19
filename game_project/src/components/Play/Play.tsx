import { useState } from "react";
import styles from "./Play.module.scss";
import Button from "../Button/Button";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { PlayProps } from "../../Types";
import { baseurl } from "../../utils/constant";
import axios from "axios";

const Play = ({ players, handleStartGame, finish }: PlayProps) => {
  const [point, setPoint] = useState<number>(100);
  const [multiplier, setMultiplier] = useState<number>(1);

  const handleSubmit = async (handleGame: any) => {
    const res = await axios.post(`${baseurl}api/start_round`, {
      point,
      multiplier,
    });
    const data = await res.data;
    handleGame(data);
  };

  const handleChange = (e: any, type: string) => {
    if (type === "point") {
      setPoint(Number(e.target.value));
    } else if (type === "multiplier") {
      setMultiplier(e.target.value);
    }
  };

  const incrementPoint = () => {
    setPoint((prevPoint) => prevPoint + 50);
  };

  const decrementPoint = () => {
    setPoint((prevPoint) => (prevPoint - 50 < 0 ? 0 : prevPoint - 50));
  };

  const incrementMultiplier = () => {
    setMultiplier((prevMultiplier) => Number(prevMultiplier) + 0.25);
  };

  const decrementMultiplier = () => {
    setMultiplier((prevMultiplier) =>
      Number(prevMultiplier) - 0.25 < 0 ? 0 : Number(prevMultiplier) - 0.25
    );
  };

  return (
    <div className={styles.Play}>
      <div className={styles.header}>
        <div className={styles.box}>
          <button className={styles.btn} onClick={incrementPoint}>
            <IoIosArrowUp className={styles.icon} />
          </button>
          <input
            type="text"
            onChange={(e) => handleChange(e, "point")}
            value={point}
            className={styles.input}
          />
          <button onClick={decrementPoint} className={styles.btn}>
            <IoIosArrowDown className={styles.icon} />
          </button>
        </div>
        <div className={styles.box}>
          <button className={styles.btn}>
            {" "}
            <IoIosArrowUp
              className={styles.icon}
              onClick={incrementMultiplier}
            />
          </button>
          <input
            type="text"
            onChange={(e) => handleChange(e, "multiplier")}
            className={styles.input}
            value={multiplier}
          />
          <button className={styles.btn}>
            <IoIosArrowDown
              className={styles.icon}
              onClick={decrementMultiplier}
            />
          </button>
        </div>
      </div>
      <Button text="Start" handleClick={() => handleSubmit(handleStartGame)} />
      <h1 className={styles.title}>Current Round</h1>
      <div className={styles.tableCurrent}>
        <table className={styles.table}>
          <thead className={styles.table_head}>
            <tr>
              <th scope="col" className={styles.th_text}>
                Name
              </th>

              <th scope="col" className={styles.th_text}>
                Point
              </th>

              <th scope="col" className={styles.th_text}>
                multiplier
              </th>
            </tr>
          </thead>
          <tbody>
            <>
              {players.map((item: any, index: number) => {
                return (
                  <tr
                    key={index}
                    className={`${styles.table_row} ${
                      index % 2 === 0 ? styles.alt_bg : ""
                    }`}
                  >
                    <td
                      className={`
                          ${styles.table_col}
                          ${finish && item.isSuccess ? styles.success : ""}
                          ${finish && !item.isSuccess ? styles.loss : ""}
                        `}
                    >
                      {item.playerName}
                    </td>

                    <td
                      className={`
                          ${styles.table_col}
                          ${finish && item.isSuccess ? styles.success : ""}
                          ${finish && !item.isSuccess ? styles.loss : ""}
                        `}
                    >
                      {item.points}
                    </td>

                    <td
                      className={`
                          ${styles.table_col}
                          ${finish && item.isSuccess ? styles.success : ""}
                          ${finish && !item.isSuccess ? styles.loss : ""}
                        `}
                    >
                      {item.multiplier}
                    </td>
                  </tr>
                );
              })}
            </>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Play;
