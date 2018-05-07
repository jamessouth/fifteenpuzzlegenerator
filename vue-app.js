Vue.component('app-header', {
  template: `<header>
    <h1 id="mainh1">15 Puzzle Generator</h1>
    <p>This app will generate HTML, CSS and JS for you to paste into your project files to add an HTML canvas-based <a href="https://en.wikipedia.org/wiki/15_puzzle">15 puzzle</a>.&nbsp;&nbsp;Demo <a href="demo.html">here</a>.</p>
  </header>`
});

Vue.component('input-num', {
  props: ['label'],
  template: `<label>{{label}}<input class="num" form="form" placeholder="Enter a number" min="0" type="number"/></label>`
});

Vue.component('input-sel', {
  data: function(){
    return {
      nums: [2,3,4,5,6,7,8]
    }
  },
  props: ['label'],
  template: `<label>{{label}}
            <select>
              <option v-for="num in nums">{{num}}</option>
            </select>
          </label>`
});


Vue.component('app-form', {
  template: `<form>
    <div>
      <fieldset id="basics">
        <legend>Basic Puzzle</legend>
        <label>Color for the blank tile: <input type="color" value="#0f8000"></label>

        <input-num label="Image Width in pixels: "></input-num>
        <input-num label="Image Height in pixels: "></input-num>

        <p id="puzz">Puzzle Dimensions:</p>

        <input-sel label="Width in tiles:"></input-sel>
        <input-sel label="Height in tiles:"></input-sel>



        <p>The canvas will have the same dimensions as the image you use.&nbsp;&nbsp;Edit your image as necessary such that each tile will be the same size with no remainder pixels.</p>
      </fieldset>
      <hr>
      <fieldset id="extras">
        <legend>Additional Features</legend>
        <label>Relative path to your image: <input placeholder="Optional" type="text"/></label>
        <label>Add helper image: <input type="checkbox" name="help" value="image"/></label>

      </fieldset>
    </div>

  </form>`
});

Vue.component('app-tabs', {
  props: ['labels'],
  template: `<div id="buttons">
    <button v-for="label in labels">{{label}}</button>
    <a href="mailto:?subject=Code%20for%20the%2015%20puzzle"><button>Email</button></a>
  </div>`
});



