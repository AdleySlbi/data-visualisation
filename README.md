# Documentation, DATA Team 13
@ToDo décrire le projet
Il y a deux fichiers majeurs sur ce projet. Le back en Angular 9 dans le dossier `front-angular` et le dossier serveur node.js qui sert de serveur et de back dans le dossier `server-node`. 

Chaque dossier aura sa partie de dédier dans cette documentation. 

*Vision marketing apporté par Hugo DUHAMEL. Conception graphique réalisé par Rachel WU, Zachary BENSALEM, Arthur DEBROUCKER. Projet réalisé par Adley SALABI pour la conception technique.* 

## SERVER-NODE | back
@TO-DO : Expliquer le système de root et la liaison avec l'API. 

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
```
SELECT DISTINCT id, ((SUM(hd.from_gen_to_consumer) / (SUM(hd.from_gen_to_consumer) + SUM(hd.from_gen_to_grid))) * 100) FROM history_daily AS hd INNER JOIN history_fronius AS hf ON hf.device_id = UUID(hd.id) GROUP BY id;
```

### Utilisation de .Env 
Dans le dossier .env de notre serveur node, nous avons laissé toute les données sensibles dans ce fichier afin qu'elle ne soit pas récupérable sur le dossier git du projet. 

## FRONT-ANGULAR | front

Le front de ce projet est réalisé en Angular 8. 

### Gestion des Modules & Composants 
Nous procéderons à une gestion par module pour tous les composants créés. Chaque outils sera encapsulé dans son propre `module`.  

Le rôle de ce `composant` sera de traiter les données nécessaire au fonctionnement de l'outils c'est lui qui sera en lien direct avec les différents `services`. 

Les autres composants du modules seront des des composants de présentations. 

On essayera de ne pas depasser  3 niveaux de profondeur hierarchique pour les repertoires

##### Module

Chaque outils sera encapsulé dans son propre `module`. 

Il sera créé de la manière suivante depuis le repertorie src du projet: 

    ng g m MODULE_NAME [-m=OTHER_MODULE_NAME]

Cette commande créera directement un module du nom `MODULE_NAME` dans le répertorie `MODULE_NAME` en le déclarant dans le module `OTHER_MODULE_NAME`  

donc pour créer l'outils "HOME" nous ferons:
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


Ce composant servira uniquement à definir la structure de l'outils en appelant les differents composant le definissant et à gérer les données du modules.

Tous les appels de webservices depuis l'API se feront à partir de ce composant. Ainsi il devra importer les informations necessaires concernat l'operation qu'il souhaite utiliser. Il est important d'importer le service ApiService de la sorte pour pouvoir utiliser les appels d'API : 
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
    APILink = "http://localhost:3000/api";
    public getApi() {
        console.log("this is the service");
        console.log(this.http.get(this.APILink));
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


<!-- ###### Services :  -->


### UI-Kit 
#### Material Design
Pour mener à bien le projet, nous utiliserons la bibliothèque Material Design directement proposé par Angular. Cette bibliothèque est disponible à l'adresse suivante : [Angular Material Design Components](https://material.angular.io/components/categories)

Une liste de composants est directement proposé par Angular. Elle est utilisable très facilement à la manière d'un composant. Cela permet de garder une homogénéité entre les composants material du projet. 

En suivant les instructions de la documentation un thème sera mis en place pour respecter la charte graphique recommandé. [Angular Theming](https://material.angular.io/guide/theming)  

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


