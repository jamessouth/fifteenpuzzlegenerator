



Vue.component('app-header', {
  template: `<header>
    <h1 id="mainh1">15 Puzzle Generator</h1>
    <p>This app will generate HTML, CSS and JS for you to paste into your project files to add an HTML canvas-based <a href="https://en.wikipedia.org/wiki/15_puzzle">15 puzzle</a>.&nbsp;&nbsp;Demo <a href="demo.html">here</a>.&nbsp;&nbsp;Just fill out the form and the code below will live-update!</p>
  </header>`
});

Vue.component('app-footer', {
  template: `<footer>
  	<p>&copy; 2018 James South&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://jamessouth.github.io/Project-12/">Portfolio</a></p>
  </footer>`
});



Vue.component('input-sel', {
  data: function(){
    return {
      nums: [2,3,4,5,6,7,8]
    }
  },
  props: ['label', 'value'],
  template: `<label>{{label}}
            <select v-bind:value="value" v-on:input="$emit('input', $event.target.value)">
              <option v-for="num in nums">{{num}}</option>
            </select>
          </label>`
});






Vue.component('code-css-helper-image', {
  props: ['helperImageWidth'],
  template: `<pre><code>img{
    &nbsp;&nbsp;width: {{helperImageWidth}}px;
    }</code></pre>`
});


Vue.component('code-html', {
  props: ['imageWidth', 'imageHeight'],
  template: `<pre><code>&lt;canvas width="{{imageWidth}}" height="{{imageHeight}}"&gt;
            &nbsp;&nbsp;Your browser does not support canvas.
            &lt;/canvas&gt;</code></pre>`
});

Vue.component('code-css', {
  props: ['imageWidth', 'color'],
  template: `<pre><code>canvas{
  	          &nbsp;&nbsp;background-color: {{color}};
  	          &nbsp;&nbsp;min-width: {{imageWidth}}px;
            }</code></pre>`
});


Vue.component('code-html-helper-image', {
  props: ['path'],
  template: `<pre><code>&lt;img src="<span :class="{ greenBackground: !path }">{{path || '[path to your image]'}}</span>" alt=""/&gt;</code></pre>`
});


Vue.component('code-js', {
  props: ['tilesHigh', 'tilesWide', 'tileSize', 'path'],
  template: `<pre><code>const canvas = document.querySelector('canvas');
  	          let ctx = canvas.getContext('2d');
  	          let canvArray = [], pic = new Image();
  	          for(let i = 0; i < {{tilesHigh}}; i++){
  	          &nbsp;&nbsp;for(let j = 0; j < {{tilesWide}}; j++){
  	          &nbsp;&nbsp;&nbsp;&nbsp;canvArray.push([j * {{tileSize}}, i * {{tileSize}}]);
  	          &nbsp;&nbsp;}
  	          }

  	          function getRands(amt){
  	          &nbsp;&nbsp;let nums = new Set();
  	          &nbsp;&nbsp;while(nums.size < amt){
  	          &nbsp;&nbsp;&nbsp;&nbsp;let n = Math.floor(Math.random() * amt);
  	          &nbsp;&nbsp;&nbsp;&nbsp;nums.add(n);
  	          &nbsp;&nbsp;}
  	          &nbsp;&nbsp;return [...nums];
  	          }

  	          function getInversions(arr){
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

  	          function checkBoard(){
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
  	          &nbsp;&nbsp;&nbsp;&nbsp;ctx.drawImage(pic, canvArray[i][0], canvArray[i][1], {{tileSize}}, {{tileSize}}, canvArray[doable[1][i]][0], canvArray[doable[1][i]][1], {{tileSize}}, {{tileSize}});
  	          &nbsp;&nbsp;}
  	          }

  	          pic.src = '<span :class="{ greenBackground: !path }">{{path || '[path to your image]'}}</span>';

  	          function swapTiles(x, y){
  	          &nbsp;&nbsp;if(canvArray.length === 0){return;}
  	          &nbsp;&nbsp;let tileClicked = (Math.floor(y / {{tileSize}}) * {{tilesWide}}) + Math.floor(x / {{tileSize}});
  	          &nbsp;&nbsp;let blank = boardOrder.indexOf(canvArray.length - 1);
  	          &nbsp;&nbsp;let finalCheck;
  	          &nbsp;&nbsp;let brdInd = boardOrder[tileClicked];
  	          &nbsp;&nbsp;if(![1, {{tilesWide}}].includes(Math.abs(tileClicked - blank))){
  	          &nbsp;&nbsp;&nbsp;&nbsp;return;
  	          &nbsp;&nbsp;}
  	          &nbsp;&nbsp;ctx.clearRect(canvArray[tileClicked][0], canvArray[tileClicked][1], {{tileSize}}, {{tileSize}});
  	          &nbsp;&nbsp;ctx.drawImage(pic, canvArray[brdInd][0], canvArray[brdInd][1], {{tileSize}}, {{tileSize}}, canvArray[blank][0], canvArray[blank][1], {{tileSize}}, {{tileSize}});
  	          &nbsp;&nbsp;[boardOrder[tileClicked], boardOrder[blank]] = [boardOrder[blank], boardOrder[tileClicked]];
  	          &nbsp;&nbsp;if(boardOrder[0] === 0 && boardOrder[{{tilesWide - 1}}] === {{tilesWide - 1}} && boardOrder[{{tilesWide * (tilesHigh - 1) - 1}}] === {{tilesWide * (tilesHigh - 1) - 1}} && boardOrder[{{tilesWide * tilesHigh - 2}}] === {{tilesWide * tilesHigh - 2}}){
  	          &nbsp;&nbsp;&nbsp;&nbsp;finalCheck = true;
  	          &nbsp;&nbsp;&nbsp;&nbsp;for(let f = 0; f < boardOrder.length; f++){
  	          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(boardOrder[f] !== f){
  	          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;finalCheck = false;
  	          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break;
  	          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
  	          &nbsp;&nbsp;&nbsp;&nbsp;}
  	          &nbsp;&nbsp;}
  	          &nbsp;&nbsp;if(finalCheck){
  	          &nbsp;&nbsp;&nbsp;&nbsp;ctx.drawImage(pic, {{(tilesWide - 1) * tileSize}}, {{(tilesHigh - 1) * tileSize}}, {{tileSize}}, {{tileSize}}, {{(tilesWide - 1) * tileSize}}, {{(tilesHigh - 1) * tileSize}}, {{tileSize}}, {{tileSize}});
  	          &nbsp;&nbsp;&nbsp;&nbsp;canvArray = [];
  	          &nbsp;&nbsp;}
  	          }

  	          canvas.addEventListener('click', e => {
  	          &nbsp;&nbsp;let x = e.offsetX;
  	          &nbsp;&nbsp;let y = e.offsetY;
  	          &nbsp;&nbsp;swapTiles(x,y);
  	          });</code></pre>`
});




