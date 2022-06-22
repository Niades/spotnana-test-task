import styles from './counter.module.css'

type CounterProps = {
  value: number,
};

const Counter: React.FC<CounterProps> = ({value}) => {
  return <span className={styles.counter}>{value}</span>
}

export { Counter }
