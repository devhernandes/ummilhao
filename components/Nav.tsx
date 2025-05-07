import Link from "next/link";
import styles from '../styles/nav.module.css';

export default function Nav() {
  return (
    // Usa as classes do objeto 'styles'
    <nav className={styles.navContainer}>
      <ul className={styles.navList}>
        <li>
          <Link href="/" className={styles.navLink}>
            <span className={styles.text}>Início</span>
          </Link>
        </li>
        <li>
          <Link href="/comprar-pixel" className={styles.navLink}>
            <span className={styles.text}>Comprar Pixel</span>
          </Link>
        </li>
        {/* Repetir para os outros links, aplicando styles.navLink, styles.icon, styles.text */}
        <li>
          <Link href="/faq" className={styles.navLink}>
            <span className={styles.text}>Faq</span>
          </Link>
        </li>
         <li>
           <Link href="/sobre-o-projeto" className={styles.navLink}>
             <span className={styles.text}>Sobre o Projeto</span>
           </Link>
         </li>
         <li>
           <Link href="/lista-de-pixels" className={styles.navLink}>
             <span className={styles.text}>Lista de Pixels</span>
          </Link>
        </li>
        <li>
           <Link href="/contato" className={styles.navLink}>
             <span className={styles.text}>Contato</span>
           </Link>
         </li>
      </ul>
    </nav>
  );
}