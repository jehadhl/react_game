import { ButtonProps } from '../../Types'
import styles from "./Button.module.scss"

const Button = ({text , handleClick , disable} : ButtonProps) => {
  return (
    <button onClick={handleClick} className={`${disable ? styles.disable :  styles.btn}`} disabled={disable}>
       {text}
    </button>
  )
}

export default Button
