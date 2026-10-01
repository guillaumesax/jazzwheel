# V3 · proposition projection pour jam session

Le parcours principal reste celui de la roue de la fortune : **lancer la roue → découvrir le standard gagnant → afficher sa grille et ses gammes en projection → revenir à la roue pour rejouer**. L'onglet **Sélection** ouvre exactement la même vue projection après le choix manuel d'un morceau. Les anciens liens `/#standard/...` ouvrent aussi la vue projection ; les liens directs `/#projection/...` restent possibles. Cette V3 reste une branche locale dédiée, sans publication. Le sélecteur en haut change de morceau sans quitter la projection. Les touches `1`, `2`, `3` choisissent respectivement concert, si♭ et mi♭ ; `Échap` revient à la roue. Le choix des altérations et de la transposition est mémorisé localement.

## Composition de l'écran

- Une seule page paysage : titre et gamme repère en haut, grille complète à gauche, modes/gammes et notes à droite. Les accords **et** les gammes suivent le même instrument.
- Chaque gamme affiche deux lignes de notes : l'écriture internationale utilisée dans les grilles (`Ab · Bb · C…`), puis les noms français (`Lab · Sib · Do…`). `Bb` correspond à **Sib**.
- La roue animée reste la première vue du parcours. Son diamètre s'adapte à la hauteur d'un projecteur 16:9 pour montrer le disque entier, le bouton GO et le repère du gagnant sans défilement.
- Quatre mesures par ligne. Cela donne 3 lignes pour 12 mesures, 4 pour 16, 6 pour 24 et 8 pour 32. Deux accords dans une case représentent deux changements dans la mesure.
- Les 17 grilles proviennent des partitions en Mi♭ du dossier fourni. Elles sont transposées en sons réels dans les données ; la page propose ensuite les parties en Si♭ et Mi♭. Le lien « Partition Mi♭ » permet de comparer chaque grille à sa feuille. *So What* suit la forme 16–8–8 et *Maiden Voyage* la forme 8–8–8. Les reprises et les fins alternatives sont précisées en bas de grille.
- Fond bleu nuit, texte blanc et notes jaune clair. Les bordures turquoise marquent les débuts de phrases. Le contraste clair/foncé et les numéros de mesures rendent la structure repérable sans dépendre de la couleur seule.
- À 1366×768, le titre est d'environ 45 px ; les accords simples sont d'environ 20 px, les accords doubles 16 px et les notes de gamme 18 px. À 1920×1080, ces valeurs montent jusqu'à 62, 29, 21 et 21 px. Les descriptions de gamme restent secondaires et plus petites. La densité d'une grille de 32 mesures avec cinq gammes impose encore une limite de lecture au fond d'une grande salle : c'est le premier point à juger sur le vidéoprojecteur réel.

## Vérification locale

`npm run build`, `npm test` et `npm run test:e2e`. Le test navigateur vérifie la roue à 1920×1080 et 1366×768, puis visite les 17 entrées du répertoire aux deux résolutions. Il vérifie le nombre de mesures et de gammes, l'absence de défilement et de contenu coupé, le trajet tirage → projection → roue, puis la transposition conjointe de la grille et des notes.

Les grilles et recommandations musicales restent celles de `data/charts.ts` et `data/tunes.ts` ; la transposition réutilise `utils/musicUtils.ts`. La lisibilité perçue dépend de la taille, de la luminosité et de la distance réelles de projection.
