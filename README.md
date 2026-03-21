# Finance Dashboard — PWA

## Fichiers inclus
- `index.html` — Application principale
- `manifest.json` — Manifeste PWA (icône, nom, couleurs)
- `sw.js` — Service Worker (fonctionnement offline)

---

## 📱 Installer sur Android (Chrome)

### Option A — Via hébergement web (recommandée)

1. **Hébergez les 3 fichiers** sur un serveur HTTPS :
   - [Netlify Drop](https://app.netlify.com/drop) → glissez le dossier, c'est en ligne en 30 secondes (gratuit)
   - [GitHub Pages](https://pages.github.com/) → créez un repo public, activez Pages
   - Tout hébergement supportant HTTPS

2. **Ouvrez l'URL** dans Chrome Android

3. **Installez** : menu ⋮ → "Ajouter à l'écran d'accueil"
   → L'app apparaît comme une vraie app Android, plein écran, sans barre de navigateur

---

### Option B — En local sur Android (sans internet)

1. Copiez les 3 fichiers sur votre Android (via câble USB ou Google Drive)
2. Installez l'app **Kiwi Browser** (supporte les extensions Chrome)
3. Ouvrez `index.html` depuis le gestionnaire de fichiers
> Note : sans HTTPS, le Service Worker ne s'activera pas, mais l'app fonctionnera quand même.

---

## 📊 Format du fichier Excel à importer

L'app accepte **n'importe quel format Excel** grâce au mapping de colonnes.

À l'import, vous associez manuellement :
| Champ app     | Colonne Excel (exemple)    |
|---------------|---------------------------|
| 📅 Date        | "Date", "Jour", "Day"     |
| 📝 Libellé     | "Libellé", "Description"  |
| 💶 Montant     | "Montant", "Débit/Crédit" |
| 🏷 Catégorie   | "Catégorie" (optionnel)   |
| 🔖 Sous-cat    | "Sous-catégorie" (opt.)   |

**Règle montant** :
- Valeur négative → Dépense (sortie)
- Valeur positive → Entrée

---

## ✨ Fonctionnalités

- **Dashboard** : solde total, sparkline d'évolution, résumé entrées/sorties
- **Transactions** : liste filtrée, recherche, tri par date
- **Analytics** :
  - Dépenses par catégorie (donut)
  - Évolution mensuelle (barres)
  - Comparaison mois/mois
  - Top dépenses du mois
  - Navigation mois par mois
- **Import** : Excel (.xlsx, .xls), CSV — mapping de colonnes à l'import
- **Catégories** : création, suppression, sous-catégories personnalisées
- **Données persistantes** via localStorage (restent après fermeture)
- **Ajout manuel** de transactions (entrée/sortie)