Vue.component('app-main', {
  template: `<main>

      <app-form></app-form>

      <app-tabs :labels="['HTML', 'CSS', 'JS', 'Copy']"></app-tabs>

      <div id="code">
        <pre id="html"><code>&lt;<span class="gy">canvas</span> <span class="blue">width</span>="</code><span class="red">%</span><code>" <span class="blue">height</span>="</code><span class="red">%</span><code>"&gt;
          &nbsp;&nbsp;Your browser does not support canvas.
          &lt;/<span class="gy">canvas</span>&gt;</code><pre id="helphtml"><code >&lt;<span class="gy">img</span> <span class="blue">src</span>="</code><span class="pathhtml">[path to your image]</span><code >" <span class="blue">alt</span>=""/&gt;</code></pre></pre>


        <pre id="css"><code>canvas{
          &nbsp;&nbsp;background-color: <span>%</span>;
          &nbsp;&nbsp;min-width: </code><span>%</span><code>px;
          }</code><pre id="helpcss"><code>img{
            &nbsp;&nbsp;width: <span class="halfwidth">%</span>;
            }</code></pre></pre>

        <pre id="js"><code>const canvas = document.querySelector('canvas');
          let ctx = canvas.getContext('2d');
          let canvArray = [], pic = new Image();
          for(let i = 0; i < </code><span class="info3">%</span><code>; i++){
          &nbsp;&nbsp;for(let j = 0; j < </code><span class="info2">%</span><code>; j++){
          &nbsp;&nbsp;&nbsp;&nbsp;canvArray.push([j * </code><span class="tileSize">%</span><code>, i * </code><span class="tileSize">%</span><code>]);
          &nbsp;&nbsp;}
          }

          <span class="peach">function</span> getRands(amt){
          &nbsp;&nbsp;let nums = new Set();
          &nbsp;&nbsp;while(nums.size < amt){
          &nbsp;&nbsp;&nbsp;&nbsp;let n = Math.floor(Math.random() * amt);
          &nbsp;&nbsp;&nbsp;&nbsp;nums.add(n);
          &nbsp;&nbsp;}
          &nbsp;&nbsp;return [...nums];
          }

          <span class="peach">function</span> getInversions(arr){
          &nbsp;&nbsp;let inversions = 0;
          &nbsp;&nbsp;for(let i = 0; i < arr.length; i++){
          &nbsp;&nbsp;&nbsp;&nbsp;if(arr[i] == null){continue;}
          &nbsp;&nbsp;&nbsp;&nbsp;for(let j = 0; j < arr.length; j++){
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(arr[i] > arr[j + i]){
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;inversions++;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
          &nbsp;&nbsp;&nbsp;&nbsp;}
          &nbsp;&nbsp;}
          &nbsp;&nbsp;return inversions;
          }

          <span class="peach">function</span> checkBoard(){
          &nbsp;&nbsp;let randos = getRands(canvArray.length - 1);
          &nbsp;&nbsp;let solArray = [];
          &nbsp;&nbsp;randos.forEach((x,i) => {
          &nbsp;&nbsp;&nbsp;&nbsp;solArray[x] = i;
          &nbsp;&nbsp;});
          &nbsp;&nbsp;return [solArray.concat([canvArray.length - 1]), randos.concat([canvArray.length - 1])];
          }

          let doable = checkBoard();
          while(getInversions(doable[0]) % 2 !== 0){
          &nbsp;&nbsp;doable = checkBoard();
          }
          let boardOrder = doable[0].slice();

          pic.onload = () => {
          &nbsp;&nbsp;for(let i = 0; i < canvArray.length - 1; i++){
          &nbsp;&nbsp;&nbsp;&nbsp;ctx.drawImage(pic, canvArray[i][0], canvArray[i][1], </code><span class="tileSize">%</span><code>, </code><span class="tileSize">%</span><code>, canvArray[doable[1][i]][0], canvArray[doable[1][i]][1], </code><span class="tileSize">%</span><code>, </code><span class="tileSize">%</span><code>);
          &nbsp;&nbsp;}
          }

          pic.src = '<span class="pathjs">[path to your image]</span>';

          <span class="peach">function</span> swapTiles(x, y){
          &nbsp;&nbsp;if(canvArray.length === 0){return;}
          &nbsp;&nbsp;let tileClicked = (Math.floor(y / </code><span class="tileSize">%</span><code>) * </code><span class="info2">%</span><code>) + Math.floor(x / </code><span class="tileSize">%</span><code>);
          &nbsp;&nbsp;let blank = boardOrder.indexOf(canvArray.length - 1);
          &nbsp;&nbsp;let finalCheck;
          &nbsp;&nbsp;let brdInd = boardOrder[tileClicked];
          &nbsp;&nbsp;if(![1, </code><span class="info2">%</span><code>].includes(Math.abs(tileClicked - blank))){
          &nbsp;&nbsp;&nbsp;&nbsp;return;
          &nbsp;&nbsp;}
          &nbsp;&nbsp;ctx.clearRect(canvArray[tileClicked][0], canvArray[tileClicked][1], </code><span class="tileSize">%</span><code>, </code><span class="tileSize">%</span><code>);
          &nbsp;&nbsp;ctx.drawImage(pic, canvArray[brdInd][0], canvArray[brdInd][1], </code><span class="tileSize">%</span><code>, </code><span class="tileSize">%</span><code>, canvArray[blank][0], canvArray[blank][1], </code><span class="tileSize">%</span><code>, </code><span class="tileSize">%</span><code>);
          &nbsp;&nbsp;[boardOrder[tileClicked], boardOrder[blank]] = [boardOrder[blank], boardOrder[tileClicked]];
          &nbsp;&nbsp;if(boardOrder[0] === 0 && boardOrder[</code><span class="info2-1">%</span><code>] === </code><span class="info2-1">%</span><code> && boardOrder[</code><span class="info2xinfo3-1-1">%</span><code>] === </code><span class="info2xinfo3-1-1">%</span><code> && boardOrder[</code><span class="info2xinfo3-2">%</span><code>] === </code><span class="info2xinfo3-2">%</span><code>){
          &nbsp;&nbsp;&nbsp;&nbsp;finalCheck = true;
          &nbsp;&nbsp;&nbsp;&nbsp;for(let f = 0; f < boardOrder.length; f++){
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(boardOrder[f] !== f){
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;finalCheck = false;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
          &nbsp;&nbsp;&nbsp;&nbsp;}
          &nbsp;&nbsp;}
          &nbsp;&nbsp;if(finalCheck){
          &nbsp;&nbsp;&nbsp;&nbsp;ctx.drawImage(pic, </code><span class="info2-1xtileSize">%</span><code>, </code><span class="info3-1xtileSize">%</span><code>, </code><span class="tileSize">%</span><code>, </code><span class="tileSize">%</span><code>, </code><span class="info2-1xtileSize">%</span><code>, </code><span class="info3-1xtileSize">%</span><code>, </code><span class="tileSize">%</span><code>, </code><span class="tileSize">%</span><code>);
          &nbsp;&nbsp;&nbsp;&nbsp;canvArray = [];
          &nbsp;&nbsp;}
          }

          canvas.addEventListener('click', e => {
          &nbsp;&nbsp;let x = e.offsetX;
          &nbsp;&nbsp;let y = e.offsetY;
          &nbsp;&nbsp;swapTiles(x,y);
          });</code></pre>


      </div>
    <!-- </div> -->
  </main>`

});



const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello world!!!'
  }
});
