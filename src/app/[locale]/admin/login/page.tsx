'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified login for demo
    if (email === 'admin@noogachic.com' && password === 'Larlanco12face@@**') {
      localStorage.setItem('isAdmin', 'true');
      router.push('/admin');
    } else {
      alert('Identifiants incorrects');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h1>Connexion Admin</h1>
        <div className={styles.field}>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className={styles.field}>
          <label>Mot de passe</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className={`btn ${styles.loginBtn}`}>Se connecter</button>
      </form>
    </div>
  );
}
