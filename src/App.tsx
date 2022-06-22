import { useState, useCallback, useEffect } from 'react'
import type { ReactNode } from 'react'
import { throttle } from 'throttle-debounce'
import PLazy from 'p-lazy'
import styles from './App.module.css'
import { Button } from '../src/components/button'
import { Counter } from '../src/components/counter'
import { Trophy } from './components/trophy'

const IDLE_TIMEOUT = 10000
const CLICK_THROTTLE = 333
const OVERDRIVE_CHANCE = 5 // in %
const OVERDRIVE_LENGTH = 10 // in seconds
const PALETTE = ['#DEC5E3', '#CDEDFD', '#B6DCFE', '#B6DCFE', '#81F7E5']

type TimerProps = {
  secondsPassed: number
  visible: boolean
}

type ContainerProps = {
  children?: ReactNode
}

function pickRandomColorFromPallete() {
  return PALETTE[Math.floor(Math.random() * PALETTE.length)]
}

const Timer: React.FC<TimerProps> = ({ secondsPassed, visible }) => {
  return (
    <span
      style={{ display: visible ? 'block' : 'none' }}
      className={styles.timer}
    >
      {OVERDRIVE_LENGTH - secondsPassed}
    </span>
  )
}

const Container: React.FC<ContainerProps> = (props) => {
  const { children } = props
  return <div className={styles.container}>{children}</div>
}

const App: React.FC = () => {
  const [trophyVisible, setTrophyVisible] = useState<boolean>(false)
  const [cntrValue, setCntrValue] = useState<number>(0)
  const [inOverdrive, setInoverdrive] = useState<boolean>(false)
  const [overdriveSeconds, setOverdriveSeconds] = useState<number>(0)
  const setCounterValue = useCallback(
    (newValue: number): void => {
      // Trophy code
      const valueIncrements = newValue > cntrValue
      if (!valueIncrements) {
        setTrophyVisible(false)
        // Never less than zero code
      } else if (newValue !== 0 && newValue % 10 === 0) {
        setTrophyVisible(true)
      }
      if (newValue < 0) {
        newValue = 0
      }
      if (inOverdrive) {
        if (valueIncrements) {
          console.log({
            newValue,
            cntrValue,
            newV: newValue + (newValue - cntrValue) * 2,
          })
          setCntrValue(cntrValue + (newValue - cntrValue) * 2)
        }
      } else {
        setCntrValue(newValue)
      }
    },
    [cntrValue, setCntrValue, inOverdrive],
  )
  const [btnColor, setBtnColor] = useState<string>(pickRandomColorFromPallete())
  useEffect(() => {
    // Decreasing interval
    const createDecreasingInterval = function () {
      function createInterval(): number {
        return window.setInterval(() => {
          setCounterValue(cntrValue - 1)
        }, 1000)
      }
      return new PLazy((resolve) => {
        resolve(createInterval())
      })
    }
    let decreasingInterval: number = -1
    const interval = window.setInterval(() => {
      setBtnColor(pickRandomColorFromPallete())
      if (decreasingInterval === -1) {
        createDecreasingInterval().then(
          // @ts-expect-error
          (interval) => (decreasingInterval = interval),
        )
      }
    }, IDLE_TIMEOUT)

    return () => {
      window.clearInterval(interval)
      window.clearInterval(decreasingInterval)
      decreasingInterval = -1
    }
  }, [cntrValue, setCounterValue, inOverdrive])

  // Overdrive
  useEffect(() => {
    // 5% chance
    let overDriveTimeout: number = -1
    if (Math.random() >= 1 - OVERDRIVE_CHANCE / 100) {
      console.log('[useEffect-Overdrive]: in overdrive')
      const restartOverdriveTimeout = () => {
        if (overDriveTimeout !== -1) {
          console.log('resetting existing overdrive timeout')
          window.clearTimeout(overDriveTimeout)
        }
        console.log('enabling overdrive turn off timer')
        window.setTimeout(() => console.log('hello world'), 1000)
        overDriveTimeout = window.setTimeout(() => {
          console.log('[useEffect-Overdrive]: turning off overdrive')
          setInoverdrive(false)
        }, OVERDRIVE_LENGTH * 1000)
        console.log({ timeout: OVERDRIVE_LENGTH * 1000 })
      }
      console.log('[useEffect-Overdrive]: restarting overdrive timeout')
      restartOverdriveTimeout()
      setInoverdrive(true)
    } else {
      console.log("[useEffect-Overdrive]: didn't enter")
    }
    return () => {
      //window.clearTimeout(overDriveTimeout)
    }
  }, [cntrValue])

  //Overdrive timer
  useEffect(() => {
    let timerInterval = -1
    if (inOverdrive) {
      timerInterval = window.setInterval(
        () => setOverdriveSeconds(overdriveSeconds + 1),
        1000,
      )
    } else {
      setOverdriveSeconds(0)
      window.clearInterval(timerInterval)
    }
    return () => {
      window.clearInterval(timerInterval)
    }
  }, [inOverdrive, setOverdriveSeconds, overdriveSeconds])

  // The throttling
  const btnOnClick = useCallback(
    throttle(CLICK_THROTTLE, () => {
      setCounterValue(cntrValue + 1)
    }),
    [cntrValue, setCounterValue],
  )
  return (
    <Container>
      <Timer visible={inOverdrive} secondsPassed={overdriveSeconds} />
      <Trophy visible={trophyVisible} />
      <Counter value={cntrValue} />
      <Button color={btnColor} onClick={btnOnClick}>
        Press me!
      </Button>
    </Container>
  )
}

export default App
