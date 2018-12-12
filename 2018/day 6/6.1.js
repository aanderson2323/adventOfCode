/**
 * --- Day 6: Chronal Coordinates ---
The device on your wrist beeps several times, and once again you feel like you're falling.

"Situation critical," the device announces. "Destination indeterminate. Chronal interference detected. Please specify new target coordinates."

The device then produces a list of coordinates (your puzzle input). Are they places it thinks are safe or dangerous? It recommends you check manual page 729. The Elves did not give you a manual.

If they're dangerous, maybe you can minimize the danger by finding the coordinate that gives the largest distance from the other points.

Using only the Manhattan distance, determine the area around each coordinate by counting the number of integer X,Y locations that are closest to that coordinate (and aren't tied in distance to any other coordinate).

Your goal is to find the size of the largest area that isn't infinite. For example, consider the following list of coordinates:

1, 1
1, 6
8, 3
3, 4
5, 5
8, 9
If we name these coordinates A through F, we can draw them on a grid, putting 0,0 at the top left:

..........
.A........
..........
........C.
...D......
.....E....
.B........
..........
..........
........F.
This view is partial - the actual grid extends infinitely in all directions. Using the Manhattan distance, each location's closest coordinate can be determined, shown here in lowercase:

aaaaa.cccc
aAaaa.cccc
aaaddecccc
aadddeccCc
..dDdeeccc
bb.deEeecc
bBb.eeee..
bbb.eeefff
bbb.eeffff
bbb.ffffFf
Locations shown as . are equally far from two or more coordinates, and so they don't count as being closest to any.

In this example, the areas of coordinates A, B, C, and F are infinite - while not shown here, their areas extend forever outside the visible grid. However, the areas of coordinates D and E are finite: D is closest to 9 locations, and E is closest to 17 (both including the coordinate's location itself). Therefore, in this example, the size of the largest area is 17.

What is the size of the largest area that isn't infinite?
 */
//load file contents
var fs = require('fs');
const getClosest = (x1, y1, coordniatesList) => {
    let closestCoordinate;
    let smallestDist;
    let smallestCount = 1;
    for (var i = 0; i < coordniatesList.length; i++) {
        // manhattan distance |a1−b1|+|a2−b2|.
        let [x2, y2] = coordniatesList[i].trim().split(',');
        let manhattanDist = Math.abs(x1-x2) + Math.abs(y1-y2);
        
        // console.log(x2, y2, x1,y1);
        // console.log(manhattanDist);
        if(manhattanDist == 0){
            console.log('coordinate found!');
            return i;
        }
        if (!smallestDist || manhattanDist < smallestDist) {
            smallestDist = manhattanDist
            closestCoordinate = i;
            smallestCount = 1;
        } else if ( manhattanDist == smallestDist ) { 
            // console.log("rect coordinate", x1,y1);
            // console.log("input coordinate",x2,y2);
            // console.log("Previous closest coordinate", coordniatesList[closestCoordinate]);
            // console.log('overlap!')
            smallestCount +=1
            // return '.';
        }
    }
    // console.log(closestCoordinate);

    return smallestCount > 1 ? '.' : closestCoordinate
}
(async () => {
    let file = await new Promise((resolve) => {
        fs.readFile('input.txt', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            }
            resolve(data);
        })
    });
    //get all coordinates
    let coordinates = file.split('\r\n');
    //coordinate map
    // {'1': area, '2': area, etc}
    let coordinateMap = {}
    //make rectangle matrix for plotting points
    let rectangle = [];
    let rectWidth = 400;
    let rectHeight = 400;
    for (var row = 0; row < rectHeight; row++) {
        rectangle.push([]);
        for (var col = 0; col < rectWidth; col++) {
            let closest = getClosest(col, row, coordinates);
            // console.log(closest);
            rectangle[row].push(String(closest).padStart(2,'0'));
            //don't add to area for no closest
            if (closest != '.') {
                //initialize new coordinate in map
                if (!coordinateMap.hasOwnProperty(closest)) {
                    coordinateMap[closest] = 0;
                }
                //if on edge, closest coordinate is infinity
                if (row == 0 || row == rectHeight - 1 || col == 0 || col == rectWidth - 1) {
                    coordinateMap[closest] = Infinity;
                } else if (coordinateMap[closest] != Infinity) { // if not infinity, increment area
                    coordinateMap[closest] += 1;
                }

            }
        }
    }
    console.log(JSON.stringify(rectangle));
    // console.log(rectangle[rectHeight-1]);
    console.log(Object.values(coordinateMap).sort((a,b)=>{return parseInt(a)-parseInt(b)}));
})();
