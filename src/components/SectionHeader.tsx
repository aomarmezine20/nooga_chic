import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeader({ title, subtitle, center = true }: SectionHeaderProps) {
  return (
    <div className={`${styles.wrapper} ${center ? styles.center : ''}`}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.line}></div>
    </div>
  );
}
