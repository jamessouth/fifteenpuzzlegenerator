

// const Sunset = {
// 	props: ['coords', 'yahooLink'],
// 	computed: {
// 		gMapsURL: function(){
// 			return `https://www.google.com/maps/@${this.coords.lat},${this.coords.long},18z`;
// 		},
// 		showFull: function(){
// 			return !!this.coords.sunset;
// 		},
// 	},
// 	template: `<div :style="{ marginTop: '4em' }">
// 							<p v-if="showFull">The sunset and sunrise information used to determine whether it is day or night at your location is provided by the <a class="newwindow" rel="noopener noreferrer" target="_blank" href="https://sunrise-sunset.org/api">sunset and sunrise times API.</a>&nbsp;&nbsp;You are within {{coords.acc}} meters (with 95% confidence) of latitude {{coords.lat}}, longitude {{coords.long}} <a class="newwindow" rel="noopener noreferrer" target="_blank" :href="gMapsURL">(see on Google Maps).</a>&nbsp;&nbsp;Your local sunrise time is {{coords.sunrise.local().format('h:mm:ss A')}} and your local sunset time is {{coords.sunset.local().format('h:mm:ss A')}}.&nbsp;&nbsp;Weather data<a class="yahoo" rel="noopener noreferrer" :href="yahooLink" target="_blank"> <img src="https://poweredby.yahoo.com/purple.png" width="134" height="29" alt="powered by Yahoo"/> </a></p>
//
// 							<p v-else>The sunset and sunrise information used to determine whether it is day or night at your location is provided by the <a class="newwindow" rel="noopener noreferrer" target="_blank" href="https://sunrise-sunset.org/api">sunset and sunrise times API.</a>&nbsp;&nbsp;Weather data<a class="yahoo" rel="noopener noreferrer" href="https://www.yahoo.com/?ilc=401" target="_blank"> <img src="https://poweredby.yahoo.com/purple.png" width="134" height="29" alt="powered by Yahoo"/> </a></p>
//
// 						 </div>`
// }



const Artwork = {
	template: `<div>
							 <h1 class="topFlourish" :style="{ position: 'relative', marginTop: '2em' }">ARTWORK</h1>
							 <h2 :style="{ textAlign: 'center', color: '#3a3a3a' }">All art by <a class="newwindow" rel="noopener noreferrer" target="_blank" :style="{ fontSize: '20px' }" href="https://en.wikipedia.org/wiki/Alphonse_Mucha">Alfons Mucha</a></h2>
							 <h3>All works are public domain, via <a class="newwindow" rel="noopener noreferrer" target="_blank" :style="{ fontSize: '16px' }" href="https://commons.wikimedia.org/wiki/Main_Page">Wikimedia Commons</a></h3>
							 <ul>
							   <li v-for="(art, index) in artwork" :key="index"><img :src="art.src" :alt="art.alt"/><span>{{art.title}}</span> {{art.year}}</li>
							 </ul>
							 <h1 class="bottomFlourish" :style="{ position: 'relative' }"></h1>
						 </div>`,
	data: function(){
		return {
			artwork: [
				{src: "images/biscuits.jpg", alt: "Alfons Mucha - 1896 - Biscuits Lefèvre-Utile", title: "Poster for Biscuits Lefèvre-Utile", year: "(1896)"},
				{src: "images/champenois.jpg", alt: "Alfons Mucha - 1898 - Rêverie (F. Champenois Calendar 1898)", title: "Rêverie (F. Champenois Calendar 1898)", year: "(1898)"},
				{src: "images/bouquet.jpg", alt: "Alfons Mucha - 1900 - The Seasons: Spring (detail)", title: "The Seasons: Spring (detail)", year: "(1900)"},
				{src: "images/four_seasons.jpg", alt: "Alfons Mucha - 1897 - The Seasons (detail)", title: "The Seasons (detail)", year: "(1897)"},
				{src: "images/trappistine.jpg", alt: "Alfons Mucha - 1897 - La Trappistine (detail)", title: "Poster for La Trappistine (detail)", year: "(1897)"},
				{src: "images/champagne.jpg", alt: "Alfons Mucha - 1896 - Biscuits Champagne Lefèvre-Utile", title: "Poster for Biscuits Champagne Lefèvre-Utile", year: "(1896)"},
				{src: "images/painting_small.jpg", alt: "Alfons Mucha - 1898 - The Arts: Painting", title: "The Arts: Painting", year: "(1898)"},
				{src: "images/fruit.jpg", alt: "Alfons Mucha - 1897 - Fruit", title: "Fruit", year: "(1897)"},
				{src: "images/cycles_small.jpg", alt: "Alfons Mucha - 1902 - Cycles Perfecta", title: "Poster for Cycles Perfecta", year: "(1902)"}
			]
		}
	}
}

