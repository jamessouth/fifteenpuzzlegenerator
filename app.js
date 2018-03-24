const buttons = document.querySelectorAll('#buttons button');
const html = document.querySelector('#html');
const submit = document.querySelector('#submit');
// let info;


function handleButtons(){
  [...this.parentNode.children].forEach(b => b.classList.remove('selected'));
  this.classList.add('selected');
  // if(info){
    if(this.textContent === 'HTML'){


    } else if(this.textContent === 'CSS'){

      code.textContent = `canvas{\n  background-color: lightblue;\n  min-width: ${info[0]}px;\n}`;
    } else {
      let tileSize = info[0] / info[2];

      code.textContent = `const canvas = document.querySelector('canvas');\nlet ctx = canvas.getContext('2d');\nlet canvArray = [], contact = new Image();\ncontact.src = '[path to your image]';\nfor(let i = 0; i < ${info[3]}; i++){\n  for(let j = 0; j < ${info[2]}; j++){\n    canvArray.push([j * ${tileSize}, i * ${tileSize}]);\n  }\n}\n`;

      let code2 = document.createElement('pre');
      code2.textContent = `function getRands(amt){\n  let nums = new Set();\n  while(nums.size < amt){\n    let n = Math.floor(Math.random() * amt);\n    nums.add(n);\n  }\n  return [...nums];\n}\nfunction getInversions(arr){\n  let inversions = 0;\n  for(let i = 0; i < arr.length; i++){\n    if(arr[i] == null){continue;}\n    for(let j = 0; j < arr.length; j++){\n      if(arr[i] > arr[j + i]){\n        inversions++;\n      }\n    }\n  }\n  return inversions;\n}\n`;

      let code3 = document.createElement('pre');
      code3.textContent = `function checkBoard(){\n  let randos = getRands(canvArray.length - 1);\n  let solArray = [];\n  randos.forEach((x,i) => {\n    solArray[x] = i;\n  });\n  return [solArray.concat([${(info[2] * info[3]) - 1}]), randos.concat([${(info[2] * info[3]) - 1}])];\n}\nlet doable = checkBoard();\nwhile(getInversions(doable[0]) % 2 !== 0){\n  doable = checkBoard();\n}\nlet boardOrder = doable[0].slice();\n`;

      let code4 = document.createElement('pre');
      code4.textContent = `for(let i = 0; i < canvArray.length-1; i++){\n  ctx.drawImage(contact, canvArray[i][0], canvArray[i][1], ${tileSize}, ${tileSize}, canvArray[doable[1][i]][0], canvArray[doable[1][i]][1], ${tileSize}, ${tileSize});\n}\n`;

      let code5 = document.createElement('pre');
      code5.textContent = `function swapTiles(x, y){\n  if(canvArray.length === 0){return;}\n  let tileClicked = (Math.floor(y / ${tileSize}) * ${info[2]}) + Math.floor(x / ${tileSize});\n  let blank = boardOrder.indexOf(canvArray.length - 1);\n  let finalCheck;\n  let brdInd = boardOrder[tileClicked];\n  if(![1, ${info[2]}].includes(Math.abs(tileClicked - blank))){\n    return;\n  }\n  ctx.clearRect(canvArray[tileClicked][0], canvArray[tileClicked][1], ${tileSize}, ${tileSize});\n  ctx.drawImage(contact, canvArray[brdInd][0], canvArray[brdInd][1], ${tileSize}, ${tileSize}, canvArray[blank][0], canvArray[blank][1], ${tileSize}, ${tileSize});\n`;

      let code6 = document.createElement('pre');
      code6.textContent = `  [boardOrder[tileClicked], boardOrder[blank]] = [boardOrder[blank], boardOrder[tileClicked]];\n  if(boardOrder[0] === 0 && boardOrder[${info[2] - 1}] === ${info[2] - 1} && boardOrder[${info[2] * (info[3] - 1) - 1}] === ${info[2] * (info[3] - 1) - 1} && boardOrder[${info[2] * info[2] - 2}] === ${info[2] * info[2] - 2}){\n    finalCheck = true;\n    for(let f = 0; f < boardOrder.length; f++){\n      if(boardOrder[f] !== f){\n        finalCheck = false;\n        break;\n      }\n    }\n  }\n  if(finalCheck){\n    ctx.drawImage(contact, ${(info[2] - 1) * `${tileSize}`}, ${(info[3] - 1) * `${tileSize}`}, ${tileSize}, ${tileSize}, ${(info[2] - 1) * `${tileSize}`}, ${(info[3] - 1) * `${tileSize}`}, ${tileSize}, ${tileSize});\n  }\n}\n`;

      let code7 = document.createElement('pre');
      code7.textContent = `canvas.addEventListener('click', function(e){\n  let x = e.offsetX;\n  let y = e.offsetY;\n  swapTiles(x,y);\n});\n`;
      //
      // let code8 = document.createElement('pre');
      // code8.textContent = ``;


      [code2, code3, code4, code5, code6, code7].forEach(j => code.parentNode.appendChild(j));
    }
  // }
}


// buttons.forEach(b => b.addEventListener('click', handleButtons));


function testVals(arr){
  console.log(arr);
  // console.log(typeof arr[0]);
  const error = document.querySelector('#error');
  if(isNaN(arr[0]) && isNaN(arr[1])){
    error.textContent = 'Please enter numbers for width and height.'
    return false;
  } else if(!(arr[0] / arr[2] === arr[1] / arr[3])){
    error.textContent = 'This arrangement would result in tiles that are not square. The image does not have to be square, but the ratio of width to height in pixels and in tiles must be equal.';
    return false;
  } else if(!(arr[0] % arr[2] === 0 && arr[1] % arr[3] === 0)){

    error.textContent = 'The number of tiles must divide evenly into the size in pixels in the given dimension.';
    return false;
  } else {
    error.textContent = 'Your code is ready. Please click the tabs below.';
    return true;
  }

}



function popHTML(info){
  const spans = html.querySelectorAll('span');
  spans.forEach((s,i) => s.textContent = info[i]);
}



submit.addEventListener('click', function (e) {
  // console.log(e);
  e.preventDefault();
  const inputs = document.querySelectorAll('input');
  const selects = document.querySelectorAll('select');
  let info = [...inputs, ...selects].map(i => parseInt(i.value, 10));
  if(testVals(info)){
    popHTML(info);
  }

});
