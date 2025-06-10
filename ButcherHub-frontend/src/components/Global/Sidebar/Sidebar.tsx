import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo_cut.png";
import styles from "./Sidebar.module.css";

const menuItems = [
  { name: "Home",                path: "/" },
  { name: "Meat Management",     path: "/meats" },
  { name: "Buyer Management",    path: "/buyers" },
  { name: "Order Management",    path: "/orders" },
];

export function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="ButcherHub Logo" className={styles.logo} />
      </div>
      <ul>
        {menuItems.map(item => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}