// [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,34,33]



const Demo = {
	props: ['userPhoto', 'imgWd', 'imgHt'],
	template: `<div>
		<div v-if="!!userPhoto" :style="{ margin: '.5em auto 0', width: userImWd, height: userImHt }">
			<img :style="{ width: userImWd, height: userImHt, borderRadius: '5%' }" :src="this.userPhoto" alt="user photo"/>
		</div>
		<img :style="demoH1Styles" alt="demo" src="images/demo.png"/>
	  <div :style="[holderStylesC, holderStylesD]">
			<div v-if="gameOver && !tabMQOn" :style="maskStyles" id="mask">
				<button @click="resetGame" type="button">Reset</button>
			</div>
      <canvas @click="swapTiles" ref="cnvs" :style="canvasStyles" width="410" height="574">
        Your browser does not support canvas.
      </canvas>
			<div :style="innerDivStyles">
				<button @blur="focusHandler" @focus="focusHandler" @mouseup="activeHandler" @mousedown="activeHandler" @click="helpBtnHandler" type="button" :style="helpBtnStyles" id="showHelp"><img alt="help" :style="{ verticalAlign: 'bottom' }" :src="btnImg"/></button>
				<transition name="swing">
					<div v-if="gameOver && tabMQOn" :style="resetStylesDiv">
						<button @click="resetGame" type="button" :style="resetStylesBtn">Reset</button>
					</div>
				</transition>
				<img :style="helpImgStyles" v-show="helpOpen" src="images/mucha.jpg" alt="Alfons Mucha - 1896 - Biscuits Champagne-Lefèvre-Utile.jpg"/>
			</div>
		</div>
		</div>`,
	data: function(){
		return {
			isFocused: false,
			isActive: false,
			holderStylesD: {
				display: 'flex',
				position: 'relative',
				flexDirection: 'column',
				justifyContent: 'space-around',
				alignItems: 'center'
			},
			tabMQ: window.matchMedia("(min-width: 768px)"),
			tabMQOn: null,

			canvasStyles: {
				backgroundColor: '#154a6a',
				minWidth: '410px'
			},
			helpImgStyles: {
				display: 'none',
				width: '205px'
			},
			gameOver: false,
			helpOpen: false,
			boardOrder: null,
			board: null,
			timer: 2500
		}
	},
	methods: {



		getBoard: function(){
			console.log('do');
			let brd = this.checkBoard();
			while(this.getInversions(brd[0]) % 2 !== 0){
				brd = this.checkBoard();
			}
			this.board = brd;
		},

		getBoardOrder: function(){
			console.log('order');

			this.boardOrder = this.board[0].slice();

		},

		resetGame: function(e){
			console.log(e);
			this.gameOver = false;
			sessionStorage.clear();
			this.ctx.clearRect(0, 0, 410, 574);


			this.getBoard();
			this.getBoardOrder();
			this.useCanvas(this.board[1]);

			console.log(this.board, this.boardOrder);
		},
		activeHandler: function(){
			this.isActive = !this.isActive;
		},
		focusHandler: function(){
			this.isFocused = !this.isFocused;
		},
		handleTabMQ: function(evt){
			if(evt.matches){
				this.tabMQOn = true;
				this.holderStylesD.flexDirection = 'row';
				this.holderStylesD.alignItems = 'flex-start';
			} else {
				this.tabMQOn = false;
				this.holderStylesD.flexDirection = 'column';
				this.holderStylesD.alignItems = 'center';
			}
		},
		helpBtnHandler: function(){
			this.helpOpen = !this.helpOpen;
		},
		getRands: function(amt){
			let nums = new Set();
			while(nums.size < amt){
				let n = Math.floor(Math.random() * amt);
				nums.add(n);
			}
			return [...nums];
		},
		getInversions: function(arr){
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
		},
		checkBoard: function(){
			console.log('check');
			let randos = this.getRands(this.canvArray.length - 1);
			let solArray = [];
			randos.forEach((x,i) => {
				solArray[x] = i;
			});
			return [solArray.concat([this.canvArray.length - 1]), randos.concat([this.canvArray.length - 1])];
		},
		saveGame: function(arr){
			if(this.gameOver){
				sessionStorage.clear();
				sessionStorage.setItem('gameOver', this.gameOver);
			} else {
				let savedGame = JSON.stringify(arr);
				sessionStorage.setItem('boardOrder', savedGame);
			}
		},
		swapTiles: function(e){
			// console.log(this.gameOver);
			if(this.gameOver){return;}
			let x = e.offsetX;
			let y = e.offsetY;
			let tileClicked = (Math.floor(y / 82) * 5) + Math.floor(x / 82);
			let blank = this.boardOrder.indexOf(this.canvArray.length - 1);
			if (blank % 5 === 0) {
	      if (![-5, 1, 5].includes(tileClicked - blank)) {
	        return;
	      }
	    } else if ((blank + 1) % 5 === 0) {
	      if (![-5, -1, 5].includes(tileClicked - blank)) {
	        return;
	      }
	    } else {
	      if (![1, 5].includes(Math.abs(tileClicked - blank))) {
	        return;
	      }
	    }
			let finalCheck;
			let brdInd = this.boardOrder[tileClicked];
			this.ctx.clearRect(this.canvArray[tileClicked][0], this.canvArray[tileClicked][1], 82, 82);
			this.ctx.drawImage(this.pic, this.canvArray[brdInd][0], this.canvArray[brdInd][1], 82, 82, this.canvArray[blank][0], this.canvArray[blank][1], 82, 82);
			[this.boardOrder[tileClicked], this.boardOrder[blank]] = [this.boardOrder[blank], this.boardOrder[tileClicked]];
			if(this.boardOrder[0] === 0 && this.boardOrder[4] === 4 && this.boardOrder[29] === 29 && this.boardOrder[33] === 33){
				finalCheck = true;
				for(let f = 0; f < this.boardOrder.length; f++){
					if(this.boardOrder[f] !== f){
						finalCheck = false;
						break;
					}
				}
			}
			if(finalCheck){
				this.ctx.drawImage(this.pic, 328, 492, 82, 82, 328, 492, 82, 82);
				this.gameOver = true;
			}
		},
		useCanvas: function(arr){
			console.log('hiiiiiiiiiiiiiiiii');
			this.pic.onload = () => {
			  for(let i = 0; i < this.canvArray.length - 1; i++){
			    this.ctx.drawImage(this.pic, this.canvArray[i][0], this.canvArray[i][1], 82, 82, this.canvArray[arr[i]][0], this.canvArray[arr[i]][1], 82, 82);
			  }
			}
			this.pic.src = "images/mucha.jpg";
		}
	},
	computed: {
		userImWd: function(){
			return `${this.imgWd}px`;
		},
		userImHt: function(){
			return `${this.imgHt}px`;
		},
		demoH1Styles: function(){
			return {
				display: 'block',
				margin: '6em auto',
				marginBottom: this.tabMQOn ? '6em' : '3em'
			}
		},


		holderStylesC: function(){
				if(this.tabMQOn){
					return { height: '650px' }
				} else {
					return { height: this.helpOpen ? '1100px' : '800px' }
				}
		},
		maskStyles: function(){
			return {
				top: this.helpOpen ? '37px' : '33px'
			}
		},

		resetStylesDiv: function(){
			return {
				width: '154px',
				height: '54px',
				display: 'flex',
				margin: 'auto',
				justifyContent: 'center',
				alignItems: 'flex-start',
				position: 'absolute',
				top: '54px',
				transformOrigin: 'center top 0px'
				// transform: 'rotateX(-150deg)'
			}
		},
		resetStylesBtn: function(){
			return {
				background: 'linear-gradient(41deg, #bf2b1d 16%, #380c00 113%)',
				filter: 'none',
				height: '100%',
				width: '100%',
				color: '#fbfbfb',
				letterSpacing: '5px',
				fontSize: '44px',
				fontFamily: "'Limelight', cursive"
			}
		},
		innerDivStyles: function(){
			let ht;

			if(this.helpOpen && !this.tabMQOn){
				ht = '380px';
			} else if(this.helpOpen && this.tabMQOn){
				ht = '410px';
			} else {
				ht = 'auto';
			}


			return {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'center',
				height: ht,

				position: 'relative',
				transformStyle: 'preserve-3d',
				perspective: '500px'
				// width: '154px',
			}
		},
		helpBtnStyles: function(){
			let bordCol;
			if(!this.isFocused && !this.isActive){
				bordCol = '#aaa';
			} else if(this.isFocused && !this.isActive){
				bordCol = '#154a6a';
			} else if(this.isFocused && this.isActive){
				bordCol = 'transparent';
			} else {
				bordCol = 'transparent';
			}
			return {
				width: '205px',
				height: '54px',
				marginBottom: this.helpOpen ? '0' : '3em',
				background: 'linear-gradient(to bottom, #f6a87a 0%, #a54121 100%)',
				border: '2px solid',
				filter: 'none',
				borderColor: bordCol,
				cursor: 'pointer'
			}
		},
		btnImg: function(){
			return this.helpOpen ? 'images/hide.png' : 'images/help.png';
		},
		pic: function(){
			return new Image();
		},
		ctx: function(){
			return this.$refs.cnvs.getContext('2d');
		},
		canvArray: function(){
			let arr = [];
			for(let i = 0; i < 7; i++){
				for(let j = 0; j < 5; j++){
					arr.push([j * 82, i * 82]);
				}
			}
			return arr;
		},


		getSavedGame: function(){
			console.log('get');
			let game;
			if(sessionStorage.getItem('boardOrder')){
				try{
					game = JSON.parse(sessionStorage.getItem('boardOrder'));
				} catch(e){
					sessionStorage.removeItem('boardOrder');
				}
			}
			return game;
		}
	},
	beforeDestroy: function(){
		console.log('destroy');
		if(this.gameOver){
			this.saveGame();
		} else {
			console.log(this.boardOrder);
			this.saveGame(this.boardOrder);
		}
	},
	created: function(){
		this.tabMQ.addListener(this.handleTabMQ);
		this.handleTabMQ(this.tabMQ);
	},
	mounted: function(){

		let gameAlreadyWon;
		if(sessionStorage.getItem('gameOver')){
			try{
				gameAlreadyWon = sessionStorage.getItem('gameOver');
			} catch(e){
				sessionStorage.removeItem('gameOver');
			}
		}

		if(gameAlreadyWon){
			console.log(this.gameOver);
			this.gameOver = true;
			console.log(this.gameOver);
			this.pic.onload = () => {

				this.ctx.drawImage(this.pic, 0, 0);

			}
			this.pic.src = "images/mucha.jpg";
		} else {
			if(this.getSavedGame){
				this.boardOrder = this.getSavedGame;
				let drawOrder = [];
				this.getSavedGame.forEach((x,i) => {
					drawOrder[x] = i;
				});
				this.useCanvas(drawOrder);
			} else {
				this.getBoard();
				this.getBoardOrder();
				this.useCanvas(this.board[1]);
			}
		}

	}
}

