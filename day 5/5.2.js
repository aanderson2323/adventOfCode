/*
--- Part Two ---
Time to improve the polymer.

One of the unit types is causing problems; it's preventing the polymer from collapsing as much as it should. Your goal is to figure out which unit type is causing the most problems, remove all instances of it (regardless of polarity), fully react the remaining polymer, and measure its length.

For example, again using the polymer dabAcCaCBAcCcaDA from above:

Removing all A/a units produces dbcCCBcCcD. Fully reacting this polymer produces dbCBcD, which has length 6.
Removing all B/b units produces daAcCaCAcCcaDA. Fully reacting this polymer produces daCAcaDA, which has length 8.
Removing all C/c units produces dabAaBAaDA. Fully reacting this polymer produces daDA, which has length 4.
Removing all D/d units produces abAcCaCBAcCcaA. Fully reacting this polymer produces abCBAc, which has length 6.
In this example, removing all C/c units was best, producing the answer 4.

What is the length of the shortest polymer you can produce by removing all units of exactly one type and fully reacting the result?
*/
//load file contents
var fs = require('fs');

const trimPolymer = (chain) => {
    //loop through string
    for (var i = 0; i < chain.length; i++) {
        //if not end of string and letter pair is reactive
        if (chain[i + 1] && chain[i] != chain[i + 1] && chain[i].toLowerCase() == chain[i + 1].toLowerCase()) {
            chain = chain.slice(0, i) + chain.slice(i + 2); //remove letters
            i = -1; //reset loop
        }
    }
    return chain;
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
    let polymer = file;
    //make element, reaction map
    let unitTypeMap = {}
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((letter)=>{
        //remove the unit type        
        var re = new RegExp(letter,"gi"); 
        tempChain = polymer.replace(re,'');        
        //get chain length without this unit
        unitTypeMap[letter+letter.toLowerCase()] = trimPolymer(tempChain).length;
    });
    //loop through string
    
    // polymer = trimPolymer(polymer)
    console.log(unitTypeMap);
})();
