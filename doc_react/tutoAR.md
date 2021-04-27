# Tuto AR, Créer un smiley en 3D + une boite rotative

Ce didacticiel est un guide étape par étape pour développer une application AR simple. Notre objectif à la fin de ce tutoriel est de:

- 1) Comprendre HelloWorldSceneAR.js
- 2) Placez une boîte texturée dans le monde
- 3) Ajouter un Smiley Emoji à la scène
- 4) Sélectionnez un ARPlane
- 5) Ajouter l'emoji à l'avion
- 6) Ajouter une ombre à l'emoji
- 7) Rendre l'emoji déplaçable
- 8) Animez la boîte


## Comprendre HelloWorldSceneAR.js

Ouvrez votre projet de test dans l'application Viro Media et sélectionnez l' option AR, après avoir entrer votre adresse ngrok dans l'onglet `</> Entrer Testbed` . Vous devriez voir le mot "Hello World" en superposition blanche dans la vue de la caméra de votre téléphone:


La scène qui vous est présentée avec `HelloWorldSceneAR.js`, qui est défini comme le `initialScene` dans le composant `ViroARSceneNavigator` dans `App.js`, qui sert de point d'entrée dans votre application.

ViroReact est construit sur React Native et utilise des constructions React Native pour faciliter la création d'applications AR natives. 

En plus de comprendre `Javascript`, vous devrez également comprendre certains concepts de base de `React`, tels que `JSX , les composants , les state et les props `.

Vous trouverez ci-dessous le code pour HelloWorldSceneAR :

JavaScript

    'use strict';

    import React, { Component } from 'react';

    import {StyleSheet} from 'react-native';

    import {
      ViroARScene,
      ViroText,
      ViroConstants,
    } from 'react-viro';

    export default class HelloWorldSceneAR extends Component {

      constructor() {
        super();

        // Set initial state here
        this.state = {
          text : "Initializing AR..."
        };

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
      }

      render() {
        return (
          <ViroARScene onTrackingUpdated={this._onInitialized} >
            <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
          </ViroARScene>
        );
      }

      _onInitialized(state, reason) {
        if (state == ViroConstants.TRACKING_NORMAL) {
          this.setState({
            text : "Hello World!"
          });
        } else if (state == ViroConstants.TRACKING_NONE) {
          // Handle loss of tracking
        }
      }
    }

    var styles = StyleSheet.create({
      helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',
      },
    });

    module.exports = HelloWorldSceneAR;

Voyons ce qui se passe dans le code ci-dessus ...

### Importer des composants

Le code commence par importer `React`, puis `StyleSheet` de React Native et des composants React Native et react-viro que l'application utilisera. Dans cette application, nous utilisons `ViroARScene` et `ViroText` .

JavaScript

    'use strict';

    import React, { Component } from 'react';

    import {StyleSheet} from 'react-native';

    import {
      ViroARScene,
      ViroText,
      ViroConstants
    } from 'react-viro';
  
    ...


### Classe HelloWorldSceneAR

Sous le code d'importation, nous créons une classe ES6 standard HelloWorldSceneAR qui étend un composant React qui adhère au cycle de vie du composant react. 


Commençons par le constructeur (). 
Dans le constructeur, nous appelons le constructeur super () / parent (dans Component) et nous initialisons l'état. En dessous, nous "lions" `this` aux fonctions que nous déclarons dans cette classe afin qu'elles puissent référencer cet objet.

Ensuite, nous avons la fonction render () qui détermine comment notre scène est affichée. Il est défini à l'aide de JSX qui est syntaxiquement similaire à HTML. Dans la section ci-dessous, nous passons en revue cette méthode en détail.

JavaScript

...

    export default class HelloWorldSceneAR extends Component {

      constructor() {
        super();

        // Set initial state here
        this.state = {
          text : "Initializing AR..."
        };

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
      }

      render() {
        return (

          <ViroARScene onTrackingUpdated={this._onInitialized} >
            <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
          </ViroARScene>
        );
      }

      _onInitialized(state, reason) {
        if (state == ViroConstants.TRACKING_NORMAL) {
          this.setState({
            text : "Hello World!"
          });
        } else if (state == ViroConstants.TRACKING_NONE) {
          // Handle loss of tracking
        }
      }
    }

