const canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let canvArray = [], pic = new Image();
for(let i = 0; i < 7; i++){
  for(let j = 0; j < 5; j++){
    canvArray.push([j * 82, i * 82]);
  }
}

function getRands(amt){
  let nums = new Set();
  while(nums.size < amt){
    let n = Math.floor(Math.random() * amt);
    nums.add(n);
  }
  return [...nums];
}

function getInversions(arr){
  let inversions = 0;
  for(let i = 0; i < arr.length; i++){
    if(arr[i] == null){continue;}
    for(let j = 0; j < arr.length; j++){
      if(arr[i] > arr[j + i]){
        inversions++;
      }
    }
  }
  return inversions;
}

function checkBoard(){
  let randos = getRands(canvArray.length - 1);
  let solArray = [];
  randos.forEach((x,i) => {
    solArray[x] = i;
  });
  return [solArray.concat([canvArray.length - 1]), randos.concat([canvArray.length - 1])];
}

let doable = checkBoard();
while(getInversions(doable[0]) % 2 !== 0){
  doable = checkBoard();
}
let boardOrder = doable[0].slice();

pic.onload = () => {
  for(let i = 0; i < canvArray.length - 1; i++){
    ctx.drawImage(pic, canvArray[i][0], canvArray[i][1], 82, 82, canvArray[doable[1][i]][0], canvArray[doable[1][i]][1], 82, 82);
  }
}

pic.src = "mucha.jpg";

function swapTiles(x, y){
  if(canvArray.length === 0){return;}
  let tileClicked = (Math.floor(y / 82) * 5) + Math.floor(x / 82);
  let blank = boardOrder.indexOf(canvArray.length - 1);
  let finalCheck;
  let brdInd = boardOrder[tileClicked];
  if(![1, 5].includes(Math.abs(tileClicked - blank))){
    return;
  }
  ctx.clearRect(canvArray[tileClicked][0], canvArray[tileClicked][1], 82, 82);
  ctx.drawImage(pic, canvArray[brdInd][0], canvArray[brdInd][1], 82, 82, canvArray[blank][0], canvArray[blank][1], 82, 82);
  [boardOrder[tileClicked], boardOrder[blank]] = [boardOrder[blank], boardOrder[tileClicked]];
  if(boardOrder[0] === 0 && boardOrder[4] === 4 && boardOrder[29] === 29 && boardOrder[33] === 33){
    finalCheck = true;
    for(let f = 0; f < boardOrder.length; f++){
      if(boardOrder[f] !== f){
        finalCheck = false;
        break;
      }
    }
  }
  if(finalCheck){
    ctx.drawImage(pic, 328, 492, 82, 82, 328, 492, 82, 82);
    canvArray = [];
  }
}

canvas.addEventListener('click', e => {
  let x = e.offsetX;
  let y = e.offsetY;
  swapTiles(x,y);
});
