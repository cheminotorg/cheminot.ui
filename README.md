cheminot.ui
===========

Les différente maquettes, les icones, les splashscreens et le loader de l'application mobile [cheminot.m](https://github.com/cheminotorg/cheminot.m) ont été réalisé grâce à un logiciel de design qui s'appelle [Sketch](http://bohemiancoding.com/sketch/). Ce qui est intéréssant avec Sketch est qu'il offre un [outil](http://bohemiancoding.com/sketch/tool/) en ligne de commande qui permet d'automatiser l'export d'Artboards.

L'idée à donc été de créer avec [gulp](http://gulpjs.com/) un outil qui permet de regénérer facilement les fonts, le loader, et les splashcreens directement depuis le projet Sketch:

* `gulp fonts`: exporte les icones pour en faire des fonts.
* `gulp splashscreens`: exporte l'ensemble des splashscreens.
* `gulp loader`: exporte les frames qui constitue le loader pour en faire une GIF, prête à l'emploi.
