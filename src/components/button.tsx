import { useCallback } from 'react'
import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
}

function Button(props: ButtonProps) {
  const { children } = props
  const onClick = useCallback<(e: Event) => void>((e) => e.preventDefault(), [])
  return (
    // @ts-expect-error
    <Button onClick={onClick}>{children}</Button>
  )
}

export { Button }
