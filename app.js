const WIDTH = 800;
const HEIGHT = 800;
const PIXEL_SIZE = 16;

const canvas = document.getElementById('canvas');

canvas.width = WIDTH;
canvas.height = HEIGHT;

const context = canvas.getContext("2d");

let grid = [];

document.addEventListener("DOMContentLoaded", function () {
    initGrid();
    renderGrid();
})

canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mouseup", function () {
    canvas.removeEventListener("mousemove", placeSand);
});

canvas.addEventListener("mousedown", placeSand);

function handleMouseDown() {
    canvas.addEventListener("mousemove", placeSand);
}

function placeSand(event) {
    const row = Math.floor((event.clientY - canvas.offsetTop) / PIXEL_SIZE);
    const column = Math.floor((event.clientX - canvas.offsetLeft) / PIXEL_SIZE);

    grid[row][column] = 1;

    renderGrid();
}

function initGrid() {
    const NB_PIXELS = WIDTH / PIXEL_SIZE;

    for (let i = 0; i < NB_PIXELS; i++) {
        const row = []

        for (let j = 0; j < NB_PIXELS; j++) {
            row.push(0);
        }

        grid.push(row);
    }
}

function renderGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[i][j] == 1) {
                context.fillStyle = "white";
            } else {
                context.fillStyle = "black";
            }

            context.fillRect(PIXEL_SIZE * j, PIXEL_SIZE * i, PIXEL_SIZE, PIXEL_SIZE);

            context.strokeStyle = "#222222";
            context.strokeRect(PIXEL_SIZE * j, PIXEL_SIZE * i, PIXEL_SIZE, PIXEL_SIZE);
        }
    }
}

function calcGrid() {
    for (let i = grid.length - 2; i >= 0; i--) {
        for (let j = grid.length - 1; j >= 0; j--) {
            if (grid[i][j] == 1) {
                if (grid[i+1][j] == 0) {
                    grid[i][j] = 0;
                    grid[i+1][j] = 1;
                }
            }
        }
    }

    for (let i = grid.length - 1; i >= grid.length - 2; i--) {
        let isLineFull = true;
        
        for (let j = grid.length - 1; j >= 0; j--) {
    
            if (grid[i][j] == 0) {
                isLineFull = false;
            }
        }

        if (isLineFull) {
            for (let j = grid.length - 1; j >= 0; j--) {
                grid[i][j] = 0;
            }
        }
    }

    renderGrid();
}

setInterval(() => {
    calcGrid();
}, 30)