import { useState, useCallback, useEffect } from 'react'
import type { ReactNode } from 'react'
import { throttle } from 'throttle-debounce'
import PLazy from 'p-lazy'
import styles from './App.module.css'
import { Button } from '../src/components/button'
import { Counter } from '../src/components/counter'

const IDLE_TIMEOUT = 3000;
const PALETTE = ['#DEC5E3', '#CDEDFD', '#B6DCFE', '#B6DCFE', '#81F7E5']

type ContainerProps = {
  children?: ReactNode
}

function pickRandomColorFromPallete() {
  return PALETTE[Math.floor(Math.random() * PALETTE.length)]
}

const Container: React.FC<ContainerProps> = (props) => {
  const { children } = props
  return <div className={styles.container}>{children}</div>
}

const App: React.FC = () => {
  const [cntrValue, setCntrValue] = useState<number>(0)
  const setCounterValue = useCallback(
    (newValue: number): void => {
      if (newValue < 0) {
        newValue = 0
      }
      setCntrValue(newValue)
      console.log(
        '[setCounterValue]: setCntrValue called, newValue = ',
        newValue,
      )
    },
    [setCntrValue],
  )
  const [btnColor, setBtnColor] = useState<string>(pickRandomColorFromPallete())
  useEffect(() => {
    const createDecreasingInterval = function () {
      function createInterval(): number {
        return window.setInterval(() => {
          console.log("[decreasing-interval]: I was called")
          setCounterValue(cntrValue - 1)
        }, 1000)
      }
      return new PLazy((resolve) => {
        resolve(createInterval())
      })
    }
    let decreasingInterval: number = -1;
    const interval = window.setInterval(() => {
      setBtnColor(pickRandomColorFromPallete())
      console.log("[useEffect]: next line is if");
      console.log("[useEffect]: ", { decreasingInterval, nin: -1 })
      if (decreasingInterval === -1) {
        console.log("[useEffect]: creatingDecreasingInterval");
        createDecreasingInterval().then(
          // @ts-expect-error
          (interval) => (decreasingInterval = interval),
        )
      }
    }, IDLE_TIMEOUT)
    return () => {
      window.clearInterval(interval)
      window.clearInterval(decreasingInterval)
      decreasingInterval = -1;
    }
  }, [cntrValue, setCounterValue])
  const btnOnClick = useCallback(() => {
    setCounterValue(cntrValue + 1)
  }, [cntrValue, setCounterValue])
  const throttledBtnOnClick = throttle(333, btnOnClick)
  return (
    <Container>
      <Counter value={cntrValue} />
      <Button color={btnColor} onClick={throttledBtnOnClick}>
        Press me!
      </Button>
    </Container>
  )
}

export default App
