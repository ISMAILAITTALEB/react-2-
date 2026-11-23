# Gestion des étudiants

Ce petit projet permet de gérer une liste d'étudiants avec React.

## Lancer le projet

1. Installer Node.js.
2. Ouvrir un terminal dans le dossier du projet.
3. Installer les paquets :

```bash
npm install
```

4. Démarrer le site :

```bash
npm run dev
```

5. Ouvrir dans le navigateur l'adresse affichée dans le terminal.

## Fonctions

- Afficher la liste des étudiants.
- Ajouter un étudiant.
- Modifier un étudiant.
- Supprimer un étudiant.
- Rechercher par nom et par ville.
- Afficher le nombre d'étudiants, la meilleure note, la plus petite note et la moyenne de la classe.

## Organisation

```text
student-manager-basic/
├── index.html
├── package.json
└── src/
    ├── main.jsx
    └── App.jsx
```

## Comprendre le code

- `useState` garde les informations qui changent dans la page.
- `etudiants` contient la liste des étudiants.
- `setEtudiants` permet de modifier cette liste.
- `map` parcourt la liste pour afficher les lignes du tableau.
- `filter` sert à rechercher ou supprimer un étudiant.
- `enregistrerEtudiant` ajoute un étudiant ou enregistre ses modifications.
- `modifierEtudiant` place les informations choisies dans le formulaire.
- `supprimerEtudiant` retire un étudiant de la liste.

Le projet utilise volontairement une structure courte et du HTML simple pour être facile à lire quand on débute avec React.
