'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { useRouter } from '@/navigation';

export default function NewProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nameFr: '',
    nameEn: '',
    nameAr: '',
    price: '',
    discountPrice: '',
    descriptionFr: '',
    descriptionEn: '',
    descriptionAr: '',
    category: 'heels',
    isNew: true,
    isHot: false,
    isPromo: false,
  });

  const [images, setImages] = useState<string[]>([]);
  const [sizes, setSizes] = useState([{ size: 36, stock: 10 }, { size: 37, stock: 10 }, { size: 38, stock: 10 }]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would use prisma and vercel blob
    alert('Produit enregistré avec succès dans la base de données (Simulation)');
    router.push('/admin/produits');
  };

  const handleImagePlaceholder = () => {
    const newImg = prompt('URL de l\'image (Simulation d\'upload):', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2');
    if (newImg) setImages([...images, newImg]);
  };

  return (
    <div dir="ltr">
      <h1 className="title-large">Nouveau Produit</h1>

      <form className={styles.formCard} onSubmit={handleSave}>
        <div className={styles.tabs}>
          <div className={styles.sectionHeader}>Informations Générales</div>
          
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Nom (Français) 🇫🇷</label>
              <input type="text" required value={formData.nameFr} onChange={e => setFormData({...formData, nameFr: e.target.value})} />
            </div>
            <div className={styles.field}>
              <label>Nom (English) 🇬🇧</label>
              <input type="text" required value={formData.nameEn} onChange={e => setFormData({...formData, nameEn: e.target.value})} />
            </div>
            <div className={styles.field}>
              <label>Nom (العربية) 🇲🇦</label>
              <input type="text" required dir="rtl" value={formData.nameAr} onChange={e => setFormData({...formData, nameAr: e.target.value})} />
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Prix de base (MAD)</label>
            <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          </div>
          <div className={styles.field}>
            <label>Prix promo (Optionnel)</label>
            <input type="number" value={formData.discountPrice} onChange={e => setFormData({...formData, discountPrice: e.target.value})} />
          </div>
          <div className={styles.field}>
            <label>Catégorie</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="heels">Talons</option>
              <option value="bags">Sacs</option>
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label>Description (Français)</label>
          <textarea rows={3} value={formData.descriptionFr} onChange={e => setFormData({...formData, descriptionFr: e.target.value})} />
        </div>

        <div className={styles.sectionHeader}>Variantes & Stock</div>
        <div className={styles.variantsGrid}>
          {sizes.map((s, idx) => (
            <div key={idx} className={styles.variantRow}>
              <span>Taille {s.size}</span>
              <input type="number" value={s.stock} onChange={e => {
                const newSizes = [...sizes];
                newSizes[idx].stock = parseInt(e.target.value);
                setSizes(newSizes);
              }} />
            </div>
          ))}
        </div>

        <div className={styles.sectionHeader}>Images & Galerie</div>
        <div className={styles.imageGallery}>
          {images.map((img, idx) => (
            <div key={idx} className={styles.imagePreview}>
              <img src={img} alt="Preview" />
            </div>
          ))}
          <button type="button" className={styles.addImageBtn} onClick={handleImagePlaceholder}>+</button>
        </div>

        <div className={styles.checkboxGroup}>
          <label><input type="checkbox" checked={formData.isNew} onChange={e => setFormData({...formData, isNew: e.target.checked})} /> Nouveau</label>
          <label><input type="checkbox" checked={formData.isHot} onChange={e => setFormData({...formData, isHot: e.target.checked})} /> Best Seller (HOT)</label>
          <label><input type="checkbox" checked={formData.isPromo} onChange={e => setFormData({...formData, isPromo: e.target.checked})} /> En Promotion</label>
        </div>

        <div className={styles.actions}>
          <button type="submit" className="btn">Créer le produit</button>
          <button type="button" className="btn btn-secondary" onClick={() => router.back()}>Annuler</button>
        </div>
      </form>
    </div>
  );
}
