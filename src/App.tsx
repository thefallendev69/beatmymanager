import UploadCard from './components/UploadCard';
import styles from './styles/App.module.scss';

function App() {
  return (
    <main className={styles.app}>
      <section className={styles.app__container}>
        <h1>BeatMyManager - Phase 1</h1>
        <p>Upload a face image, run client-side validation, and capture profile metadata.</p>
        <UploadCard />
      </section>
    </main>
  );
}

export default App;
