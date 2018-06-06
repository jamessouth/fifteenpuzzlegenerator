

const Sunset = {
	template: `<div>hello</div>`
}



const Artwork = {
	template: `<div>
							 <h1 :style="{ marginTop: '2em' }">ARTWORK</h1>
							 <h2 :style="{ textAlign: 'center', color: '#3a3a3a' }">All art by <a :style="{ fontSize: '20px' }" href="https://en.wikipedia.org/wiki/Alphonse_Mucha">Alfons Mucha</a></h2>
							 <h3>All works are public domain, via <a :style="{ fontSize: '16px' }" href="https://commons.wikimedia.org/wiki/Main_Page">Wikimedia Commons</a></h3>
							 <ul>
							   <li v-for="art in artwork"><img :src="art.src" :alt="art.alt"/><span>{{art.title}}</span> {{art.year}}</li>
							 </ul>
						 </div>`,
	data: function(){
		return {
			artwork: [
				{src: "images/biscuits.jpg", alt: "Alfons Mucha - 1896 - Biscuits Lefèvre-Utile", title: "Poster for Biscuits Lefèvre-Utile", year: "(1896)"},
				{src: "images/champenois.jpg", alt: "Alfons Mucha - 1898 - Rêverie (F. Champenois Calendar 1898)", title: "Rêverie (F. Champenois Calendar 1898)", year: "(1898)"},
				{src: "images/bouquet.jpg", alt: "Alfons Mucha - 1900 - The Seasons: Spring (detail)", title: "The Seasons: Spring (detail)", year: "(1900)"},
				{src: "images/four_seasons.jpg", alt: "Alfons Mucha - 1897 - The Seasons (detail)", title: "The Seasons (detail)", year: "(1897)"},
				{src: "images/fruit.jpg", alt: "Alfons Mucha - 1897 - Fruit", title: "Fruit", year: "(1897)"},
				{src: "images/champagne.jpg", alt: "Alfons Mucha - 1896 - Biscuits Champagne Lefèvre-Utile", title: "Poster for Biscuits Champagne Lefèvre-Utile", year: "(1896)"},
				{src: "images/trappistine.jpg", alt: "Alfons Mucha - 1897 - La Trappistine", title: "Poster for La Trappistine", year: "(1897)"}
			]
		}
	}
}



