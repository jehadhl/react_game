import React from "react";
import styles from "./Rank.module.scss";

const Rank = ({ rankings }: any) => {
  const data = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    name: `____`,
    score: `____`,
  }));

  console.log(rankings);
  return (
    <section className={styles.Rank}>
      <h1 className={styles.title}>Rank</h1>

      <div className={styles.main}>
        <table className={styles.table}>
          <thead className={styles.table_head}>
            <tr>
              <th scope="col" className={styles.th_text}>
                No.
              </th>

              <th scope="col" className={styles.th_text}>
                Name
              </th>

              <th scope="col" className={styles.th_text}>
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            <>
              {rankings.length > 0 ? (
                <>
                  {rankings.map((item : any, index : number) => {
                    return (
                      <tr
                        key={index}
                        className={`${styles.table_row} ${
                          index % 2 === 0 ? styles.alt_bg : ""
                        }`}
                      >
                        <td className={styles.table_col}>{index + 1}</td>
                        <td className={styles.table_col}>{item.playerName}</td>
                        <td className={styles.table_col}>{item.totalPoint}</td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  {" "}
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      className={`${styles.table_row} ${
                        index % 2 === 0 ? styles.alt_bg : ""
                      }`}
                    >
                      <td className={styles.table_col}>{item.id}</td>
                      <td className={styles.table_col}>{item.name}</td>
                      <td className={styles.table_col}>{item.score}</td>
                    </tr>
                  ))}
                </>
              )}
            </>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Rank;
