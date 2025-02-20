import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            Curvy Social Recovery &copy; {new Date().getFullYear()}
        </footer>
    )
}