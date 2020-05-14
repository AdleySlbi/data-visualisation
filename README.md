# Documentation, DATA Team 13
## Présentation du projet

Ce repositorie est le fichier de rendu du projet scolaire : `projet data`. J'ai eu l'occasion de réaliser en quatrième année à la Web School Factory, de Janvier à Mai.

Il y a deux dossiers majeurs dans ce projet, le [back-end](#SERVER-NODE) et le [front-end](#FRONT-ANGULAR). Une partie de la documentation est dédiée à chaque partie de ce projet. 

### Le back
Le dossier `server-node` correspond à la partie back-end de notre application. Il a été réalisé en Node.js et utilise différents package pour réaliser au mieux les appels de données depuis la base de donnée. 
[Accéder à la documentation du back](#SERVER-NODE)

### Le front
Le dossier `front-angular` correspond à la partie front-end de notre application. Il a été réalisé à l'aide du framework javascript Angular, la version 9. [Accéder à la documentation du front](#FRONT-ANGULAR)

## D'où sort ce projet? 
Ce projet est le résultat technique d'un projet de plus de 5 mois. Avant le développement technique nous avons procédé à différentes phases nottament un benchmark, une veille concurrentielle, des interviews, des sessions d'idéations, du maquettage, du prototypage ainsi que des tests utilisateurs. 

Je serai ravis de vous parler plus de ce projet lors d'une rencontre. 

*Vision marketing apporté par Hugo DUHAMEL. Conception graphique réalisé par Rachel WU, Zachary BENSALEM, Arthur DEBROUCKER. Conception technique réalisée par Adley SALABI.* 

# SERVER-NODE

## Présentation technique

### Node.js 
La partie back-end de l'application est réalisé à l'aide de la plateforme Javascript : `Node.js`. 

#### Pour installer le projet 
Pour installer tous les packages : 

Dans le dossier PROJET_DATA : 

```
cd server-node
npm install 
```

Les packages npm suivant sont installé : 
- [hapi](https://hapi.dev)
- [hapi.joi](https://hapi.dev/module/joi/)
- [demon](https://www.npmjs.com/package/demon)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [knex](https://www.npmjs.com/package/knex)
- [node-fetch](https://www.npmjs.com/package/node-fetch)

Pour lancer l'application : 
Dans le dossier server-node : 
```
npm run start
```

## Récupération des données depuis la BDD 

A l'aide du package [Hapi](https://hapi.dev/module/joi/) nous réalisons des appels vers la base de donnée. Les acccès à la base de donnée sont sécurisés et gardés en local à l'aide du package [.ENV](https://www.npmjs.com/package/dotenv.). 
C'est dans ce dossier qu'il faudra ajouter les données d'accès à la BDD. 

### Pour réaliser des requêtes SQL
Pour récupérer les données, il faudra réaliser des requêtes SQL. P il faudra créer les routes d'API. 

Dans le dossier `server-node`, après avoir ajouté les credentials de la base de donneé grâce au schéma suivant : 
```
DB_HOST='host'
DB_USER='user'
DB_PASSWORD='password'
DB_TYPE='postgres'
```

Il faut se rendre dans le fichier `index.js`. Dans ce fichier, on trouvera dans la fonction init des varables qui permettent d'accéder aux données que nous souhaitons. 

Pour créer une nouvelle route il faudra ajouter la ligne suivante : 
```
server.route(require('./routes/fichier-qui-contient-la-fonction-appel-api').fonction-appel-api);
```

Il faudra ensuite créer un fichier dans le dossier routes pour ajouter une `fonction-appel-api`. 

Dans le fichier `./routes/fichier-qui-contient-la-fonction-appel-api` :
```
const joi = require('@hapi/joi');

// Permet d'importer les credentiels
const db = require('../config/database')

// Récupère tous les clients sans filtre
exports.mes_clients = {

    // Méthode de la requête 
    method: 'GET',
    
    // Path pour acceder à la requête
    path: '/mes-clients',

    // Fonction qui permet de retourner la donnée
    handler: (request, h) => {
        // Requête SQL qui retourne les valeurs souhaité dans la requête. 
        return db.raw("SELECT ci.*, SUM(hd.from_gen_to_consumer) AS gtc , SUM(hd.from_gen_to_grid) as gtg FROM client_info AS ci INNER JOIN history_daily AS hd ON UUID(hd.id) = ci.id GROUP BY ci.id");
    }
} 
```

On récuperera la donnée en accédant à l'url [http://localhost:3000/mes-clients](http://localhost:3000/mes-clients).

### Requêtes SQL importantes : 
Récupérer les ID commun aux tables `history_daily` & `history_fronius` : 
```
SELECT DISTINCT hd.id, hf.device_id FROM history_daily AS hd INNER JOIN history_fronius AS hf ON hf.device_id = UUID(hd.id)
```

Récupérer les infos des clients pour les ajouter dans une nouvelle table `client_info`: 

```
INSERT INTO client_info(id, name, adresse, zipcode, country, modele_panneau)
SELECT DISTINCT UUID(hd.id), hd.name, hd.street, hd.zipcode, hd.country, hf.device_type  FROM history_daily AS hd INNER JOIN history_fronius AS hf ON hf.device_id = UUID(hd.id)
```

Récupérer le taux d'auto-consommation par client : 

/!\ Il ne faut pas utiliser cette fonction SQL. La fonction est longue car elle réalise des calculs directement dans la requête. SQL n'est pas un langage optimisé pour réaliser des appels de données de la sorte. Il faut récupérer la donnée puis traiter ces dernières et réaliser le calcul dans le back-end ou le front-end de l'application. /!\
```
SELECT DISTINCT id, ((SUM(hd.from_gen_to_consumer) / (SUM(hd.from_gen_to_consumer) + SUM(hd.from_gen_to_grid))) * 100) FROM history_daily AS hd INNER JOIN history_fronius AS hf ON hf.device_id = UUID(hd.id) GROUP BY id;
```

## FRONT-ANGULAR
La partie front-end de ce projet est réalisé en Angular 9.  

### Pour installer le projet 
Pour installer tous les packages : 

Dans le dossier PROJET_DATA : 

```
cd front-angular
cd projet-data-front
npm install 
```

Angular va installer toute ses dépendances aux différents packages qui composent Angular. 

Une fois que tous les packages sont installés : 

Dans le dossier projet-data-front : 
```
ng serve -o
```
Cette commande permettra de démarrer le serveur qui va faire tourner l'application angular. L'ajout du `-o` après la commande `ng serve` permet d'ouvrir directement la web app sur le navigateur web. 

*Vous retrouverez ci-dessous une explication de la mise en place de l'application Angular*

### Gestion des Modules & Composants 
Nous procéderons à une gestion par module pour tous les composants créés. Chaque outils sera encapsulé dans son propre `module`.  

Le rôle de ce `composant` sera de traiter les données nécessaire au fonctionnement de l'outils c'est lui qui sera en lien direct avec les différents [`services`](#Services). 

Les autres composants du modules seront des des composants de présentations. 

On essayera de ne pas depasser  3 niveaux de profondeur hierarchique pour les repertoires

##### Module

Chaque outils sera encapsulé dans son propre `module`. 

Il sera créé de la manière suivante depuis le repertorie src du projet: 
```
ng g m MODULE_NAME [-m=OTHER_MODULE_NAME]
````

Cette commande créera directement un module du nom `MODULE_NAME` dans le répertorie `MODULE_NAME` en le déclarant dans le module `OTHER_MODULE_NAME`. Pour créer l'outils "HOME" nous ferons:
```    
ng g m home -m=app
```

#### Composant
Le composant de base aura le même nom que le module et sera créé de la manière suivante: 

```
ng g c MODULE_NAME/COMPOSANT_NAME --export
```
donc dans notre exemple pour l'outils comp nous aurons: 

    ng g c home/home --export


Ce composant servira uniquement à definir la structure de l'outil en appelant les differents composants le definissant et à gérer les données du modules.

Tous les appels de webservices depuis l'API se feront à partir de ce composant. Ainsi il devra importer les informations necessaires concernant l'operation qu'il souhaite utiliser. Il est important d'importer le service ApiService de la sorte pour pouvoir utiliser les appels d'API : 
``` 
import { ApiService } from './services/api.service'; 
```

Pour l'utiliser, ne pas oublier de le déclarer dans le constructor de la sorte : 
```
constructor(
    private apiservice: ApiService,
){}
```

#### Shared
Dans le module Shared, nous placerons tous les composants qui seront créé  afin d'être utilisé dans plusieurs composant. 

Pour créer un composant Shared : 

```
ng g c shared/COMPOSANT_NAME --export
```

#### Utilisation de l'API 
Pour importer les données depuis l'API : 
1. Réaliser une fonction qui va réaliser la requête souhaité (lien de l'API) dans le service `api.service.ts`. 
Dans le fichier api.service.ts : 
    ```
    // Lien définit dans le fichier './server-node/routes/clients.js'
    APILink = "http://localhost:3000/mes-clients";
    public getApi() {
        return this.http.get(this.APILink);
    }
    ```
2. Dans le composant principal de l'outil, il faut importer le service ApiService de la sorte : 
    ```
    import { ApiService } from './services/api.service';
    ```
    Il faut également le déclarer dans le constructor du composant principal de la sorte : 
    ```
    constructor(
        private apiservice: ApiService,
    ){}
    ```


3. Toujours dans le composant principal de l'outil, nous déclarerons une variable vide pour y affecter la donnée récupéré via l'api. 
Une fonction qui appelera la fonction du `ApiService` affectera la donnée récupéré dans le service pour l'affecter à la variable vide déclaré avant la fonction.
Tous les appels de données se feront dans ce composant pour avoir une vue d'ensemble sur les données. 

    Dans le `home.component.ts`  : 
    ```
    outputApi = null;
    showApi(){
        this.apiservice.getApi().subscribe((data) => {
            this.outputApi = data;
        } );
    }
    ```


### Services : 

Les services servent principalement à récupérer des données ou des fonctions dans différents composants d'une application Angular. Les services sont des objets qui récupèrent des fonctions durant seulement un [cycle de vie (lifecycle-hooks)](https://angular.io/guide/lifecycle-hooks) d'appel.

### UI-Kit 
#### Material Design
Pour mener à bien le projet, nous utiliserons la bibliothèque Material Design directement par Angular. Cette bibliothèque est disponible à l'adresse suivante : [Angular Material Design Components](https://material.angular.io/components/categories). 

Une liste de composants est directement proposé par Angular. Elle est utilisable très facilement à la manière d'un composant. Cela permet de garder une homogénéité entre les composants material du projet. 

En suivant les instructions de la documentation un thème sera mit en place pour respecter la charte graphique recommandé. [Angular Theming](https://material.angular.io/guide/theming)  

*Contraintes* : certains éléments ne peuvent pas totalement être modifié ou que partiellement. C'est pourquoi lors de l'utilisation de certain composant material design, il est impératif de voir à quel degré le composant Material peut être modifié.  

#### Graphiques

Pour les graphiques, nous utiliserons la bibliothèque de graphiques [Chart.js](https://www.chartjs.org/).  

Si nous sommes amenés à utiliser des cartes lors de la réalisation de notre dashboard, nous utiliserons [kepler.js](https://kepler.gl/), un puissant framework open source qui permet de faire des visualisations sur des cartes. 

*Contraintes* : Les maps avec kepler prennent du temps à faire c'est pourquoi je demande à les réaliser que une fois que nous sommes sur de garder / réaliser cette map. 
Avec la bibliothèque Chart.Js en réalisant une maquette de diagramme j'ai besoin d'avoir toute les données renseigné. 

#### Chart.js, utilisation 

Afin d'utiliser au mieux la bibliothèque de graphique Chart.js, nous avons créé un composant dans le dossier `shared` pour faciliter son utilisation. 

Pour utiliser le composant graphique et générer un graphique, il faudra créer une div et appeler le composant `app-graph`qui contient une base pour intégrer des composants chart.js.

Avec l'appel du composant `app-graph` il faudra passer des paramètres qui permetrons de constituer le graph : 
- chartType : le type de graphique (bar, line, etc)
- chartDatasets : le jeu de donné qui sera utilisé pour construire le graphique
- chartLabel : les label qui seront utilisé pour construire le graphique
- chartOptions : pour ajouter des options sur le graphique. 

Pour comprendre l'utilisation de Chart.js se rendre sur [la documentation officiel](https://www.chartjs.org/docs/latest/) de Chart.js. 

### Router pour le front 
Afin de naviguer dans notre application, le composant `app-routing.module.ts` a été mit en place. 

Dans ce composant il faudra créer les routes possible vers les composants créés. Pour cela il faudra importer le composant au haut du fichier. 

Exemple avec `TestGraphComponent` : 

```
import { TestGraphComponent } from './test-graph/test-graph.component';
```

Ensuite il faudra déclarer le chemin (path) qui sera affiché dans la barre URL et le component vers lequel pointer dans la demande du chemin dans la const routes du fichier `app-routing.module.ts` : 

```
{
path: 'graph',
component: TestGraphComponent
}
```

En mettant l'adresse : `http://localhost:4200/graph` nous accederons donc au composant `TestGraphComponent`. 

#### Créer des liens dans l'application
Dans le cas où nous créerons des liens dans l'application, il suffit de rentrer ce que nous avons mis dans le `path` pour acceder au composant. Exemple pour arriver au composant TestGrapComponent : 
```
<a href="/graph"> Accéder au composant Graph </a>
```