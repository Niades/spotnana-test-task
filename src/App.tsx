import {useState} from 'react'
import type { ReactNode } from 'react'
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
  const [cntrValue, setCntrValue] = useState<number>(0);
  return (
    <Container>
      <Counter value={cntrValue} />
      <Button onClick={() => setCntrValue(cntrValue + 1)}>Press me!</Button>
    </Container>
  )
}

export default App