...



- Dans l'instruction return, nous déclarons le composant de niveau supérieur: `ViroARScene`. Chaque scène AR doit avoir un `ViroARScene` comme élément le plus haut. Tous les autres composants sont des enfants de `ViroARScene`. 
Nous utilisons la fonction de rappel, onTrackingUpdated, pour appeler notre fonction _onInitialized () qui définit le texte sur "Hello World!" une fois que l'état du suivi est TRACKING_NORMAL.

- `ViroText` est déclaré ensuite. Il bascule entre "Initialisation AR ..." et "Hello World" en fonction de l'état à la position [0,0, -1] avec la police, la taille de police et la couleur spécifiées par la `propriété style`. Dans notre système de coordonnées, le spectateur fait face dans la direction négative-Z, donc fournir une coordonnée Z de -1 place l'objet devant le spectateur.


### Déclaration de styles

Après la méthode de rendu, nous déclarons les styles qui peuvent être utilisés dans notre application. Les styles représentent généralement les propriétés de mise en page des composants. Dans notre application, nous déclarons un style nommé `helloWorldTextStyle` qui décrit le type de police, la couleur, la taille et l'alignement de notre composant `ViroText`.

JavaScript

    var styles = StyleSheet.create({
      helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',  
      },
    });

    module.exports = HelloWorldSceneAR;


Maintenant que nous avons décrit le fonctionnement de notre scène, voyons comment nous pouvons l'étendre.

## Téléchargement d'actifs

La première chose à faire est de télécharger les ressources que nous utiliserons pour le didacticiel, suivez les étapes ci-dessous:

- Téléchargez le bundle d' actifs à cette adresse https://s3-us-west-2.amazonaws.com/viro/Assets/res.zip

- Décompressez le fichier et remplacez le dossier res dans /ViroSample/js/

## Ajout de composants à une scène

Prenons notre scène `HelloWorld` actuelle et ajoutons une boîte 3D au-dessus du texte "Hello World". Nous pouvons le faire en utilisant le composant `ViroBox`. Pour ajouter une boîte à notre scène, nous procédons comme suit:

Tout d'abord, nous importons ViroBox et ViroMaterials depuis react-viro afin que nos instructions d'importation ressemblent maintenant à:

JavaScript

    import {
      ...
        ViroBox,
      ViroMaterials,
    } from 'react-viro';


Ensuite, nous devons ajouter la boîte à notre scène. La référence de l'API `ViroBox` nous permet de savoir quelles propriétés nous pouvons définir pour personnaliser notre box.

Copiez le code suivant et ajoutez-le sous le composant `ViroText`:

JavaScript

    <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} />

    position={[horizontal, vertical, -1]}
    scale={[largeur, longueur, profondeur(longueur)]}


### Personnalisation de la ViroBox

Dans le code ci-dessus, nous définissons la position de la ViroBox sur [0, -.5, -1] afin qu'elle se place sous le texte "Hello World".

Nous mettons ensuite la ViroBox à l'échelle de [.3, .3, .1] pour la réduire car sa largeur, sa hauteur et sa longueur par défaut sont de 1 (mètres).

