# Première revue — 29 septembre 2026

## Corrections réalisées

- Import complet de l'archive sans modifier le ZIP original.
- Suppression du second point d'entrée HTML, de l'importmap AI Studio et du lien CSS sans fichier correspondant.
- Styles Tailwind compilés localement : suppression du script CDN exécuté au chargement.
- Suppression de la configuration qui pouvait injecter une clé Gemini dans le code client, alors que l'application ne fait aucun appel Gemini.
- Serveur de développement limité à l'adresse locale, configuration compatible avec un hébergement dans un sous-dossier.
- Ajout d'un lockfile et des types React, activation du contrôle TypeScript strict avant chaque build.
- Remplacement de la boucle d'animation dépendante du nombre d'images par une rotation native de 4,2 secondes. Le canvas est dessiné lors d'un changement de répertoire ; React ne rend plus chaque image du tirage.
- Choix uniforme parmi les morceaux filtrés ; arrêt au centre du segment correspondant. Protection contre les doubles lancements.
- Désactivation des filtres et du changement de mode pendant le tirage pour garder un résultat cohérent avec la roue.
- Validation des préférences enregistrées et récupération en cas de JSON corrompu ou de stockage bloqué.
- Suppression d'une sélection manuelle devenue incompatible avec les filtres.
- Fenêtre de résultat native : focus, parcours au clavier, touche Échap, retour du focus et défilement sur petit écran.
- Réduction des animations selon les préférences d'accessibilité du système ; tirage immédiat en mode mouvement réduit.
- Boutons identifiés, états annoncés, focus visible, cibles tactiles agrandies et état explicite lorsqu'aucun morceau ne correspond.
- Titres et cartes de gammes adaptés aux petits écrans, contrastes améliorés, noms complets des gammes en français.
- Transpositions corrigées pour les intervalles négatifs et les enharmonies Cb/B#, préservation de la graphie d'origine en tonalité concert avec le mode Auto.
- Conservation du mode, des filtres et de la sélection lors du retour depuis les gammes. Liens directs et navigation avec l'historique du navigateur.
- Chargement séparé de la page des gammes.

## Validation

- Build de production et contrôle TypeScript strict.
- 25 tests de logique : transposition, filtres, stockage indisponible, cohérence de l'arrêt et validité structurelle du répertoire.
- 10 tests navigateur Chromium, répartis sur ordinateur et mobile : navigation, rechargement, filtres vides, sélection obsolète, tirages répétés, mise à jour du parent pendant un tirage, focus de la fenêtre, Échap et réduction des animations.

## Contenu musical à reprendre lors d'une prochaine étape

Les propositions musicales sont celles de l'archive ; les tests valident la transposition des fondamentales, pas la justesse pédagogique de chaque recommandation ni une grille harmonique complète. Le mode Auto choisit des graphies usuelles, sans calcul de l'armure selon le mode de la gamme.

Une revue pédagogique mérite notamment de clarifier la mention « altérée » associée à une gamme mixolydienne dans Autumn Leaves, le nombre de mesures indiqué pour la section A de So What, et les accords couverts par les recommandations de Maiden Voyage. Une grille de référence ou la version jouée en cours permettra de trancher sans changer arbitrairement les choix de tonalité et d'arrangement.

Il n'y a ni partition, ni lecture audio, ni notes détaillées des gammes dans le projet initial. Ces fonctionnalités et la publication restent à décider ultérieurement.
