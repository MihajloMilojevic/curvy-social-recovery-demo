
import styles from "./home.module.css";

export default function Home() {
    return (
        <div className={styles.home}>
            <h1>Curvy Social Recovery Demo</h1>
            <section className={`${styles.section} ${styles.img_after}`}>
                <div className={styles.text}>
                <h2>What is Curvy?</h2>
                    <p>
                        Curvy, also known as ECPDKSAP, is a cryptographic protocol designed to enable 
                        fast and private transactions on the Ethereum blockchain. 
                        It is a Stealth Address Protocol that utilizes elliptic curve pairings to 
                        generate a unique stealth address for each transaction.
                    </p>
                    <p>
                        ECPDKSAP employs two private keys: the <b>spending key</b> and the <b>viewing key</b>. 
                        The spending key is a number from the field of the SECP256k1 curve, while the viewing key 
                        is a number from the field of the BN256 curve. 
                        The protocol leverages the pairing between these two curves to create a stealth address, 
                        ensuring enhanced privacy and unlinkability.
                    </p>
                    <p>
                        <a className={styles.button} href="https://www.0xcurvy.io/" target="_blank" rel="noreferrer">
                            Read more
                        </a>
                    </p>
                </div>
                <div className={styles.image}>
                    <img className={styles.papper} src="/curvy-paper.webp"/>
                </div>
            </section>

            <section className={`${styles.section} ${styles.img_before}`}>
                <div className={styles.text}>
                    <h2>Key Recovery</h2>
                    <p>
                        If you lose your keys, you would lose access to all stealth addresses
                        generated with that key, so it's crucial to keep it safe. 
                        However, Curvy provides a social recovery mechanism that allows you to recover your spending 
                        key using a set of trusted guardians. These guardians can collaborate 
                        to generate a recovery key, which can then be used to restore your access.
                    </p>
                    <h2>How it works?</h2>
                    <p>
                        The recovery process is initiated by the user, who generates <i>n</i> shares that are distributed
                        among the guardians. To recover the spending key, the user needs to collect at least <i>t</i> shares
                        out of the <i>n</i> shares. The recovery key is then generated using the Shamir's Secret Sharing Scheme 
                        (with some modifications).
                    </p>
                    <p>
                        <a className={styles.button} href="#try">
                            Try it now
                        </a>
                    </p>
                </div>
                <div className={styles.image}>
                    <img className={styles.key} src="/key.svg"/>
                </div>
            </section>
        </div>
    )
}