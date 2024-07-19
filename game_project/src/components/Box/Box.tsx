import styles from "./Box.module.scss";


const Box = ({ src, alt , text }: any) => {
  return (
    <div className={styles.box}>
      <img src={src as string} alt={alt} className={styles.image} />

       <h2 className={styles.text}>{text}</h2>
    </div>
  );
};

export default Box;
