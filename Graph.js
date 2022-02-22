class Node {                            //initialise un noeud
    constructor(name, data) {
        this.name = name;               //nom du noeud
        this.data = data;               //donnée du noeud
        this.nodes = [];                //tableau de noeuds
    }

    goTo(path) {                        //path = chemin
        console.log(this.data);         //affiche les données de ce noeud

        for (let node of this.nodes) {  //permet de parcourir les noeuds qui sont connectés à ce noeud
            if (node.name == path[0]) { //compare le nom du des noeuds qui sont connectés à ce noeud avec le 1er element du chemin (path[0])
                path.shift();           //si il y a un noeud du même nom que le 1er élement du chemin qui est connecté à ce noeud, on supprime le 1er élément du chemin
                node.goTo(path);        //on passe au noeud suivant spécifié dans le chemin (path)
            }
        }
    }

    addNode(otherNode) {                //sert à rajouter une connexion entre ce noeud et un autre noeud
        otherNode.nodes.push(this);     //rajoute ce noeud à l'autre noeud
        this.nodes.push(otherNode);     //rajoute l'autre noeud à ce noeud
    }
}

class Graph {                           //initialise un graphe
    constructor(root = new Node("root", "root")) {
        this.root = root;               //crée le noeud racine
    }

    setRoot(node) {            
        this.root = node;
    }

    follow(path) {                      //permet de suivre un chemin donné dans le graphe
        this.root.goTo(path);
    }

    addNode(node) {                     //permet de rajouter une laison entre la racine et un autre noeud 
        this.root.addNode(node);
    }
}