# Brain Challenge


## Installation

### Cloner le dépôt.

```bash
git clone https://github.com/cegepmatane/Brain-Challenge
```

### Configurer l'API

Ajouter un fichier `server-config.js` dans le répertoire `./app` du projet. Il doit contenir les URL du serveur API à utiliser. La configuration doit changer en fonction du service AWS utilisé.

#### Lambdas et s3 (branche lambda-s3)

Le fichier de configuration contient les URL des API Gateway.

```js
const API = {
  add: "https://xxxxxx.execute-api.us-east-1.amazonaws.com/default/add",
  list: "https://yyyyyy.execute-api.us-east-1.amazonaws.com/default/list",
  get: "https://zzzzzz.execute-api.us-east-1.amazonaws.com/default/get"
};
```

#### ec2 (branche ec2)

Le fichier de configuration contient l'URL du serveur web. On doit pouvoir accéder aux fichiers `./list.php`, `./get.php` et `./add.php` au niveau de l'URL. Il y a aussi le fichier `data.json` contenant toutes les données de l'application.

```js
const API = {
    URL: "http://xxxxxxxxxx.ca-central-1.compute.amazonaws.com/"
};
```

Il est aussi possible de d'indiquer une adresse IP élastique à la place de l'URL.

```js
const API = {
    URL: "http://x.x.x.x/"
};
```

#### rds (branche rds)

La configuration nécessaire pour l'utilisation de rds en plus du serveur ec2 comprend les étapes qui suivent.

1. Inscrire dans `QuestionDAO.php` à partir de la ligne 12 les identifiants de la base de données rds.

```php
// Ligne 12
		$hote = "url";	// TODO
		$usager = "user";	// TODO
		$motDePasse = "password";	// TODO
```

2. Utiliser la configuration serveur avec l'IP élastique comme vu au-dessus.

3. Déplacer le contenu du répertoire `/app/server` dans le dossier `htdocs` du serveur ec2.

### Installer les librairies nécessaires.

```bash
npm install
```

### Lancer l'application Electron.

```bash
npm start
```
