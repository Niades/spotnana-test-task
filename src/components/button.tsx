import type { ReactNode } from 'react'
import styles from "./button.module.css";

type ButtonProps = {
  children: ReactNode
}

const Button: React.FC<ButtonProps> = (props) => {
  return <button className={styles.button} type="button">{props.children}</button>
}

export { Button }
