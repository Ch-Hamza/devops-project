# But

Nous voulons développer une API en charge de la gestion d'une file de chiffre (qu'on appellera job).  
Cette API expose plusieurs routes:

- GET /jobs: renvoie le tableau des jobs (ex: [5,4,3,2,1])
- POST /jobs: accepte un JSON au format `{ "input": number }` et ajoute le chiffre dans la file **s'il n'est pas déjà présent à l'intérieur de la file** (ex: `{ "input": 12 }`)
- GET /job: renvoie le premier job de la file (et mets à jour la file) (ex: 12)
- DELETE /jobs: vide la file si la file est vide, on renvoie un status HTTP 204 et aucun output

Exemple d'execution: (les "`" sont là pour la mise en forme)

1. HTTP POST de `{ "input": 1 }` sur la route /jobs
2. HTTP POST de `{ "input": 2 }` sur la route /jobs
3. HTTP POST de `{ "input": 6 }` sur la route /jobs
4. HTTP POST de `{ "input": 4 }` sur la route /jobs
5. HTTP POST de `{ "input": 5 }` sur la route /jobs
6. HTTP POST de `{ "input": 1 }` sur la route /jobs (1 est déjà dans la file, pas d'insertion)
7. HTTP POST de `{ "input": 3 }` sur la route /jobs
8. HTTP GET sur la route /jobs, retour de notre API: `[3, 5, 4, 6, 2, 1]`
9. HTTP GET sur la route /job, retour de notre API: `1`
10. HTTP GET sur la route /job, retour de notre API: `2`
11. HTTP GET sur la route /jobs, retour de notre API: `[3, 5, 4, 6]`
12. HTTP POST de `{ "input": 15 }` sur la route /jobs
13. HTTP GET sur la route /jobs, retour de notre API: `[15, 3, 5, 4, 6]`
14. HTTP DELETE sur la route /jobs: `[]`
15. HTTP GET sur la route /jobs, retour de notre API: `[]`
16. HTTP GET sur la route /job, retour de notre API: <vide> (et un code HTTP 204)

## Consigne

Vous pouvez développer votre API dans le language et avec le framework que vous voulez.  
Si vous voulez développer votre API avec NodeJS, nous vous fournissons un squellete (fichier `skeleton.js`).

Nous vous fournissons aussi une testsuite `index.test.js` pour vérifier que votre API répond correctement.  
Vous pourrez considérer que votre API est bien implémentée si tous les tests passent.

## Lancer les tests fournis

Que vous développiez ou non votre API en NodeJS vous pouvez la tester avec la testsuite fournie ici.  
Pour cela, après avoir lancé votre API en local, voici les commandes à executer pour lancer la testsuite (nécessite NodeJS):

```sh
# Dans le dossier qui contient index.test.js
npm install && npm run test
```

NB: La testsuite lance les tests sur http://localhost:3111, si vous lancez l'API sur un autre port (ou autre part):

```sh
export API_URL=http://localhost:3001; npm run test
```

## Rendu

Nous acceptons les fichiers ZIP (et autres formats d'archives) qui contiennent les fichiers/documentations qui nous permettent de lire, lancer et tester votre API.

# Bonus

- Test unitaires
- Script qui permet de lancer votre API (téléchargement des dépendances + lancement de l'API)
- Dockeriser votre merveilleuse API
- Mettre en place une CI (gitlab, travis ou autre)