La propriété `materials` vous permet de définir un matériau prédéfini (voir ViroMaterials : https://docs.viromedia.com/docs/materials) comme texture sur la boîte elle-même. Dans cet exemple, nous définissons un matériau nommé grid sur la ViroBox que nous définirons / créerons à l'étape suivante.


### Définition `materials`

Avant de pouvoir utiliser `materials` comme la grille susmentionnée, nous devons le définir. Puisque nous avons déjà importé des ViroMaterials, nous pouvons simplement ajouter le code suivant sous la déclaration de styles.

JavaScript

    ViroMaterials.createMaterials({
      grid: {
        diffuseTexture: require('./res/grid_bg.jpg'),
      },
    });


Comme vous pouvez le voir, nous avons défini un matériau de grille contenant `diffuseTexture` qui pointe vers le fichier grid_bg.jpg dans le répertoire `res/`.


Deux choses à noter ici:

- La fonction require () est une fonction spéciale fournie dans React qui convertit un chemin de fichier en une valeur que la plateforme peut utiliser pour récupérer la ressource.

- L'argument de require () est un chemin de fichier et est relatif à l'emplacement du fichier (dans ce cas, le répertoire res / et HelloWorldSceneAR.js se trouvent dans le même répertoire ViroSample / js /.


Votre HelloWorldSceneAR.js doit ressembler à ce qui suit:

JavaScript

    'use strict';

    import React, { Component } from 'react';

    import {StyleSheet} from 'react-native';

    import {
      ViroARScene,
      ViroText,
      ViroConstants,
      ViroBox,
      ViroMaterials,
    } from 'react-viro';

    export default class HelloWorldSceneAR extends Component {

      constructor() {
        super();

        // Set initial state here
        this.state = {
          text : "Initializing AR..."
        };

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
      }

      render() {
        return (
          <ViroARScene onTrackingUpdated={this._onInitialized} >
            <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
            <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} />
          </ViroARScene>
        );
      }

      _onInitialized(state, reason) {
        if (state == ViroConstants.TRACKING_NORMAL) {
          this.setState({
            text : "Hello World!"
          });
        } else if (state == ViroConstants.TRACKING_NONE) {
          // Handle loss of tracking
        }
      }
    }

    var styles = StyleSheet.create({
      helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',
      },
    });

    ViroMaterials.createMaterials({
      grid: {
        diffuseTexture: require('./res/grid_bg.jpg'),
      },
    });

    module.exports = HelloWorldSceneAR;


Enregistrez votre fichier HelloWorldSceneAR.js et rechargez l'application. Vous devriez maintenant voir un cube rose et gris sous le texte Hello World




Pour recharger votre fichier, secouez simplement votre appareil et un menu de débogage apparaîtra, comme indiqué ci-dessous. Appuyez sur "Recharger (Reload)" et un écran pour choisir AR ou VR apparaîtra. Appuyez sur AR et vos modifications apparaîtront.


### Ajout d'un objet 3D à la scène

Ajoutons maintenant un objet 3D à la scène. Il devrait y avoir un dossier dans votre dossier res appelé "emoji_smile". Nous utiliserons ces fichiers pour ajouter un emoji 3D à la scène.

### Ajouter des nouveaux composants

Nous devons d'abord importer les composants que nous utiliserons: Viro3DObject, ViroAmbientLight et ViroSpotLight.

JavaScript

    import {
        ...
      Viro3DObject,
      ViroAmbientLight,
      ViroSpotLight,
    } from 'react-viro';
    Next we need to add the Viro3DObject and lights to our scene. Copy the code below and paste it below the ViroBox component within the ViroARScene.


