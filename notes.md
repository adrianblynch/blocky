## What I did...

I started on the block-finding problem first, using a block's coords to look around at its neighbours and gather up a complete set of joined blocks.

It's interesting that the coords are zeroed in the bottom left corner and not the browser's natural top left. Didn't seem to cause a problem.

The plan was then to take the blocks that make up the shape and remove them from the grid and then re-render. The trouble with this plan was that the rendering relies on the grid being _complete_. It was't enough to just remove the blocks, they had to be moved within their respective columns.

It was a little strange having to both move a block in its column array and update it's `x` and `y` attributes. I found out later why this is probably for the best.

Once the blocks were are manipulated, I call `render()`. This has the downside of updating the entire screen, but it does mean we don't have to selectively update bits of the DOM.

To optimise we could look at only updating single columns rather than all of the gird.

I added a `clear()` mmethod to clear the DOM before rendering again. Using `document.querySelector('#gridEl').innerHTML = ''` I'd have to look into possible memory leaks.

## There are bugs...

Occasionally some blocks that should disappear, don't, and some blocks that shouldn't disappear, do!

It springs to mind that I should probably be sorting the blocks based on their `y` attribute before splicing the column array.

## Still to do...

Tests! I didn't write any and maybe that would have helped solve the bug mentioned above.

I thought that there might be a better way to represent the grid data. Rather than have a block know its own `x` and `y`, they could be derived from the block's position in the 2D array.

I took a look at this and it makes the shape-finding code more difficult. You are no longer dealing with block objects but instead, coordinates which are harder to deal with.

To see the outcome of that, look at `app/javascript/grid2.js` and to see it running, update `entries: ['app/javascript/grid.js']` in `gulpfile.js`.
