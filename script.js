const container = document.getElementById("container");

function gridMaker(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);

    for (var i = 0; i < rows; i++) {
        const col = document.createElement("div");
        col.classList.add("column" + i);

        for (var j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.textContent = "";
            cell.classList.add("cell" + j);

            cell.addEventListener("mouseover", function() {
                paintOver(cell);
            });

            cell.addEventListener("mousedown", function() {
                clearPaint(cell);
            });

            col.appendChild(cell);
        }    
        container.appendChild(col);
    }
}

// Mouse Over Function to Paint
function paintOver(cell) {
    cell.style.backgroundColor = "black";
}

// On Click Function to Clear Paint
function clearPaint(cell) {
    cell.style.backgroundColor = "";
}

gridMaker(16, 16);