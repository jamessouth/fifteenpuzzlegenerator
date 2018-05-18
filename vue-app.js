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
    currentLang: 0
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
    changeLang: function(dir){
      if(dir === 'up'){
        this.currentLang += 1;
      } else {
        this.currentLang -= 1;
        if(this.currentLang < 0){
          this.currentLang = this.languages.length - 1;
        }
      }
    }
  }
});
