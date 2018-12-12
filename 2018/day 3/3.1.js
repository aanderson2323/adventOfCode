/*
 --- Day 3: No Matter How You Slice It ---
The Elves managed to locate the chimney-squeeze prototype fabric for Santa's suit (thanks to someone who helpfully wrote its box IDs on the wall of the warehouse in the middle of the night). Unfortunately, anomalies are still affecting them - nobody can even agree on how to cut the fabric.

The whole piece of fabric they're working on is a very large square - at least 1000 inches on each side.

Each Elf has made a claim about which area of fabric would be ideal for Santa's suit. All claims have an ID and consist of a single rectangle with edges parallel to the edges of the fabric. Each claim's rectangle is defined as follows:

The number of inches between the left edge of the fabric and the left edge of the rectangle.
The number of inches between the top edge of the fabric and the top edge of the rectangle.
The width of the rectangle in inches.
The height of the rectangle in inches.
A claim like #123 @ 3,2: 5x4 means that claim ID 123 specifies a rectangle 3 inches from the left edge, 2 inches from the top edge, 5 inches wide, and 4 inches tall. Visually, it claims the square inches of fabric represented by # (and ignores the square inches of fabric represented by .) in the diagram below:

...........
...........
...#####...
...#####...
...#####...
...#####...
...........
...........
...........
The problem is that many of the claims overlap, causing two or more claims to cover part of the same areas. For example, consider the following claims:

#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2
Visually, these claim the following areas:

........
...2222.
...2222.
.11XX22.
.11XX22.
.111133.
.111133.
........
The four square inches marked with X are claimed by both 1 and 2. (Claim 3, while adjacent to the others, does not overlap either of them.)

If the Elves all proceed with their own plans, none of them will have enough fabric. How many square inches of fabric are within two or more claims?
 */

//load file contents
var fs = require('fs');
const util = require('util');

(async () => {
    let file = await new Promise((resolve) => {
        fs.readFile('input.txt', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            }
            resolve(data);
        })
    });
    // //initialize claim rectangle
    // var rectangle = new Array(1000)
    // rectangle.forEach((row)=>{
    //     row.push(new Array(1000).fill('.'));
    // });
    var rectangle = [];
    for(var initRow=0;initRow<1000;initRow++){
        rectangle.push(new Array(1000).fill('.'))
    }
    
    //initialize overlap
    var overlap = 0;
    // console.table(rectangle);
    //get array of all fabric claims
    const claims = file.split('\r\n');
    
    claims.forEach((claim, idx) => {
        //get claimId from pattern @1234 
        let claimId = claim.match(/#\d*/)[0].replace('#', '');
        //match the pattern 123,456 and split into coordintates
        let startLocation = claim.match(/\d*,\d*/)[0].split(',');
        //match the pattern 123,456 and split into dimentions
        let dimentions = claim.match(/\d*x\d*/)[0].split('x');
        for(var row=parseInt(startLocation[1])+1; row<parseInt(startLocation[1])+1+parseInt(dimentions[1]); row++){
            for(var col=parseInt(startLocation[0])+1; col<parseInt(startLocation[0])+1+parseInt(dimentions[0]); col++){
                // console.log(row, col, rectangle[row][col])
                switch (rectangle[row][col]){
                    case '.':
                        rectangle[row][col] = claimId;
                        break;
                    case 'X':
                        break;
                    default:
                        rectangle[row][col] = 'X';
                        overlap++;
                }
                //console.log(row, col, rectangle[row][col])
            }
        }
        //console.log(util.inspect(rectangle, { maxArrayLength: null }))
        // break;    
    });
    
    // console.dir(rectangle);
    console.log('overlap', overlap);
})();
