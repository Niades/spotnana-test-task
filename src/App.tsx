import type { ReactNode } from 'react'
import styles from './App.module.css'
import { Button } from '../src/components/button'
import { Counter } from '../src/components/counter'

type ContainerProps = {
  children?: ReactNode
}

const Container: React.FC<ContainerProps> = (props) => {
  const { children } = props;
  return (<div className={styles.container}>{children}</div>)
}

function App() {
  return (
    <Container>
      <Counter />
      <Button>Press me!</Button>
    </Container>
  )
}

export default App
