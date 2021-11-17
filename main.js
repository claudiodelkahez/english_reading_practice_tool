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

// DICTIONARY

const wrapper = document.querySelector(".wrapper"),
    searchInput = wrapper.querySelector("input"),
    synonyms = wrapper.querySelector(".synonyms .list"),
    infoText = wrapper.querySelector(".info-text"),
    volumeIcon = wrapper.querySelector(".word i"),
    removeIcon = wrapper.querySelector(".search span");
let audio;

//Data function
function data(result, word) {
    if (result.title) {//if api returns the messege of cant find word
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search another word`
    } else {
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0];
        phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}`

        //let's pass the particular response data to a particular html element
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;
        audio = new Audio("https:" + result[0].phonetics[0].audio); //creating new audio obj and passing audio src

        if (definitions.synonyms[0] == undefined) {//if there is no synonym then hide the synonyms div
            synonyms.parentElement.style.display = "none";
        } else {
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for (let i = 0; i < 5; i++) { //getting only 5 synonyms out of many
                let tag = `<span onclick=search('${definitions.synonyms[i]}')>${definitions.synonyms[i]},</span>`;
                synonyms.insertAdjacentHTML("beforeend", tag); // passing all 5 synonyms out of many

            }
        }

    }
};

//search synonyms function
function search(word) {
    searchInput.value = word;
    fetchApi(word);
}

//fetch api function

function fetchApi(word) {
    wrapper.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    //api response and returniong it with parsin into js obj and in another then alling data function with passing api response and searched word as an argument
    fetch(url).then(res => res.json()).then(result => data(result, word));
};

//targuetea lo que este adentro de la caja de input
searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter" && e.target.value) {
        fetchApi(e.target.value);
    }//valor retornado
});

volumeIcon.addEventListener("click", () => {
    audio.play();

});

removeIcon.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#9a9a9a";
    infoText.innerHTML = ` Type a word and press enter to get meaning, example, pronunciation, and synonyms of that typed word.`;
});