## What I did...

I started on the block-finding problem first, using a block's coords to look around at its neighbours and gather up a complete set of joined blocks.

It's interesting that the coords are zeroed in the bottom left corner and not the browser's natural top left.

The plan was then to take the blocks that make up the shape and remove them from the grid and then re-render. The trouble with this plan was that the rendering relies on the grid being "complete".

I then changed from removing the blocks from the grid to moving them to the top of their columns, changing their coords and colour, and then re-rendering.

This made me think that the `render()` method could use a renderColumn() method to reduce DOM changes.

Whilst going through all this, it made me wonder about the structure of the game data. The blocks have awareness of their position, with their x and y attributes {x:1, y: 2, colour: 'blue'}, but their storage in a 2D array also gives them a position.

I think a refactoring of this would involve removing their x and y attributes and making the 2D array be the source of their position.

A downside to this might be that it's harder to get a block's neighbours, changing the method signature from `getAdjancentBlocks(block)` to `getAdjancentBlocks(x, y)`. So maybe not that big a deal.

Because I re-render the grid after each click, I had to clear the elements from the root element. I did this with `document.querySelector('#gridEl').innerHTML = ''` which I'm not 100% sure about. I have a feeling this may be a potential memory leak.

## There are bugs...

Occasionally some blocks that should disappear, don't, and some blocks that shouldn't disappear, do!

If I had tests this would be easier to track down.

My first thought is that when I remove blocks I don't do them in order so I may mess up the coords of the remaining blocks.

## What I didn't do...

I didn't look at the complete flow of the game properly at the start. I would have spotted that I would need to change block properties at the start.

I didn't write tests.

## So...

I decided to try and implement my own version of the game where the block positions were determined by their position in the 2D array.

The first hurdle was to find the shapes using only the coords and not the block's x and y attributes which no longer existed.
