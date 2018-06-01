



Vue.component('app-footer', {
  template: `<footer>
  	<p>&copy; 2018 James South&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://jamessouth.github.io/Project-12/">Portfolio</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://sunrise-sunset.org/api">Sunrise/sunset info</a></p>
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
    dayOrNight: '[time]',
    showLocBtn: true,
    showLocPara: true,
    geoAccuracy: null,
    geoPlace: '[place]',
    breakpoints: {
      JSBreakpoint: window.matchMedia("(min-width: 510px)"),
      H1BackgroundLarge: window.matchMedia("(min-width: 768px)")
    }
  },
  methods: {
    doCopy: function(){
      // this.$el is the Vue instance, children[1] is the <main> element, children[3] is the #code div that has the text we want to copy
      this.$copyText(this.$el.children[1].children[3].textContent.replace(/[ ]{2,}/g, '')).then(function (e) {
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
        timeout: 10000
      });
      this.showLocBtn = false;
    },
    checkForGeoLocSupport: function(){
      if(navigator.geolocation){
        console.log('geoloc supported');
      } else {
        console.log('geoloc NOT supported');
        this.showLocPara = false;
      }
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
          let sunrise = moment.utc(res.results.sunrise), sunset = moment.utc(res.results.sunset);
          console.log(sunrise, sunset);
          console.log(moment.utc().isBetween(sunrise, sunset));
          if(moment.utc().isBetween(sunrise, sunset)){
            this.dayOrNight = 'day';
          } else {
            this.dayOrNight = 'night';
          }

        });


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
  created: function(){
    this.breakpoints.JSBreakpoint.addListener(this.handleJSExpand);
    this.handleJSExpand(this.breakpoints.JSBreakpoint);
    this.breakpoints.H1BackgroundLarge.addListener(this.handleH1BG);
    this.handleH1BG(this.breakpoints.H1BackgroundLarge);
    this.checkForGeoLocSupport();

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
