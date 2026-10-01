# Jazz Wheel Pro

Application React/TypeScript pour choisir un standard de jazz par tirage au sort ou dans le répertoire, filtrer par style, tempo et complexité, puis afficher les notes des gammes conseillées et les grilles d’accords en tonalité concert et pour instruments en Bb / Eb.

Projet importé de Google AI Studio, puis fiabilisé dans Codex. Le répertoire comporte les 17 morceaux présents dans le dossier de partitions fourni pour la jam session.

Les grilles de `data/charts.ts` contiennent uniquement les symboles d’accords, sans mélodie. Elles sont relevées des 17 partitions en Mi♭ du dossier fourni, puis converties en sons réels ; un lien vers la partition exacte figure sur chaque écran de projection. Une case vaut une mesure écrite. Les consignes de reprise, les fins alternatives et les suggestions de gamme de la feuille sont précisées dans la grille ou les recommandations.

## Démarrer

Node.js 22.12 ou supérieur est recommandé.

```sh
npm ci
npm run dev
```

Ouvrir http://127.0.0.1:3000. Aucune clé API ni compte Google n'est nécessaire.

## Vérifier et construire

```sh
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Les tests navigateur vérifient la version construite, sur ordinateur et avec un viewport mobile de 375 px. Leur serveur utilise le port 4174 et peut fonctionner en parallèle du serveur de développement.

```sh
npm run preview
```

La commande affiche l'adresse de l'aperçu de production. Les fichiers publiables sont dans `dist/`. La publication est déclenchée par le workflow GitHub Pages de ce dépôt lors d’un push sur `main`. La version publique est accessible à https://guillaumesax.github.io/jazzwheel/.

## Organisation

- `data/tunes.ts` : répertoire, catégories et propositions de gammes.
- `data/charts.ts` : grilles d’accords et provenance, une case par mesure écrite.
- `components/Wheel.tsx` : dessin de la roue et animation native du navigateur.
- `components/ResultDialog.tsx` : fenêtre de résultat accessible au clavier.
- `pages/` : roue et affichage projeté de la grille et des gammes.
- `utils/` : transposition, filtres, stockage et calcul de rotation.
- `tests/` : tests de logique et parcours navigateur.

Les préférences restent sur l'appareil via `localStorage`. Si celui-ci est indisponible ou contient des données invalides, l'application reste utilisable. Les gammes d'un standard peuvent être ouvertes directement avec une URL telle que `/#standard/blue-bossa`.

Tailwind est compilé dans le projet. La police Google Fonts est facultative : une police système prend le relais si elle ne charge pas. L'application n'utilise aucun service d'IA.

Voir `REVIEW.md` pour le détail de cette première revue et les points à reprendre ultérieurement.
