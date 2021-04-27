# Creer un projet react native avec la libairie viro media

## Pour créer un projet react-native dans l'invite de commande (CMD) windows

Installer react.js (en globale)

    > npm install -g create-react-app

Puis installer la cli de react-native (en globale) dans l'invite de commande (CMD) windows

    > npm install -g react-native-cli

Puis faite, la commande ci-dessous pour vérifier que c'est bien installer 

    > react-native -v


## Installer la libairie viro media 

Dans l'invite de commande (CMD) windows

    > react-native init ViroSample --version=0.59.3

Ou cette version qui permettra de ne pas avoir d'erreur après avoir fait la commande `> npm install -S -E react-viro`

    > react-native init ViroSample --version=0.59.9

remarque : La version 0.59.9 ne passe pas sur Android studio

Puis 

    > cd ViroSample

Puis toujours dans l'invite de commande (CMD) windows

    > npm install -S -E react-viro

Si à cette étape il y a des erreurs lors de l'installation rajouter --legacy-peer-deps

    > npm install -S -E react-viro --legacy-peer-deps


Puis 


    Copiez les fichiers de node_modules \ react-viro \ bin \ files \ javascript \ * à la racine de votre répertoire.

    Cela devrait remplacer les fichiers index.js et App.js et ajouter metro.config.js, rn-cli.config.js et un répertoire js / à votre projet ViroSample.

Puis

    > npm start

S'il y a cette erreur après le npm start

    error Invalid regular expression: /(.*\\__fixtures__\\.*|node_modules[\\\]react[\\\]dist[\\\].*|website\\node_modules\\.*|heapCapture\\bundle\.js|.*\\__tests__\\.*)$/: Unterminated character class. Run CLI with --verbose flag for more details.

Aller dans le dossier \node_modules\metro-config\src\defaults\blacklist.js et modifier la première ligne de sharedBlacklist

Avant :

    var sharedBlacklist = [
        /node_modules[/\\]react[/\\]dist[/\\].*/,
        /website\/node_modules\/.*/,
        /heapCapture\/bundle\.js/,
        /.*\/__tests__\/.*/
    ];

Après :

    var sharedBlacklist = [
        /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
        /website\/node_modules\/.*/,
        /heapCapture\/bundle\.js/,
        /.*\/__tests__\/.*/
    ];



## Télécharger viro media sur le telephone et se connecter avec une adresse ngrok dans l'onglet < Enter Testbed > de viro media

Si vous n'avez pas d'adresse ngrok

## Installer ngrok sur l'ordinateur

Télécharger le dossier zip de ngrok à cette adresse https://ngrok.com/download 

Décomprésser l'executable (le fichier `ngrok.exe`). 

- 1) Créer un dossier nommé "ngrok" spécialement pour l'executable ngrok (le fichier `ngrok.exe`), dans votre projet afin de pouvoir utiliser la commande `ngrok` dans le terminale, qui pointe sur votre projet, après avoir mis le dossier qui contient l'executable ngrok (le fichier `ngrok.exe`) dans la `variable d'environnement PATH` exemple (votre_projet/ngrok/)

ou

- 2) (Facultatif) Créer un dossier nommé "ngrok" spécialement pour l'executable ngrok (le fichier `ngrok.exe`) dans cette adresse par exemple `C:/Programmes` et mettre le dossier qui contient l'executable ngrok (le fichier `ngrok.exe`) dans la `variable d'environnement PATH`, exemple (C:/Programmes/ngrok/), afin d'utiliser la ligne de commande `ngrok` partout. 

Puis se connecter dans ngrok à cette adresse https://dashboard.ngrok.com/signup , afin de pouvoir récupérer un authtoken

Une fois récupérer le authtoken , taper en ligne de commande `> ngrok authtoken + votre authtoken` :

    > ngrok authtoken <your_auth_token>

Puis tapez dans l'invite de commande (CMD) windows `> ngrok http + le port ou est executer le projet` 

    > ngrok http 8081


## Android Studio

Utiliser Android Studio (au lieu d'utiliser l'application mobile Viro Media + ngrok), ce qui nous permettra d'utiliser les dépendances react-native de géolocalisation.

Pour utiliser la librairie ViroReact avec Android Studio , il faut :

- 1) Bien installer Android Studio, et brancher son téléphone sur l'ordinateur avec `le mode développeur activer et Débogage USB activer`, pour les activer il faut aller dans :
    - paramètres -> à propos du téléphone -> information sur le logiciel -> Numéro de version (cliquer 7 fois dessus)

    - retourner sur `paramètres` et clique sur l'onglet `Options de développement`

- 2) La version 0.59.3 de react native : `react-native init nom_du_projet --version=0.59.3` 

- 3) Suivre les instructions plus haut, qui sont après la commande : `react-native init nom_du_projet --version=0.59.3` 

- 4) Copier le fichier `setup-ide.sh` qui ce trouve à cette adresse `nom_du_projet\node_modules\react-viro\bin\setup-ide.sh` et le coller à la racine du projet

- 4) Ouvrir un premier Terminal et executer la commande :

    > ./setup-ide.sh --android

    ou 

    > setup-ide.sh --android

    puis

    > react-native start

Attendre que le graphique de dépendances se charge

- 5) Ouvrir un deuxième Terminal et executer la commande :

    > react-native run-android --variant=gvrDebug

Bravo !!!