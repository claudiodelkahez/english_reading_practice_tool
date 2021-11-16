/* <-- FONT SIZE CONTROLS --> */


var textarea = document.querySelector('.textarea');
var increaseBtn = document.querySelector('.boton__aumentar');
var decreaseBtn = document.querySelector('.boton__disminuir');


var textSize = 20;


//aumentar 

increaseBtn.addEventListener('click', () => {
    textSize = textSize + 1;
    textarea.style.fontSize = textSize + 'px';
});

//disminuir 

decreaseBtn.addEventListener('click', () => {
    textSize = textSize - 1;
    textarea.style.fontSize = textSize + 'px';
});

/* <-- FONT SIZE CONTROLS --> */




/* SELECTED TEXT */

const output = document.querySelector("#palabra_pintada");


document.addEventListener("mouseup", () => {
    output.textContent = `${window.getSelection().toString()}`
});