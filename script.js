const container = document.getElementById("container");
const sideBar = document.getElementById("sideBar");
var action = "d";

// Check which action to do
sideBar.addEventListener("click", function(event) {
    const target = event.target;
    if (target.matches("#rainbowBtn")) {
        action = "r";
    } else if (target.matches("#eraseBtn")) {
        action = "e";
    } else if (target.matches("#burnBtn")) {
        action = "b"
    } else if (target.matches("#dodgeBtn")) {
        action = "l"
    } else {
        action = "d"
    }
});

// Clears the grid
document.getElementById("clearBtn").onclick = function() {
    gridCleaner()
    gridMaker(16, 16);
}

// Creates the grid
function gridMaker(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);

    for (var i = 0; i < rows; i++) {
        const col = document.createElement("div");
        col.classList.add("column" + i);

        for (var j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.classList.add("cell" + j);
            cell.addEventListener("mousemove", function(event) {
                if (event.buttons === 1) {
                    if (action === "d") {
                        paintOver(cell);
                    } else if (action === "r") {
                        rainbowOver(cell);
                    } else if (action === "e") {
                        clearPaint(cell);
                    } else if (action === "b") {
                        burnOver(cell);
                    } else if (action === "l") {
                        dodgeOver(cell);
                    }
                }
            });

            col.appendChild(cell);
        }    
        container.appendChild(col);
    }
}

//Sets cell's background to black
function paintOver(cell) {
    cell.style.backgroundColor = "black";
}

//Sets cell's background to white (clear)
function clearPaint(cell) {
    cell.style.backgroundColor = "";
}

//Sets cell's background to a random hex color
function rainbowOver(cell) {
    const base = 200, variance = 55;
    const r = Math.floor((Math.random() * variance) + base);
    const g = Math.floor((Math.random() * variance) + base);
    const b = Math.floor((Math.random() * variance) + base);
    const randomPastelHexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    cell.style.backgroundColor = randomPastelHexColor;
}

//Sets cell's oppacity 0.1 darker
function burnOver(cell) {
    let currentOpacity = parseFloat(window.getComputedStyle(cell).opacity);
    cell.style.opacity = currentOpacity + 0.1;
}

//Sets cell's oppacity 0.1 ligther
function dodgeOver(cell) {
    let currentOpacity = parseFloat(window.getComputedStyle(cell).opacity);
    cell.style.opacity -= currentOpacity - 0.1;
}


// Cleans the grid
function gridCleaner() {
    container.innerHTML = ''
}

gridMaker(16, 16);
