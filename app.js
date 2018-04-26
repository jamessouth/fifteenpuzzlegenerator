const buttons = document.querySelectorAll('#buttons > button');
const html = document.querySelector('#html');
const css = document.querySelector('#css');
const js = document.querySelector('#js');
const submit = document.querySelector('#submit');
const copyBtn = document.querySelector('#copy');
const codeBox = document.querySelector('#code');
const header = document.querySelector('header');



// header.style.backgroundPositionX = '50%';
// header.style.backgroundPositionY = '50%';

const clipboard = new ClipboardJS('#copy', {
  target: function() {
            return codeBox;
          },
  text: function() {
          let visibleCode = [...codeBox.children].filter(c => c.offsetParent !== null)[0];
          visibleCode.style.color = 'black';
          return visibleCode.textContent.replace(/	+/g, '');
        }

});


clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});



// copyBtn.addEventListener('click', e => {
//   const cpu = document.querySelector('#copiedPopup');
//   let range = document.createRange();
//   range.selectNode(codeBox);
//   window.getSelection().addRange(range);
//   let gg = document.execCommand('copy');
//   console.log(gg);
//   window.getSelection().removeRange(range);
//   cpu.style.display = 'block';
//   cpu.style.animation = '1s 2.2s ease-out fadeOut forwards';
//   cpu.addEventListener('animationend', e => {
//     cpu.style.display = 'none';
//   });
// });

// document.addEventListener('copy', e => {
//   let copiedText = window.getSelection();
//   console.log(copiedText);
//   e.clipboardData.setData('text/plain', copiedText);
//   e.preventDefault();
// });

function handleButtons(){
  [...this.parentNode.children].forEach(b => b.classList.remove('selected'));
  this.classList.add('selected');

  if(this.textContent === 'HTML'){
    css.style.display = 'none';
    js.style.display = 'none';
    html.style.display = 'block';

  } else if(this.textContent === 'CSS'){
    html.style.display = 'none';
    js.style.display = 'none';
    css.style.display = 'block';

  } else if(this.textContent === 'JS'){
    html.style.display = 'none';
    css.style.display = 'none';
    js.style.display = 'block';


  }

}


buttons.forEach(b => b.addEventListener('click', handleButtons));


function testVals(arr){
  console.log(arr);
  // console.log(typeof arr[0]);
  const error = document.querySelector('#error');
  if(isNaN(arr[0]) && isNaN(arr[1])){
    error.textContent = 'Please enter numbers for width and height.'
    return false;
  } else if(!(arr[0] / arr[2] === arr[1] / arr[3])){
    error.textContent = 'This arrangement would result in tiles that are not square. The image does not have to be square, but the ratio of width to height in pixels and in tiles must be equal.';
    return false;
  } else if(!(arr[0] % arr[2] === 0 && arr[1] % arr[3] === 0)){

    error.textContent = 'The number of tiles must divide evenly into the size in pixels in the given dimension.';
    return false;
  } else {
    error.textContent = 'Your code is ready. Please click the tabs below.';
    return true;
  }

}



function popHTML(info){
  const spans = html.querySelectorAll('span.red');
  spans.forEach((s,i) => s.textContent = info[i]);
}

function popCSS(info){
  const spans = css.querySelectorAll('span');
  const colorInput = document.querySelector('input[type="color"]');
  spans[0].textContent = colorInput.value;
  spans[1].textContent = info[0];
}

function popJS(info, path){
  console.log(path);
  const pathSpan = document.querySelector('#path');

  if(!!path){
    pathSpan.textContent = `"${path}"`;
    pathSpan.style.backgroundColor = 'transparent';
  } else {
    pathSpan.textContent = '[path to your image]';
    pathSpan.style.backgroundColor = 'red';
    document.querySelector('#error').textContent += ' Be sure to update the src attribute of the Image with your path. It is highlighted in red in the JS.';
  }

  let tileSize = info[0] / info[2];
  const info2Spans = js.querySelectorAll('span.info2');
  js.querySelector('span.info3').textContent = info[3];
  const tileSizeSpans = js.querySelectorAll('span.tileSize');
  const info2m1Spans = js.querySelectorAll('span.info2-1');
  const info2x3m1m1Spans = js.querySelectorAll('span.info2xinfo3-1-1');
  const info2x3m2Spans = js.querySelectorAll('span.info2xinfo3-2');
  const info2m1xtsSpans = js.querySelectorAll('span.info2-1xtileSize');
  const info3m1xtsSpans = js.querySelectorAll('span.info3-1xtileSize');

  // console.log([...info2Spans, info3Span, ...tileSizeSpans, ...info2m1Spans, ...info2x3m1m1Spans, ...info2x2m2Spans, ...info2m1xtsSpans, ...info3m1xtsSpans].reduce((a,n) => {a=a+1; return a;}, 0));
  // spans.forEach((s,i) => s.textContent = info[i]);

  info2Spans.forEach(x => x.textContent = info[2]);
  tileSizeSpans.forEach(t => t.textContent = tileSize);
  info2m1Spans.forEach(z => z.textContent = info[2] - 1);
  info2x3m1m1Spans.forEach(b => b.textContent = info[2] * (info[3] - 1) - 1);
  info2x3m2Spans.forEach(u => u.textContent = info[2] * info[3] - 2);
  info2m1xtsSpans.forEach(q => q.textContent = (info[2] - 1) * tileSize);
  info3m1xtsSpans.forEach(k => k.textContent = (info[3] - 1) * tileSize);



}



submit.addEventListener('click', function (e) {
  // console.log(e);
  e.preventDefault();
  const pathInput = document.querySelector('input[type="text"]');
  const inputs = document.querySelectorAll('input.num');
  const selects = document.querySelectorAll('select');
  let info = [...inputs, ...selects].map(i => parseInt(i.value, 10));
  if(testVals(info)){
    popHTML(info);
    popCSS(info);
    popJS(info, pathInput.value);
  }

});


document.body.addEventListener('mousemove', function (e) {
  if((this.offsetWidth < 751)||(this.offsetWidth < 1063 && window.scrollY > 110)||(window.scrollY > 160)){
    return;
  }
  // else if{
  //   return;
  // } else if{
  //   return;
  // }



  else {
    // console.log(header.style.backgroundPositionX);
    


  }
});










// k
