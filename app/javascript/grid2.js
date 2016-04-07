export default class Game {

    constructor(noOfRows = 5, noOfCols = 5) {

        this.grid = []
        this.noOfRows = noOfRows
        this.noOfCols = noOfCols

        for (let i = 0; i < noOfRows; i++) {

            var col = []

            for (let j = 0; j < noOfCols; j++) {

                let id = i + '_' + j
                col.push(new Block(this.getRandomColour(), id))

            }

            this.grid.push(col)

        }

    }

    getRandomColour() {
        const colours = ['red', 'green', 'blue'] // , 'yellow'
        return colours[Math.floor(Math.random() * colours.length)]
    }

    blockClicked(event, block) {

        const coord = block.findInGrid(this.grid)
        const coords = [coord]
        const connectedCoords = this.getConnectedCoords(coord, block.colour, coords)

        this.removeBlocksFromGrid(connectedCoords)
        this.render()

    }

    removeBlocksFromGrid(coords) {

        // If we don't sort, we can't reliably splice the array
        coords.sort((a, b) => {
            // Sort by y coord
            return b[1] - a[1]
        })

        coords.forEach(coord => {
            this.grid[coord[0]].splice(coord[1], 1)
        })

    }

    getConnectedCoords(coord, colour, coords) {

        const adjCoords = this.getAdjancentCoords(coord, colour)

        for (let i = 0; i < adjCoords.length; i++) {
            let adjCoord = adjCoords[i]
            if (!this.coordExists(adjCoord, coords)) {
                coords.push(adjCoord)
                this.getConnectedCoords(adjCoord, colour, coords)
            }
        }

        return coords

    }

    coordExists(coord, coords) {
        for (let i = 0; i < coords.length; i++) {
            if (coords[i][0] === coord[0] && coords[i][1] === coord[1]) {
                return true
            }
        }
        return false
    }

    getAdjancentCoords(coords, colour) {

        let top, right, bottom, left
        const x = coords[0], y = coords[1]

        if (y > 0) {
            top = [x, y - 1]
        }

        if (x < this.noOfCols - 1) {
            right = [x + 1, y]
        }

        if (y < this.noOfRows - 1) {
            bottom = [x, y + 1]
        }

        if (x > 0) {
            left = [x - 1, y]
        }

        return [top, right, bottom, left]
            .filter(coord => coord)
            .filter(coord => this.grid[coord[0]][coord[1]].colour === colour)

    }

    render(rootEl = document.querySelector('#gridEl')) {

        rootEl.innerHTML = ''

        this.grid.forEach((col, i) => {

            const colEl = document.createElement('div')
            colEl.className = 'col'

            col.forEach((block, j) => {

                let blockEl = document.createElement('div')
                blockEl.innerHTML = block.id // For debugging
                blockEl.id = block.id
                blockEl.className = 'block'
                blockEl.style.background = block.colour
                blockEl.addEventListener('click', event => this.blockClicked(event, block));

                colEl.appendChild(blockEl)

            })

            rootEl.appendChild(colEl)

        })

    }

    renderColumn(el) {
        // Would this help with less DOM changes?
    }

}

class Block {

    constructor(colour, id) {
        this.colour = colour
        this.id = id
    }

    findInGrid(grid) {

        let coords = []

        // Note: Could change to a for loop to enable breaking early
        grid.forEach((col, x) => {
            col.forEach((block, y) => {
                if (block.id === this.id) {
                    coords[0] = x
                    coords[1] = y
                }
            })
        })

        return coords

    }

}

window.addEventListener('DOMContentLoaded', () => new Game().render());
