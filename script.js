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
    const randomHexColor = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
    cell.style.backgroundColor = randomHexColor
}

// Cleans the grid
function gridCleaner() {
    container.innerHTML = ''
}

gridMaker(16, 16);