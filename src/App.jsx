import { Layout, Split, Recover, Home } from "./components"
import styles from "./styles/app.module.css"

function App() {
	return (
		<Layout>
			<Home />
			<div className={styles.wrapper} id="try">
				<div className={styles.element}>
					<Split />
				</div>
				<div className={styles.element}>
					<Recover />
				</div>
			</div>
		</Layout>
	)
}

export default App
