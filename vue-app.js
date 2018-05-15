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
//     <button v-for="label in labels">{{label}}</button>
//     <a href="mailto:?subject=Code%20for%20the%2015%20puzzle"><button>Email</button></a>
//   </div>`
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
    }


  }
});
