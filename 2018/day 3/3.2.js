/*
--- Part Two ---
Amidst the chaos, you notice that exactly one claim doesn't overlap by even a single square inch of fabric with any other claim. If you can somehow draw attention to it, maybe the Elves will be able to make Santa's suit after all!

For example, in the claims above, only claim 3 is intact after all claims are made.

What is the ID of the only claim that doesn't overlap?
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
    for (var initRow = 0; initRow < 1000; initRow++) {
        rectangle.push(new Array(1000).fill('.'))
    }

    //initialize overlap
    var overlap = 0;
    // console.table(rectangle);
    //get array of all fabric claims
    const claims = file.split('\r\n');
    const overlapMap = {};
    claims.forEach((claim, idx) => {
        //get claimId from pattern @1234 
        let claimId = claim.match(/#\d*/)[0].replace('#', '');
        overlapMap[claimId] = 0
        //match the pattern 123,456 and split into coordintates
        let startLocation = claim.match(/\d*,\d*/)[0].split(',');
        //match the pattern 123,456 and split into dimentions
        let dimentions = claim.match(/\d*x\d*/)[0].split('x');
        for (var row = parseInt(startLocation[1]) + 1; row < parseInt(startLocation[1]) + 1 + parseInt(dimentions[1]); row++) {
            for (var col = parseInt(startLocation[0]) + 1; col < parseInt(startLocation[0]) + 1 + parseInt(dimentions[0]); col++) {
                // console.log(row, col, rectangle[row][col])
                switch (rectangle[row][col]) {
                    case '.':
                        rectangle[row][col] = claimId;
                        break;
                    case 'X':
                        overlapMap[claimId] += 1;
                        break;
                    default:
                        // console.log(`overlap with ${rectangle[row][col]}!`)
                        overlapMap[rectangle[row][col]] += 1;
                        overlapMap[claimId] += 1;
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
    console.log('overlapMap', overlapMap);
})();
