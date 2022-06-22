import type { ReactNode } from 'react'
import styles from './button.module.css'

type ButtonProps = {
  color: string
  onClick: (e: MouseEvent) => void
  children: ReactNode
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      style={{ backgroundColor: props.color }}
      className={styles.button}
      // @ts-expect-error
      onClick={props.onClick}
      type="button"
    >
      {props.children}
    </button>
  )
}

export { Button }
