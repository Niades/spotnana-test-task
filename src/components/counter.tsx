import { useState } from 'react'
import styles from './counter.module.css'

const Counter: React.FC = () => {
  const [value] = useState<number>(0)
  return <span className={styles.counter}>{value}</span>
}

export { Counter }
