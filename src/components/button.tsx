import type { ReactNode } from 'react'
import styles from './button.module.css'

type ButtonProps = {
  onClick: (e: MouseEvent) => void,
  children: ReactNode
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    // @ts-expect-error
    <button className={styles.button} onClick={props.onClick} type="button">
      {props.children}
    </button>
  )
}

export { Button }
