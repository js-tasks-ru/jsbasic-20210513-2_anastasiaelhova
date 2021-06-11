let btnSelector = '.toggle-text-button';
let textSelector = '#text';

function toggleText() {
    let button = document.querySelector(btnSelector);
    button.onclick = function() {
        let text = document.querySelector(textSelector);
        if (text.hidden) {
            text.hidden = false;
        } else {
            text.hidden = true;
        }
    };

}