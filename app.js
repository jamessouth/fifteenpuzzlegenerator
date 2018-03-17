const buttons = document.querySelectorAll('#buttons button');
const code = document.querySelector('#code code');
const submit = document.querySelector('#submit');



function handleButtons(){
  [...this.parentNode.children].forEach(b => b.classList.remove('selected'));
  this.classList.add('selected');
  if(this.textContent === 'HTML'){
    code.textContent = 'html';
  } else if(this.textContent === 'CSS'){
    code.textContent = 'css';
  } else {
    code.textContent = 'js';
  }
}


buttons.forEach(b => b.addEventListener('click', handleButtons));


function testVals(arr){
  const error = document.querySelector('#error');
  if(!(arr[0] % arr[2] === 0 && arr[1] % arr[3] === 0)){
    error.textContent = 'The number of tiles must divide evenly into the size in pixels in the given dimension.';
    return false;
  } else if(!(arr[0] / arr[2] === arr[1] / arr[3])){
    error.textContent = 'This arrangement would result in tiles that are not square. The image does not have to be a square, but the ratio of width to height in pixels and in tiles must be equal.';
    return false;
  }
  error.textContent = '';
  return true;
}



submit.addEventListener('click', function (e) {
  // console.log(e);
  const inputs = document.querySelectorAll('input');
  const selects = document.querySelectorAll('select');
  let info = [...inputs, ...selects].map(i => parseInt(i.value, 10));
  console.log(testVals(info));

});
