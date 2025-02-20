import styles from './navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <a href="/" className={styles.logo}>
                <img src='/curvy.svg' alt='logo' />
                <span>Curvy Social Recovery</span>
            </a>
            <ul className={styles.navlinks}>
                <li>
                    <a target="_blank" href='https://www.0xcurvy.io/'>Curvy</a>
                </li>
                <li>
                    <a target="_blank" href='https://github.com/0x3327/curvy-social-recovery'>Code</a>
                </li>
                <li>
                    <a href='#try'>Try Out</a>
                </li>
            </ul>
        </nav>
    )
}