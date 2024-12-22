# README

## Minevolve

Vous souhaitez apprendre des notions de Minecraft d'une façon plus rapide que sur les sites wiki ? Vous êtes bien sur la bonne application.
Minevolve vous permet d'apprendre les recettes de crafting de Minecraft de manière plus simple et condensé.

## Prérequis

Le projet comporte le framework Ionic ainsi qu'une base de données Firebase

- [https://ionicframework.com/]
- [https://firebase.google.com/]


Pour commencer, exécuter cette commande pour installer les dépendances du projet  :

```bash
npm install
```

## Lancement de l'application sur Navigateur Web

Exécute cette commande pour lancer l'application sur votre Navigateur Web par défaut :

```bash
ionic serve --open
```

Pour quitter l'application, n'oubliez pas de maintenir les touches CTRL+C

## Lancement de l'application sur Android

> [!CAUTION]
> Une version APK est déjà disponible directement à la racine du projet

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

> [!IMPORTANT]
> Vous devez avoir la version de JAVA 17 dans les variables d'environnement (JAVA_HOME) pour pouvoir exécuter cette commande.

> [!NOTE]
> Cette commande permet d'assembler et générer un package de débogage pour une application Android

Enfin, on récupère l'APK de notre application et on la met sur notre Android pour l'installer :

Le _chemin_ de la création de l'APK sur le projet Ionic est `android/app/build/outputs/apk/app-debug.apk`


## TO DO IN FUTURE

- [ ] Dark mode/Light mode
- [ ] Inscription/Désinscription
- [ ] Connexion/Déconnexion
- [ ] Ecran de chargement
- [ ] Implémenter des tests unitaires
- [ ] Ajouter le component sur la "redstone"
    - [ ] Guides sur la redstone
    - [ ] Créer des schémas de redstone
    - [ ] Appel via une API qui existe pour récupérer des motifs persos comme des têtes par exemple
- [ ] Ajouter le component sur les "enchantements"
    - [ ] Détecter à quel niveau avoir un enchantement
    - [ ] Simuler des combinaisons d'enchantements
    - [ ] Avoir des renseignements sur les enchantements (effets, durée, etc)

## TO FIX

- [ ] Bug sur la première recette de chaque ingrédient


## TO UPGRADE
- [ ] Utilisation de la galerie photo ou d'une adresse url pour mettre une photo lors de la création ou la modification d'un ingrédient
- [ ] Affichage de la photo de l'ingrédient au lieu du nom dans la case correspondant d'une recette


