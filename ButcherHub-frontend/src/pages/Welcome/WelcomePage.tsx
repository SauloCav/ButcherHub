import styles from "./WelcomePage.module.css";
import logo from "../../assets/logo_cut.png";

export default function WelcomePage() {
  return (
    <div className={styles.container}>
      <img src={logo} alt="ButcherHub Logo" className={styles.logo} />
      <h1>Welcome to ButcherHub!</h1>
      <p>Manage your meat, your buyers and your orders!</p>
    </div>
  );
}