const app = new Vue({
  el: '#app',
  data: {
    basic: {
      color: '#0f8000',
      imageWidth: null,
      imageHeight: null,
      widthTiles: 2,
      heightTiles: 2
    },
    additional: {
      path: null,
      helperImage: false
    },
    languages: ['HTML', 'CSS', 'JS'],
    currentLangInd: 0,
    breakpoints: {
      JSBreakpoint: window.matchMedia("(min-width: 510px)"),
      H1BackgroundLarge: window.matchMedia("(min-width: 768px)")
    }
  },
  methods: {
    doCopy: function(){
      this.$copyText(this.$el.children[1].children[2].textContent.replace(/[ ]{2,}/g, '')).then(function (e) {
        alert('Copied');
        console.log(e);
      }, function (e) {
        alert('Can not copy');
        console.log(e);
      });
    },
    changeLangInd: function(dir){
      if(dir === 'up'){
        this.currentLangInd += 1;
      } else {
        this.currentLangInd -= 1;
        if(this.currentLangInd < 0){
          this.currentLangInd = this.languages.length - 1;
        }
      }
    },
    handleJSExpand: function(evt){
      if(evt.matches){
        this.$set(this.languages, 2, 'JavaScript');
      } else {
        this.$set(this.languages, 2, 'JS');
      }
    },
    getRandomNo: function(){
      return Math.floor(Math.random() * 2) + 1;
    },
    handleH1BG: function(evt){
      if(evt.matches){
        let medfile = `../images/bgmed${this.getRandomNo()}.jpg`;
        let bigfile = `../images/bgbig${this.getRandomNo()}.jpg`;
        document.documentElement.style.setProperty('--medFileName', `url(${medfile})`);
        document.documentElement.style.setProperty('--bigFileName', `url(${bigfile})`);
      }
    }
  },
  created: function(){
    this.breakpoints.JSBreakpoint.addListener(this.handleJSExpand);
    this.handleJSExpand(this.breakpoints.JSBreakpoint);
    this.breakpoints.H1BackgroundLarge.addListener(this.handleH1BG);
    this.handleH1BG(this.breakpoints.H1BackgroundLarge);
  },
  computed: {
    currentLang: function(){
      return this.languages[this.currentLangInd % this.languages.length];
    },
    helperImageWidth: function(){
      return Math.round(this.basic.imageWidth / 2) || '';
    },
    tileSize: function(){
      return this.basic.imageWidth / this.basic.widthTiles;
    },
    imageDimensionsNotEntered: function(){
      return !(this.basic.imageWidth > 0 && this.basic.imageHeight > 0);
    },
    heightRatio: function(){
      return this.basic.imageHeight / this.basic.heightTiles;
    },
    tilesAreNotSquare: function(){
      return !(this.tileSize === this.heightRatio);
    },
    hasRemainderPixels: function(){
      return !(this.basic.imageWidth % this.basic.widthTiles === 0 && this.basic.imageHeight % this.basic.heightTiles === 0);
    },
    codeReady: function(){
      return !this.imageDimensionsNotEntered && !this.tilesAreNotSquare && !this.hasRemainderPixels;
    }
  }
});
