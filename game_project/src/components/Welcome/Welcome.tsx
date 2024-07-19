import styles from "./Welcome.module.scss";
import Button from "../Button/Button";
import { useJoinValue } from "./Welcome.hook";
import { WelcomeProps } from "../../Types";


const Welcome = ({ handleUserJoin }: WelcomeProps) => {
  const { value, handleInputChange , handleSubmit } = useJoinValue();

  return (
    <div className={styles.Welcome}>
      <h1 className={styles.title}>Welcome</h1>

      <div className={styles.Join}>
        
        <div className={styles.WrapInput}>
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder="Please Enter your name"
            className={styles.input}
          />
        </div>
        <Button text={"Accept"} handleClick={()=>handleSubmit(handleUserJoin as any)} />
      </div>
    </div>
  );
};

export default Welcome;
