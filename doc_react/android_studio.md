# Android Studio sur Windows

## Installer chocolatey

site : https://chocolatey.org/

- 0) - Désactiver tout vos anti-virus et pare-feu sur votre ordi

- 1) - Sur le site Chocolatey, cliquer sur Insall Now : https://chocolatey.org/install

- 2) - Aller directement a l'étape 2 (step 2: Choose Your Installation Method)

- 3) - Ouvrir le PowerShell en tant qu'administrateur

- 4) - executer cette commande dans le PowerShell

    > Get-ExecutionPolicy

    Si ça retourne : `Restricted`, executer cette commande dans le PowerShell

    > Set-ExecutionPolicy AllSigned

    et entrer yes

- 5) - executer cette commande dans le PowerShell

    > Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

- 6) - pour savoir si Chocolatey a bien été installer, executer cette commande dans le PowerShell

    > choco

    S'il y a ecrit Chocolatey avec un numéro de version c'est que c'est bon. exemple : Chocolatey v0.10.15

- 7) - Ré-activer tout vos anti-virus et pare-feu sur votre ordi

## Installer Android Studio

- 1) - installer node, python2 et jdk8, executer cette commande en CLI

    > choco install -y nodejs.install python2 openjdk8


- 2) - Télécharger et installer Android Studio : https://developer.android.com/studio

- 3) - Ouvrir Android Studio et aller dans `Config -> Appearance & Behavior -> System Settings -> Android SDK` pour choisir un SDK

- 4) - Aller dans les Variable d'environnement système de votre ordi, 

    - clique sur le bouton `Nouvelle`
    - dans nom de variable , entrer : ANDROID_HOME
    - Dans valeur de variable, entrer le chemin de votre SDK de Android exemple, C:\Users\votre_nom_d_user\AppData\Local\Android\Sdk
    - clique sur ok

- 5) - pour verifier si c'est bien fait. Ouvrer le PowerShell et entrer cette commande et vérifier si vous retouver ANDROID_HOME

    > Get-ChildItem -Path Env:\ 

- 6) - Aller dans les Variable d'environnement système de votre ordi,

    - Sélectionner la variable `Path` 
    - clique sur modifier
    - puis clique sur nouveau
    - entrer le chemin du dossier platform-tools : C:\Users\votre_nom\AppData\Local\Android\Sdk\platform-tools

Bravo !!!