const Demo = {
	template: `<div><img :style="demoH1Styles" alt="demo" src="images/demo.png"/>
	  <div :style="[holderStylesC, holderStylesD]">
      <canvas @click="swapTiles" ref="cnvs" :style="canvasStyles" width="410" height="574">
        Your browser does not support canvas.
      </canvas>
			<div :style="innerDivStyles">
				<button @blur="focusHandler" @focus="focusHandler" @mouseup="activeHandler" @mousedown="activeHandler" @click="helpBtnHandler" :style="helpBtnStyles" id="showHelp"><img alt="help" :style="{ verticalAlign: 'bottom' }" :src="btnImg"/></button>
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
				flexDirection: 'column',
				justifyContent: 'space-around',
				alignItems: 'center'
			},
			tabMQ: window.matchMedia("(min-width: 768px)"),
			tabMQOn: null,
			demoH1Styles: {
				marginLeft: 'auto',
				marginRight: 'auto',
				marginTop: '6em',
				marginBottom: '2em',
				display: 'block'
			},
			canvasStyles: {
				backgroundColor: '#154a6a',
				minWidth: '410px'
			},
			helpImgStyles: {
				display: 'none',
				width: '205px'
			},
			gameOver: false,
			helpOpen: false
		}
	},
	methods: {
		activeHandler: function(){
			this.isActive = !this.isActive;
		},
		focusHandler: function(){
			this.isFocused = !this.isFocused;
		},
		handleTabMQ: function(evt){
			if(evt.matches){
				this.tabMQOn = true;
				this.demoH1Styles.marginBottom = '5em';
				this.holderStylesD.flexDirection = 'row';
				this.holderStylesD.alignItems = 'flex-start';
			} else {
				this.tabMQOn = false;
				this.demoH1Styles.marginBottom = '2em';
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
			let randos = this.getRands(this.canvArray.length - 1);
			let solArray = [];
			randos.forEach((x,i) => {
				solArray[x] = i;
			});
			return [solArray.concat([this.canvArray.length - 1]), randos.concat([this.canvArray.length - 1])];
		},
		swapTiles: function(e){
			if(this.gameOver){return;}
			let x = e.offsetX;
			let y = e.offsetY;
			let tileClicked = (Math.floor(y / 82) * 5) + Math.floor(x / 82);
			let blank = this.boardOrder.indexOf(this.canvArray.length - 1);
			let finalCheck;
			let brdInd = this.boardOrder[tileClicked];
			if(![1, 5].includes(Math.abs(tileClicked - blank))){
				return;
			}
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
		useCanvas: function(){
			this.pic.onload = () => {
			  for(let i = 0; i < this.canvArray.length - 1; i++){
			    this.ctx.drawImage(this.pic, this.canvArray[i][0], this.canvArray[i][1], 82, 82, this.canvArray[this.doable[1][i]][0], this.canvArray[this.doable[1][i]][1], 82, 82);
			  }
			}
			this.pic.src = "images/mucha.jpg";
		}
	},
	computed: {
		holderStylesC: function(){
				if(this.tabMQOn){
					return { height: '650px' }
				} else {
					return { height: this.helpOpen ? '1100px' : '800px' }
				}
		},
		innerDivStyles: function(){
			let ht = this.helpOpen ? '380px' : 'auto';
			return {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'center',
				height: ht
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
				width: '200px',
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
		doable: function(){
			let brd = this.checkBoard();
			while(this.getInversions(brd[0]) % 2 !== 0){
				brd = this.checkBoard();
			}
			return brd;
		},
		boardOrder: function(){
			return this.doable[0].slice();
		}
	},
	created: function(){
		this.tabMQ.addListener(this.handleTabMQ);
		this.handleTabMQ(this.tabMQ);
	},
	mounted: function(){
		this.useCanvas();
	}
}

const Home = {
	template: `<div><aside v-if="showLocPara">
					<p id="loc">It's a nice {{dayOrNight}} here in {{geoPlace}}, a great time to use a....<a v-if="showLocBtn" @click="getLocation">(Fill in with my location)</a></p>
				</aside>

				<header>
					<h1 id="mainh1">15 Puzzle Generator</h1>
					<p>This app will generate HTML, CSS and JS for you to paste into your project files to add an HTML canvas-based <a href="https://en.wikipedia.org/wiki/15_puzzle">15 puzzle</a>.&nbsp;&nbsp;Demo <router-link to="/demo">here</router-link>.&nbsp;&nbsp;Just fill out the form and the code below will live-update!</p>
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
				<app-footer></app-footer>
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
			languages: ['HTML', 'CSS', 'JS'],
			currentLangInd: 0,
			geoAccuracy: null,
			breakpoints: {
				JSBreakpoint: window.matchMedia("(min-width: 510px)"),
				H1BackgroundLarge: window.matchMedia("(min-width: 768px)")
			},
			showLocBtn: true,
			geoPlace: '[place]',
			dayOrNight: '[time]',
      showLocPara: true
    }
  },
	methods: {
		checkForGeoLocSupport: function(){
			if(navigator.geolocation){
				console.log('geoloc supported');
			} else {
				console.log('geoloc NOT supported');
				this.showLocPara = false;
			}
		},
		doCopy: function(){
			this.$copyText(this.$refs.code.textContent.replace(/[ ]{2,}/g, '')).then(function (e) {
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

			try{
				let sdate;
				let day = new Date();
				if(pos.coords.longitude < 0){
					sdate = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
				} else {
					sdate = 'today';
				}
				console.log(day, sdate);

				fetch(`https://api.sunrise-sunset.org/json?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}&date=${sdate}&formatted=0`).then(res => res = res.json()).then(res => {
					console.log(res);
					if(res.status !== 'OK'){
						this.geoError({code: '', message: res.status});
						return;
					}
					let sunrise = moment.utc(res.results.sunrise), sunset = moment.utc(res.results.sunset);
					console.log(sunrise, sunset);
					console.log(moment.utc().isBetween(sunrise, sunset));
					if(moment.utc().isBetween(sunrise, sunset)){
						this.dayOrNight = 'day';
					} else {
						this.dayOrNight = 'night';
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
		this.breakpoints.H1BackgroundLarge.addListener(this.handleH1BG);
		this.handleH1BG(this.breakpoints.H1BackgroundLarge);
		this.checkForGeoLocSupport();
	}
}

const routes = [
	{ path: '/artwork', component: Artwork },
	{ path: '/sunset', component: Sunset },
	{ path: '/demo', component: Demo },
  { path: '/', component: Home }
]

const router = new VueRouter({
  routes
})

// <a href="https://sunrise-sunset.org/api">Sunrise/sunset info</a>



Vue.component('app-footer', {
  template: `<footer>
  	<p>&copy; 2018 James South | <a href="https://jamessouth.github.io/Project-12/">Portfolio</a> | <router-link to="/artwork">Artwork</router-link> | <router-link to="/sunset">Sunset info</router-link></p>
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
  router
});
