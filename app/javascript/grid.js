export const COLOURS = ['red', 'green', 'blue', 'yellow'];
const HIDDEN_COLOUR = 'none';
const MAX_X = 12;
const MAX_Y = 12;

export class Block {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
    }
}

export class BlockGrid {

    constructor () {
        this.grid = [];

        for (let x = 0; x < MAX_X; x++) {
            let col = [];
            for (let y = 0; y < MAX_Y; y++) {
                col.push(new Block(x, y));
            }

            this.grid.push(col);
        }

        return this;
    }

    render (el = document.querySelector('#gridEl')) {
        for (let x = 0; x < MAX_X; x++) {
            let id = 'col_' + x;
            let colEl = document.createElement('div');
            colEl.className = 'col';
            colEl.id = id;
            el.appendChild(colEl);

            for (let y = MAX_Y - 1; y >= 0; y--) {
                let block = this.grid[x][y],
                    id = `block_${x}x${y}`,
                    blockEl = document.createElement('div');

                blockEl.id = id;
                blockEl.className = 'block';
                blockEl.style.background = block.colour;
                blockEl.addEventListener('click', (evt) => this.blockClicked(evt, block));
                colEl.appendChild(blockEl);
            }
        }

        return this;
    }

    clear (el = document.querySelector('#gridEl')) {
        el.innerHTML = '';
    }

    blockClicked (e, block) {

        let blocks = this.getConnectedBlocks(block, [block])

        this.removeFromGrid(blocks)
        this.clear()
        this.render()

    }

    removeFromGrid (blocks) {

        blocks.forEach(b => {

            let col = this.grid[b.x]

            // Change the coords of higher blocks
            col.forEach(block => {
                if (block.y > b.y) {
                    block.y--
                }
            })

            let removedBlock = col.splice(b.y, 1).pop()

            removedBlock.colour = HIDDEN_COLOUR
            removedBlock.y = 9

            // Place dummy block on the end
            col.push(removedBlock)

        })

    }

    getConnectedBlocks (block, blocks) {

        let adjBlocks = this.getAdjacentBlocks(block)

        for (let i = 0; i < adjBlocks.length; i++) {
            let adjBlock = adjBlocks[i]
            if (blocks.indexOf(adjBlock) === -1) {
                blocks.push(adjBlock)
                this.getConnectedBlocks(adjBlock, blocks)
            }
        }

        return blocks

    }

    getAdjacentBlocks (block) {

        // Get block above, below, to the left and right of `block`

        let top, right, bottom, left;

        top = this.grid[block.x][block.y + 1]
        bottom = this.grid[block.x][block.y - 1]

        if (block.x < MAX_X - 1) {
            right = this.grid[block.x + 1][block.y]
        }

        if (block.x > 0) {
            left = this.grid[block.x - 1][block.y]
        }

        // Return only blocks with the same colour as `block`
        return [top, right, bottom, left].filter(b => b && b.colour === block.colour)

    }

    isGameOver () {
        // Not used and maybe buggy
        let blocksLeft = this.grid.reduce((count, col) =>
            count += col.filter(block =>
                block.colour !== HIDDEN_COLOUR
            ).length
        , 0)
        return blocksLeft === 0
    }

}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
