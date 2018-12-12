/*
--- Part Two ---
Confident that your list of box IDs is complete, you're ready to find the boxes full of prototype fabric.

The boxes will have IDs which differ by exactly one character at the same position in both strings. For example, given the following box IDs:

abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz
The IDs abcde and axcye are close, but they differ by two characters (the second and fourth). However, the IDs fghij and fguij differ by exactly one character, the third (h and u). Those must be the correct boxes.

What letters are common between the two correct box IDs? (In the example above, this is found by removing the differing character from either ID, producing fgij.)

Your puzzle answer was qcslyvphgkrmdawljuefotxbh.

*/

var fs = require('fs');
(async () => {
    let file = await new Promise((resolve) => {
        fs.readFile('input.txt', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            }
            resolve(data);
        })
    });
    
    const rows = file.split('\r\n');
    rows.forEach((row, idx) => {
        for(var i=idx+1;i<rows.length;i++){
            let diffScore = 0;
            let commonLetters = '';
            for(j=0;j<row.length;j++){
                if(row[j]!=rows[i][j]){
                    diffScore+=1;
                }else{
                    commonLetters += row[j];
                }
                if(diffScore>1){
                    // console.log(diffScore);
                    break;
                }
            }
            if(diffScore == 1 ){
                console.log(row, rows[i])
                console.log(commonLetters);
            }
        }
        
    });
})();
