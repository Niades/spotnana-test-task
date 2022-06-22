import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button type="button">{props.children}</button>
  )
}

export { Button }
