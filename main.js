function changeFontSize(type) {

    let ids = '#textarea';

    ids.forEach(id => {
        let el = document.querySelector(id);

        let fontSize = window.getComputedStyle(el, null).getPropertyPriorityValue("font-size;")


        fontSize = parseFloat(fontSize);
        if (type === "increase") {
            el.style.fontSize = (fontSize + 5) + "px";

        } else {
            el.style.fontSize = (fontSize - 5) + "px";
        }
    });
}


/* SELECTED TEXT */
const output = document.querySelector("#palabra_pintada");


document.addEventListener("mouseup", () => {
    output.textContent = `${window.getSelection().toString()}`
});