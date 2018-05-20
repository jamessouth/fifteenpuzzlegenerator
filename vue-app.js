



Vue.component('app-header', {
  template: `<header>
    <h1 id="mainh1">15 Puzzle Generator</h1>
    <p>This app will generate HTML, CSS and JS for you to paste into your project files to add an HTML canvas-based <a href="https://en.wikipedia.org/wiki/15_puzzle">15 puzzle</a>.&nbsp;&nbsp;Demo <a href="demo.html">here</a>.&nbsp;&nbsp;Just fill out the form and the code below will live-update!</p>
  </header>`
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




// Vue.component('app-tabs', {
//   props: ['labels'],
//   template: `<div id="buttons">
//      <button v-for="label in labels">{{label}}</button>
//
//    </div>`
// });




Vue.component('code-html', {
  props: ['imageWidth', 'imageHeight'],
  template: `<pre><code>&lt;canvas width="{{imageWidth}}" height="{{imageHeight}}"&gt;
            &nbsp;&nbsp;Your browser does not support canvas.
            &lt;/canvas&gt;</code></pre>`
});


Vue.component('code-html-helper-image', {
  template: `<pre><code>&lt;img src="[path to your image]" alt=""/&gt;</code></pre>`
});

// <app-tabs :labels="['HTML', 'CSS', 'JS', 'Copy']"></app-tabs>


// const codeBox = document.querySelector('#code');

const app = new Vue({
  el: '#app',
  data: {
    basic: {
      imageWidth: null,
      imageHeight: null,
      widthTiles: 2,
      heightTiles: 2
    },
    additional: {
      helperImage: false
    },
    languages: ['HTML', 'CSS', 'JS'],
    currentLangInd: 0,
    breakpoints: {
      JSBreakpoint: window.matchMedia("(min-width: 510px)"),
      H1BackgroundLarge: window.matchMedia("(min-width: 768px)")
      // H1BackgroundMedium: window.matchMedia("(min-width: 468px) and (max-width: 1079px)"),
      // H1BackgroundSmall: window.matchMedia("(max-width: 467px)")
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
    handleBGLargeMQ: function(evt){
      console.log('mq: ', evt.media, evt.matches);
      let rando = Math.floor(Math.random() * 2) + 1;
      // console.log(document.documentElement.style.setProperty());
      console.log(rando);
      if(evt.matches){
        console.log('big', window.innerWidth);
        // loadBG('big');
      }
    }
    // handleBGMediumMQ: function(evt){
    //   console.log('mq: ', evt.media, evt.matches);
    //   if(evt.matches){
    //     console.log('med', window.innerWidth);
    //     // loadBG('small');
    //   }
    // },
    // handleBGSmallMQ: function(evt){
    //   console.log('mq: ', evt.media, evt.matches);
    //   if(evt.matches){
    //     console.log('small', window.innerWidth);
    //     // header.style.backgroundImage = `none`;
    //   }
    // },



  },
  created: function(){
    this.breakpoints.JSBreakpoint.addListener(this.handleJSExpand);
    this.handleJSExpand(this.breakpoints.JSBreakpoint);


    this.breakpoints.H1BackgroundLarge.addListener(this.handleBGLargeMQ);
    this.handleBGLargeMQ(this.breakpoints.H1BackgroundLarge);
    //
    // this.breakpoints.H1BackgroundMedium.addListener(this.handleBGMediumMQ);
    // this.handleBGMediumMQ(this.breakpoints.H1BackgroundMedium);
    //
    // this.breakpoints.H1BackgroundSmall.addListener(this.handleBGSmallMQ);
    // this.handleBGSmallMQ(this.breakpoints.H1BackgroundSmall);
  },
  computed: {
    currentLang: function(){
      return this.languages[this.currentLangInd % this.languages.length];
    }
  }
});
