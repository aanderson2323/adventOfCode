const fs = require('fs');
(async () => {
  const input = await new Promise((resolve, reject) => {
    fs.readFile('./input.txt', 'utf8', function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    })
  });
  let preStepLoc;
  let stepLoc;
  let preStep;
  let step;
  let stepMap = {};
  input.split('\n').forEach((row) => {
    preStepLoc = row.indexOf('Step ') + 'Step '.length;
    stepLoc = row.indexOf('before step ') + 'before step '.length;
    preStep = row.slice(preStepLoc, preStepLoc + 1);
    step = row.slice(stepLoc, stepLoc + 1);
    // console.log(row);
    if(!stepMap.hasOwnProperty(step)){
      stepMap[step] = {requirements:[], requiredFor:[]}
    }
    if(!stepMap.hasOwnProperty(preStep)){
      stepMap[preStep] = {requirements:[], requiredFor:[]}
    }
    stepMap[step].requirements.push(preStep);
    stepMap[step].requirements.sort();
    stepMap[preStep].requiredFor.push(step);
    stepMap[preStep].requiredFor.sort();

  });
  console.log(stepMap);
})();