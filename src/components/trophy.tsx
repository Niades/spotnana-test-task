import IMAGE_TROPHY from "../assets/images/trophy.svg"
import styles from "./trophy.module.css";

type TrophyProps = {
  visible: boolean,
};

const Trophy: React.FC<TrophyProps> = ({visible}) => {
  return <img alt="This is a trophy for making a multiple of ten!" 
  className={styles.trophy} style={{display: visible ? 'block' : 'none'}} src={IMAGE_TROPHY} />
};

export {
  Trophy
}