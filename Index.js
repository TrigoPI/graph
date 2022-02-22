let graph = new Graph();
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
               "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let links = [];
let allNodes = {};
let index = 0;
let mouse = {
    x : 0,
    y : 0,
    click : false,
    element : null,
    hover : null,
    nodes : []
}

let createNode = name => {
    let node = document.createElement("div");
    let span = document.createElement("span");

    allNodes[name] = new Node(name, `data from node ${name}`);
    span.innerText = name;
        
    node.className = "node";
    node.appendChild(span);

    node.addEventListener("mousedown", moveNode);
    node.addEventListener("mouseenter", hoverNode);
    node.addEventListener("mouseleave", leaveNode);

    document.body.appendChild(node);
}

let moveNode = event => {
    mouse.element = event.target;
} 

let hoverNode = event => {
    mouse.hover = event.target;
}

let leaveNode = event => {
    mouse.hover = null;
}

canvas.width = width;
canvas.height = height;

createNode("root");
graph.setRoot(allNodes["root"]);

class Link {
    constructor(node1, node2) {
        this.node1 = node1;
        this.node2 = node2;
    };

    drawLine() {
        let pos1 = this.node1.getBoundingClientRect();
        let pos2 = this.node2.getBoundingClientRect();

        ctx.beginPath();
        ctx.moveTo(pos1.x + pos1.width / 2, pos1.y + pos1.height / 2);
        ctx.lineTo(pos2.x + pos2.width / 2, pos2.y + pos2.height / 2);
        ctx.stroke();
        ctx.closePath();
    }
}

document.addEventListener('mouseup', event => {
    mouse.element = null;
});

document.addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

document.addEventListener('keydown', event => {
    if (event.key == "a") {
        createNode(letters[index]);
        index++;
    }

    if (event.key == "s") {
        if (mouse.nodes.length < 2) {
            if (mouse.hover != null ) {
                if (mouse.nodes.length == 1) {
                    if (mouse.hover != mouse.nodes[0]) {
                        mouse.nodes.push(mouse.hover);  
                        
                        let node1 = allNodes[mouse.nodes[0].firstChild.innerText];
                        let node2 = allNodes[mouse.nodes[1].firstChild.innerText];

                        node1.addNode(node2);

                        links.push(new Link(mouse.nodes[0], mouse.nodes[1]));

                        mouse.nodes = [];
                    }
                } else {
                    mouse.nodes.push(mouse.hover);
                }    
            }
        }
    }
});

setInterval(() => {
    ctx.clearRect(0, 0, width, height);

    for (let link of links) {
        link.drawLine();
    }

    if (mouse.element != null) {
        mouse.element.style.top  = mouse.y - 10 + "px";
        mouse.element.style.left = mouse.x - 10 + "px";
    }
}, 1000 / 60);