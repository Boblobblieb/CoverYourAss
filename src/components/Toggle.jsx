import styles from '../styles/Toggle.module.css';

export default function Toggle({ covered, setCovered, circleRef, pillRef }) {
  return (
    <section id={styles.spacer}>
      <div 
        id={styles.switch_container} 
        onClick={() => setCovered(() => !covered)}
      >
        <div 
          id={styles.pill} 
          ref={pillRef} 
          className={styles.border_box}
        ></div>
        <img
          id={styles.peach}
          className={styles.border_box}
          src="./peach.png"
        />
        <div
          id={styles.circle}
          ref={circleRef}
          className={styles.border_box}
        ></div>
      </div>
    </section>
  );
}
