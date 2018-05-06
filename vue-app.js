Vue.component('app-header', {
  template: `<header>

    <h1 id="mainh1">15 Puzzle Generator</h1>
    <p>This app will generate HTML, CSS and JS for you to paste into your project files to add an HTML canvas-based <a href="https://en.wikipedia.org/wiki/15_puzzle">15 puzzle</a>.&nbsp;&nbsp;Demo <a href="demo.html">here</a>.</p>
  </header>`
});

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello world!!!'
  }
});
