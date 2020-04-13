Création d'un serveur JS

Créer un fichier index.js. 

Objectif, créer et ouvrir un serveur à l'aide du terminal. 

JS Back et JS Front sont bien différents. Il faut faire attention de ne pas les confondres. 

Nous n'avons pas accès à Window ou Document comme en front mais nous avons accès à la version V8 de Google.

Npm init permet de créer une package.json. Dans ce fichier nous retrouvons des informations à propos de notre projet. Elle sont à modifier pour notre application. 

"Name" : Nom de l'application 
"Version" : Pouvoir suivre l'évolution de l'application. 
"Main" : Le fichier à lancer pour lancer l'application. 

Pour installer des dépendances : npm install NOM-DU-PACKAGE

Installation des dépendances hapi et joi : 
npm i @hapi/hapi @hapi/joi

hapi : framework http que nous allons utiliser. 
joi : validation et typage de ce qu'on va pouvoir recevoir ou envoyer dans notre api.

^ à droite des dépendances précise que au prochain npm install, npm va installer la dernière version en ligne. 

Il faut mettre une ~ : lors d'un npm install, la version la x.x.y mais c'est le y qui est mis à jour.  

A propos du fichier package-lock.json : It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates. 

Il est important de ne jamais modifier ce fichier. 

Lors de l'installation d'une dépendance, cette dépendance peut avoir d'autre dépendance. Ce fichier conserve une arbo des différents package avec les différentes versions qui ont été installés. 

Il faut faire attention avec l'installation des dépendances, comme pour WordPress, faire attention à choisir les bonnes et faire attention qu'elles soit maintenut de façon régulière. 

Dans l'index.js il est possible d'utiliser les dépendances qu'on vient d'installer.
const Hapi = require('@hapi/hapi'); 

Dans hapi.dev : get started, fichier qui permet de créer son serveur http. https://hapi.dev/tutorials/?lang=en_US

Fonction async : à l'intérieur de cette fonction, on va être capable d'exec des fonctions asynchrone, par exemple await. 

Pour lancer le serveur : node index.js

Validation sur hapi/joi. L'étape de validation est important pour que le handler soit executé. Si les fonctions dans validation ne sont pas respectés le handler ne sera pas executé. 

Creation d'un dossier routes pour regrouper toute les routes de notre app. 

tout est module ne node js, pour exporter un module il faut faire un module.export = {
    CE QU'ON SOUHAITE EXPORTER
}

Pour l'importer il faut l'importer  avec un require : 
require('./path/du/fichier')


Conseil data : respecter les mêmes normes pour la création d'API durant le projet. 

Une bonne pratique est de retourner le statusCode, une error, un message et ensuite la data. 

Installation d'un outil pour recharger la page dès qu'on sauvegarde notre fichier. Le composant s'apl NoDemon. 

npm i nodemon -g 

Pour lancer l'application : 
'''npm run start'''

Knex.js : Query builder qui permet des requetes SQL sur une base de JS. C'est un ORM. L'ORM va créer les tables sur une base de données. 

Retour sur les bases de données : 
SQL permet de faire des requêtes sur des bases de données de type relationnel. Chaque bdd SQL implémente le langage SQL comme il le souhaite. 

Base de données OLAnaliticalProcessing (gros workload une ou deux fois par jour) ou OLTransactionnalP (temps réel). 