Ensuite, nous devons ajouter le `Viro3DObject` et les lumières à notre scène. Copiez le code ci-dessous et collez-le sous le composant ViroBox dans ViroARScene`.

JavaScript

    <ViroAmbientLight color={"#aaaaaa"} />
            <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
              position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
            <Viro3DObject
                source={require('./res/emoji_smile/emoji_smile.vrx')}
                resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                    require('./res/emoji_smile/emoji_smile_normal.png'),
                    require('./res/emoji_smile/emoji_smile_specular.png')]}
                position={[-.5, .5, -1]}
                scale={[.2, .2, .2]}
                type="VRX" />



Enregistrez votre fichier et rechargez l'application Testbed. Vous devriez voir dans la caméra de votre téléphone "un smiley en 3D, un Cube rouge et gris et le mot Hello Word!". Déplacez-vous si vous ne parvenez pas à voir tous les composants au début, car ils pourraient être sur votre gauche.


### Utilisation de ViroARPlane

Dans une application AR, la caméra de l'appareil est utilisée pour présenter une vue en direct à l'écran du monde physique. Des objets virtuels en trois dimensions sont superposés à cette vue, créant l'illusion qu'ils existent réellement.

Une méthode pour placer des objets dans le monde réel consiste à utiliser le composant `ViroARPlane ou ViroARPlaneSelector`. Lorsque le système AR détecte un avion (un carré horizontale), `ViroReact` tente de l'attacher à tous les composants `ViroARPlane` déclarés et maintient en permanence le plan virtuel ancré au plan du monde réel détecté. D'autre part, le composant `ViroARPlaneSelector` permet aux développeurs de permettre à leurs utilisateurs de sélectionner le plan qu'ils souhaitent que le développeur utilise.

Pour voir comment cela fonctionne, ajoutons un `ViroARPlaneSelector` dans notre scène. Tout d'abord, ajoutez `ViroARPlaneSelector` en tant que nouveau composant comme indiqué ci-dessous:

JavaScript

    import {
      ...
      ViroARPlaneSelector,
    } from 'react-viro';


Ajoutez ensuite un `ViroARPlaneSelector` en collant le code suivant dans votre composant `ViroARScene`.

JavaScript

    <ViroARPlaneSelector />


Enregistrez votre fichier et rechargez l'application testbed. En plus de la scène précédente, vous devriez maintenant voir des avions ( carré horizontale) apparaître lorsque vous vous déplacez dans votre pièce. Dans notre monde réel, la table et le plan du sol peuvent être détectés


Si vous essayez de "sélectionner" un avion en appuyant dessus, ils disparaîtront tout simplement car rien n'a été ajouté dans ViroARPlaneSelector, dans la section suivante, nous vous montrerons comment y ajouter un composant.


### Ajouter un objet 3D au plan

Auparavant, lorsque nous ajoutions notre emoji à la scène, il était à une position fixe comme indiqué {[-.5, -.5, -1]} comme indiqué ci-dessous:

JavaScript

    <Viro3DObject
                source={require('./res/emoji_smile/emoji_smile.vrx')}
                resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                    require('./res/emoji_smile/emoji_smile_normal.png'),
                    require('./res/emoji_smile/emoji_smile_specular.png')]}
                position={[-.5, .5, -1]}
                scale={[.2, .2, .2]}
                type="VRX" />


Avec la AR, nous voulons souvent que les objets soient placés par rapport au monde réel. En utilisant les avions que nous avons identifiés précédemment, plaçons nos emoji sur un avion. Tout d'abord, supprimez ce que vous venez d'ajouter de votre fichier js. Remplacez ensuite le code Viro3DObject ci-dessus dans votre fichier HelloWorldSceneAR.js par le code ci-dessous:

JavaScript

    <ViroARPlaneSelector>
      <Viro3DObject
                source={require('./res/emoji_smile/emoji_smile.vrx')}
                resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                    require('./res/emoji_smile/emoji_smile_normal.png'),
                    require('./res/emoji_smile/emoji_smile_specular.png')]}
                position={[0, .5, 0]}
                scale={[.2, .2, .2]}
                type="VRX" />
    </ViroARPlaneSelector>


Notez que nous avons également changé la position de l'emoji en [0, .5, 0]. C'est parce que le centre de l'emoji se trouve dans l'emoji lui-même, donc pour le faire asseoir "sur" l'avion, nous devons le décaler légèrement au-dessus de l'endroit où se trouve l'avion.

Enregistrez le fichier et rechargez l'application testbed.

Maintenant que nous avons placé l'objet 3D à l'intérieur du ViroARPlaneSelector, lorsqu'un avion est touché, les emoji seront placés sur le plan sélectionné et les autres disparaîtront.


### Interactions et animations

L'un des avantages de la AR est que les utilisateurs peuvent se déplacer dans leur monde pour voir et interagir avec des objets sous différents angles. Ajoutons de l'interaction à l'emoji et du mouvement à la boîte.

Commençons par rendre l'emoji déplaçable afin qu'il puisse être déplacé avec le geste de glisser. Nous devons d'abord importer un autre composant ViroNode:

JavaScript

    import {
      ...
      ViroNode,
    } from 'react-viro';


À l'étape précédente, nous avons placé nos emoji dans un composant ViroARPlaneSelector comme indiqué ci-dessous.

JavaScript

    <ViroARPlaneSelector>
      <Viro3DObject
                source={require('./res/emoji_smile/emoji_smile.vrx')}
                resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                    require('./res/emoji_smile/emoji_smile_normal.png'),
                    require('./res/emoji_smile/emoji_smile_specular.png')]}
                position={[0, .5, 0]}
                scale={[.2, .2, .2]}
                type="VRX" />
    </ViroARPlaneSelector>


Pour faire glisser nos emoji sur des surfaces du monde réel, nous devons remplacer ViroARPlaneSelector par un ViroNode, définir le dragType sur "FixedToWorld" et ajouter une fonction anonyme vide pour indiquer à la plate-forme que nous voulons que cet objet fasse glisser.

Remplacez le bloc de code ci-dessus par celui ci-dessous:

JavaScript

    <ViroNode position={[0,-1,0]} dragType="FixedToWorld" onDrag={()=>{}} >
      <Viro3DObject
                source={require('./res/emoji_smile/emoji_smile.vrx')}
                resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                    require('./res/emoji_smile/emoji_smile_normal.png'),
                    require('./res/emoji_smile/emoji_smile_specular.png')]}
                position={[0, .5, 0]}
                scale={[.2, .2, .2]}
                type="VRX" />
    </ViroNode>


Enregistrez votre fichier et rechargez l'application testbed.

L'emoji devrait maintenant apparaître devant vous et à gauche. Vous devriez maintenant pouvoir toucher et faire glisser l'emoji autour de la scène, remarquer comment il se déplace le long des surfaces du monde réel.

### Animation

Enfin, ajoutons du mouvement à la boîte. Tout d'abord, nous devons importer ViroAnimations

JavaScript

    import {
      ...
      ViroAnimations,
    } from 'react-viro'

Ensuite, remplacez le composant ViroBox par ce qui suit:

JavaScript

    <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} animation={{name: "rotate", run: true, loop: true}}/>


Comme vous pouvez le voir, nous avons ajouté une nouvelle animation de propriété avec la valeur {name: "rotate", run: true, loop: true}. Le nom fait référence à une animation que nous enregistrerons à l'étape suivante comme nous l'avons fait pour ViroMaterials ci-dessus.

Trouvez où nous avons enregistré ViroMaterials (vers le bas du fichier), copiez et collez le code suivant en dessous:

JavaScript

    ViroAnimations.registerAnimations({
      rotate: {
        properties: {
          rotateY: "+=90"
        },
        duration: 250, //.25 seconds
      },
    });


Enregistrez votre fichier et rechargez l'application testbed. Vous devriez maintenant voir "Hello World", une boîte rotative et pouvoir faire glisser l'emoji. Un exemple du code final complet est publié à la fin de ce tutoriel.



## Tutoriel HelloWorldSceneAR - Code final

    'use strict';

    import React, { Component } from 'react';

    import {StyleSheet} from 'react-native';

    import {
      ViroARScene,
      ViroText,
      ViroConstants,
      ViroBox,
      ViroMaterials,
      Viro3DObject,
      ViroAmbientLight,
      ViroSpotLight,
      ViroARPlaneSelector,
      ViroNode,
      ViroAnimations,
    } from 'react-viro';

    export default class HelloWorldSceneAR extends Component {

      constructor() {
        super();

        // Set initial state here
        this.state = {
          text : "Initializing AR..."
        };

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
      }

      render() {
        return (
          <ViroARScene onTrackingUpdated={this._onInitialized} >
            <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
            <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} animation={{name: "rotate", run: true, loop: true}}/>
            <ViroAmbientLight color={"#aaaaaa"} />
            <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
              position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
            <ViroNode position={[0,-1,0]} dragType="FixedToWorld" onDrag={()=>{}} >
              <Viro3DObject
                source={require('./res/emoji_smile/emoji_smile.vrx')}
                resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                    require('./res/emoji_smile/emoji_smile_normal.png'),
                    require('./res/emoji_smile/emoji_smile_specular.png')]}
                position={[0, .5, 0]}
                scale={[.2, .2, .2]}
                type="VRX" />
            </ViroNode>
          </ViroARScene>
        );
      }

      _onInitialized(state, reason) {
        if (state == ViroConstants.TRACKING_NORMAL) {
          this.setState({
            text : "Hello World!"
          });
        } else if (state == ViroConstants.TRACKING_NONE) {
          // Handle loss of tracking
        }
      }
    }

    var styles = StyleSheet.create({
      helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',
      },
    });

    ViroMaterials.createMaterials({
      grid: {
        diffuseTexture: require('./res/grid_bg.jpg'),
      },
    });

    ViroAnimations.registerAnimations({
      rotate: {
        properties: {
          rotateY: "+=90"
        },
        duration: 250, //.25 seconds
      },
    });

    module.exports = HelloWorldSceneAR;

