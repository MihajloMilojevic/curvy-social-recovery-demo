import { Layout, Split, Recover, Home } from "./components"
import { DemoProvider } from "./context/demoContext"
import styles from "./styles/app.module.css"

function App() {
	return (
		<Layout>
			<Home />
			<DemoProvider>
				<div className={styles.wrapper} id="try">
					<div className={styles.element}>
						<Split />
					</div>
					<div className={styles.element}>
						<Recover />
					</div>
				</div>
			</DemoProvider>
		</Layout>
	)
}

export default App
