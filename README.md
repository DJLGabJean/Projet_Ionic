# README

## MineEvolve

Vous souhaitez apprendre des notions de Minecraft d'une façon plus rapide que sur les sites wiki ? Vous êtes bien sur la bonne application.
MineEvolve vous permet d'apprendre les recettes de crafting de Minecraft de manière plus simple et condensé.


## Prérequis

Le projet comporte le framework Ionic ainsi qu'une base de données Firebase

https://ionicframework.com/
https://firebase.google.com/


Pour commencer, exécuter cette commande pour installer les dépendances du projet  :

```bash
npm install
```

## Lancement de l'application sur navigateur web

Cette commande permet de lancer l'application sur votre navigateur web par défaut :

```bash
ionic serve --open
```

Pour quitter l'application, n'oubliez pas de maintenir les touches CTRL+C

## Lancement de l'application sur Android

Pour pouvoir lancer l'application sur votre Android, il vous faut créer une APK

D'abord, on exécute cette commande :

```bash
ionic capacitor sync android --prod
```

> [!NOTE]
> Cette commande va permettre de synchroniser les fichiers du projet Ionic pour une application Android, en utilisant Capacitor, et construit une version de production de l'application.

Ensuite, on se dirige vers le dossier android :

```bash
cd android
```

Puis on utilise Gradle :

```bash
./gradlew assembleDebug
```
> [!NOTE]
> Cette commande permet d'assembler et générer un package de débogage pour une application Android

Enfin, on récupère l'APK de notre application et on met sur notre Android pour l'installer :

Le _chemin_ est `android/app/build/outputs/apk/app-debug.apk`
