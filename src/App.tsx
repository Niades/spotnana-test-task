import { useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { throttle } from 'throttle-debounce'
import styles from './App.module.css'
import { Button } from '../src/components/button'
import { Counter } from '../src/components/counter'

type ContainerProps = {
  children?: ReactNode
}

const Container: React.FC<ContainerProps> = (props) => {
  const { children } = props
  return <div className={styles.container}>{children}</div>
}

const App: React.FC = () => {
  const [cntrValue, setCntrValue] = useState<number>(0)
  const btnOnClick = useCallback(() => {
      setCntrValue(cntrValue + 1)
  }, [cntrValue, setCntrValue])
  const throttledBtnOnClick = throttle(333, btnOnClick);
  return (
    <Container>
      <Counter value={cntrValue} />
      <Button onClick={throttledBtnOnClick}>Press me!</Button>
    </Container>
  )
}

export default App