const Home = {
	props: ['cameraOpen'],
	template: `<div>

				<header :style="addlLinkStyles">
					<h1 id="mainh1">15 Puzzle Generator</h1>
					<p>This app will generate HTML, CSS and JS for you to paste into your project files to add an HTML canvas-based <a class="newwindow" rel="noopener noreferrer" target="_blank" href="https://en.wikipedia.org/wiki/15_puzzle">15 puzzle </a>, a type of sliding block or sliding tile puzzle.&nbsp;&nbsp;Demo <router-link to="/demo">here</router-link>.&nbsp;&nbsp;Just fill out the form and the code below will live-update!</p>
				</header>



				<main>

					<form>
						<div>
							<fieldset id="basics">
								<legend>Basic Puzzle</legend>
								<label>Color for the blank tile: <input v-model="basic.color" type="color" value="#0f8000"></label>


								<label>Image Width in pixels: <input v-model.number="basic.imageWidth" class="num" form="form" placeholder="Enter a number" min="0" type="number"/></label>

								<label>Image Height in pixels: <input v-model.number="basic.imageHeight" class="num" form="form" placeholder="Enter a number" min="0" type="number"/></label>

								<p class="warning" v-show="imageDimensionsNotEntered">Please enter numbers for width and height.</p>

								<p id="puzz">Puzzle Dimensions:</p>

								<input-sel v-model.number="basic.widthTiles" label="Width in tiles:"></input-sel>
								<input-sel v-model.number="basic.heightTiles" label="Height in tiles:"></input-sel>

								<p class="warning" v-show="tilesAreNotSquare">For the tiles to be square, the ratios of pixels to tiles for width and height must be equal.&nbsp;&nbsp;Current ratios:&nbsp;&nbsp;Width: {{tileSize.toFixed(2)}}, Height: {{heightRatio.toFixed(2)}}</p>

								<p class="warning" v-show="hasRemainderPixels">The number of tiles must divide evenly into the size in pixels in the given dimension.&nbsp;&nbsp;Trim the image or use a different number of tiles.</p>

								<p>The canvas will have the same dimensions as the image you use.&nbsp;&nbsp;Edit your image as necessary such that each tile will be the same size with no remainder pixels.</p>
							</fieldset>
							<hr>
							<fieldset id="extras">
								<legend>Additional Features</legend>
								<label>Relative path to your image: <input v-model="additional.path" placeholder="Optional" type="text"/></label>
								<label>Add helper image: <input v-model="additional.helperImage" type="checkbox" name="help" value="image"/></label>

							</fieldset>
						</div>

					</form>


					<div id="lang-select">
						<button @click="changeLangInd('down')"></button>
						<transition name="fade" mode="out-in">
							<span :key="currentLang">{{currentLang}}</span>
						</transition>
						<button @click="changeLangInd('up')"></button>
						<button	v-show="codeReady" @click="doCopy"	id="copy"></button>
						<a v-show="codeReady" href="mailto:?subject=Code%20for%20the%2015%20puzzle"><button id="email"></button></a>
					</div>

					<div :class="{ codeOverlay: !codeReady }" id="copy-email">

					</div>


					<div :class="{ blurry: !codeReady }" ref="code" id="code">

						<template v-if="currentLang === 'HTML'">
							<code-html :image-width="basic.imageWidth" :image-height="basic.imageHeight"></code-html>

							<code-html-helper-image :path="additional.path" v-if="additional.helperImage"></code-html-helper-image>
						</template>


						<template v-if="currentLang === 'CSS'">
							<code-css :color="basic.color" :image-width="basic.imageWidth"></code-css>

							<code-css-helper-image :helper-image-width="helperImageWidth" v-if="additional.helperImage"></code-css-helper-image>

						</template>

						<template v-if="currentLang.includes('J')">
							<code-js
							:path="additional.path"
							:tiles-wide="basic.widthTiles"
							:tiles-high="basic.heightTiles"
							:tile-size="tileSize"
							></code-js>

						</template>


					</div>
				</main>
				<app-footer :style="addlLinkStyles"></app-footer>
				</div>`,
  data: function(){
    return {
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
			breakpoints: {
				JSBreakpoint: window.matchMedia("(min-width: 510px)")
			},
			languages: ['HTML', 'CSS', 'JS'],
			currentLangInd: 0

    }
  },
	methods: {

		doCopy: function(){
			this.$copyText(this.$refs.code.textContent.replace(/[ ]{2,}/g, '')).then(function (e) {
				alert('Copied');
				console.log(e);
			}, function (e) {
				alert('Cannot copy');
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

	},
	computed: {
		addlLinkStyles: function(){
			return {
				pointerEvents: this.cameraOpen ? 'none' : 'auto'
			}
		},
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
	},
	created: function(){
		this.breakpoints.JSBreakpoint.addListener(this.handleJSExpand);
		this.handleJSExpand(this.breakpoints.JSBreakpoint);

		// let ggg = [...'BasicPuzzle', ...'AdditionalFeatures', ...'HTMLCSSJS', ...'Pleaseclearthevalidationerrorsabove', ...'ResetJavaScript'].reduce((a,b) => {
		// 	if(!a[b]){
		// 		a[b] = 0;
		// 	}
		// 	a[b]++;
		// 	return a;
		// },{});
		// console.log(ggg,Object.keys(ggg).sort((m,n) => {
		// 	return m > n ? 1 : -1;
		// }).join(''));
	}
}

const routes = [
	{ path: '/artwork', component: Artwork },
	// { path: '/sunset', component: Sunset },
	{ path: '/demo', component: Demo },
  { path: '/', component: Home }
]

const router = new VueRouter({
  routes,
	scrollBehavior (to, from, savedPosition){
		if(savedPosition){
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	}
})





Vue.component('app-footer', {
  template: `<footer>
  	<p>&copy; 2018 James South | <a class="newwindow" rel="noopener noreferrer" target="_blank" href="https://jamessouth.github.io/Project-12/">Portfolio</a> | <router-link to="/artwork">Artwork</router-link></p>
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
							&nbsp;&nbsp;if(blank % {{tilesWide}} === 0) {
					    &nbsp;&nbsp;&nbsp;&nbsp;if(![-{{tilesWide}}, 1, {{tilesWide}}].includes(tileClicked - blank)) {
					    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return;
					    &nbsp;&nbsp;&nbsp;&nbsp;}
					    &nbsp;&nbsp;} else if((blank + 1) % {{tilesWide}} === 0) {
					    &nbsp;&nbsp;&nbsp;&nbsp;if(![-{{tilesWide}}, -1, {{tilesWide}}].includes(tileClicked - blank)) {
					    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return;
					    &nbsp;&nbsp;&nbsp;&nbsp;}
					    &nbsp;&nbsp;} else {
					    &nbsp;&nbsp;&nbsp;&nbsp;if(![1, {{tilesWide}}].includes(Math.abs(tileClicked - blank))) {
					    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return;
					    &nbsp;&nbsp;&nbsp;&nbsp;}
					    &nbsp;&nbsp;}
							&nbsp;&nbsp;let finalCheck;
							&nbsp;&nbsp;let brdInd = boardOrder[tileClicked];
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
  router,
	created: function(){
		this.checkForGeoLocSupport();
	},
	data: {
		geoAccuracy: null,
		userLatitude: null,
		userLongitude: null,
		userSunrise: null,
		userSunset: null,
		showLocBtn: true,
		showPhotoHold: false,
		showCameraHold: false,
		showUserImage: false,

		videoStreaming: false,
		vidWidth: 300,
		vidHeight: 0,
		userPhoto: null,
		imgWidth: 0,
		imgHeight: 0,

		photoHold: 'photo-hold',
		// adjMargTop: 'adjMargTop',


		weather: '[weather]',
		temp: '[temp] and',
		geoPlace: '[place]',
		dayOrNight: '[time]',
		showLocPara: true,
		clauses: ['a great time to use a....', 'how about a....', 'a lovely day for a....']
	},
	methods: {
		handleVideoClose: function(){
			this.showCameraHold = !this.showCameraHold;
			if(this.userPhoto == null){
				this.showUserImage = false;
			}
			this.videoStreaming = false;
			this.vidHeight = 0;

		},
		takePicture: function(){
			const canv = this.$refs.videocanvas;
			const ctxt = canv.getContext('2d');

			if(this.vidWidth && this.vidHeight){
				canv.width = this.vidWidth;
				canv.height = this.vidHeight;

				ctxt.drawImage(this.$refs.video, 0, 0, this.vidWidth, this.vidHeight);
				this.userPhoto = canv.toDataURL('image/png');
				// this.$refs.photo.setAttribute('src', this.userPhoto);
				this.$refs.userpict.setAttribute('src', this.userPhoto);

			} else {
				this.clearPhoto();
			}

		},
		videoListener: function(e){
			console.log('vid', e);
			const canv = this.$refs.videocanvas;
			const vid = this.$refs.video;
			console.log(vid);
			if(!this.videoStreaming){
				this.vidHeight = vid.videoHeight / (vid.videoWidth / this.vidWidth);

				console.log(this.vidHeight, vid.videoHeight, vid.videoWidth, this.vidWidth);

				[this.imgWidth, this.imgHeight] = [this.vidWidth * (4/5), this.vidHeight * (4/5)];

				vid.setAttribute('width', this.vidWidth);
				vid.setAttribute('height', this.vidHeight);
				canv.setAttribute('width', this.vidWidth);
				canv.setAttribute('height', this.vidHeight);

				this.videoStreaming = true;
			}
		},
		videoButtonListener: function(e){
			console.log('butt', e);
			this.takePicture();
			e.preventDefault();
		},
		afterLeave: function(){
			this.showPhotoHold = false;
		},
		afterEnter: function(){
			this.showCameraHold = true;
			this.showUserImage = true;
		},
		clearPhoto: function(){
			const canv = this.$refs.videocanvas;
			const ctxt = canv.getContext('2d');
			ctxt.fillStyle = "#aaa";
			ctxt.fillRect(0, 0, canv.width, canv.height);

			const data = canv.toDataURL('image/png');
			// this.$refs.photo.setAttribute('src', data);
			if(this.userPhoto == null){
				this.$refs.userpict.setAttribute('src', data);
			} else {

			}


		},
		startCamera: function(){
			console.log('start cam');
			navigator.mediaDevices.getUserMedia({ video: true, audio: false })
				.then(stream => {
					this.$refs.video.srcObject = stream;
					this.$refs.video.play();
				})
				.catch(err => {
					if(err.name.includes('Readable')){
						alert(`Error! ${err}.  Activate your camera and allow apps to use it, then try again.`);
					} else {
						alert(`Error! ${err}.  Try again.`);
					}
					if(this.userPhoto == null){
						this.showUserImage = false;
					}
					this.handleVideoClose();
				});

			this.clearPhoto();

		},
		getRandomNo: function(){
			return Math.floor(Math.random() * this.clauses.length);
		},
		checkForGeoLocSupport: function(){
			if(navigator.geolocation){
				console.log('geoloc supported');
			} else {
				console.log('geoloc NOT supported');
				this.showLocPara = false;
			}
		},
		getLocation: function(){
			navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError, {
				enableHighAccuracy: false,
				maximumAge: 120000,
				timeout: 15000
			});
			this.showLocBtn = false;
		},
		geoSuccess: function(pos){
			this.geoAccuracy = pos.coords.accuracy;
			this.userLatitude = pos.coords.latitude.toFixed(6);
			this.userLongitude = pos.coords.longitude.toFixed(6);

			try{

				let sdate;
				let day = new Date();
				if(pos.coords.longitude < 0){
					sdate = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
				} else {
					sdate = 'today';
				}
				console.log(day, sdate);

				// error test
				fetch(`https://query.yahooapis.com/v1/public/yql?q=select item.condition, item.description, link from weather.forecast where woeid in (select woeid from geo.places(1) where text="(${pos.coords.latitude},${pos.coords.longitude})")&format=json`).then(res => res = res.json()).then(res => {

					if(res.error){
						this.geoError({code: '2', message: res.error.description});
						return;
					}
					if(!res.query.results){
						this.geoError({code: '1', message: 'No results returned'});
						return;
					}




				}).catch(err => this.geoError(err));



				fetch(`https://api.sunrise-sunset.org/json?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}&date=${sdate}&formatted=0`).then(res => res = res.json()).then(res => {
					console.log(res);
					if(res.status !== 'OK'){
						this.geoError({code: '', message: res.status});
						return;
					}
					let sunrise = moment.utc(res.results.sunrise), sunset = moment.utc(res.results.sunset);

					console.log(sunrise, sunset);

					this.userSunrise = sunrise;
					this.userSunset = sunset;

					console.log(moment.utc().isBetween(sunrise, sunset));

					if(moment.utc().isBetween(sunrise, sunset)){
						this.dayOrNight = 'today';
					} else {
						this.dayOrNight = 'tonight';
					}

				}).catch(err => this.geoError(err));


				fetch(`https://geocode.xyz/${pos.coords.latitude},${pos.coords.longitude}?json=1`).then(res => res = res.json()).then(res => {
					console.log(res, Date.now());
					if(res.error){
						this.geoError({code: res.error.code, message: res.error.description});
						return;
					}
					let cntry = ' ' + res.country;
					if(res.country && res.region && Object.keys(res.region).length !== 0){
						if(res.region.includes(res.country)){
							this.geoPlace = `${res.city.trim()}, ${res.region.trim().replace(cntry, ',' + cntry)}`.toUpperCase();
						} else {
							this.geoPlace = `${res.city.trim()}, ${res.country.trim()}`.toUpperCase();
						}


					} else if(res.country && res.region){
						this.geoPlace = `${res.city.trim()}, ${res.country.trim()}`.toUpperCase();
					} else {
						this.geoPlace = res.city.trim().toUpperCase();
					}

					console.log(this.geoAccuracy, this.geoPlace);
				}).catch(err => this.geoError(err));

			} catch(e){
				this.geoError(e);
			}

		},
		geoError: function(err){
			alert(`There was an error (code ${err.code}): ${err.message}`);
			this.showLocPara = false;
		}
	},
	computed: {
		adjMargTop: function(){
			if(!!this.userPhoto){
				return {
					marginTop: `${this.imgHeight * (1/4)}px`
				};
			} else {
				return {
					marginTop: `calc(1em + ${this.vidHeight}px)`
				};
			}
		},
		addPosAbs: function(){
			if(!!this.userPhoto){
				return {
					backgroundColor: '#12345600'
				};
			} else {
				return {
					position: 'absolute',
					left: '50%',
					transform: 'translateX(-50%)'
				};
			}
		},
		imgSize: function(){
			return {
				width: `${this.imgWidth}px`,
				height: `${this.imgHeight}px`
			}
		},
		vidHt: function(){
			return {
				height: `${this.vidHeight + 75}px`
			}
		},
		addPosRel: function(){
			return {
				position: !!this.userPhoto ? 'static' : 'relative'
			}
		},
		getClause: function(){
			return this.clauses[this.getRandomNo()];
		},
		showAside: function(){
			return this.$route.fullPath === '/';
		},
		showLocParaFinal: function(){
			return this.showLocPara && this.showAside;
		},
		coords: function(){
			return { lat: this.userLatitude, long: this.userLongitude, acc: this.geoAccuracy, sunrise: this.userSunrise, sunset: this.userSunset };
		}
	}
});
