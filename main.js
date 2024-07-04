/*

1 - DRUMS
2 - FX
3 - BASS
4 - GOAT SOUL
5 - MELODY

*/
const buttonMapping = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 2],
    [3, 3, 3, 3, 3, 4, 5, 2],
    [5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 4, 4, 4, 4, 5, 4],
    [4, 2, 4, 5, 2, 5, 5, 5],
    [5, 4, 4, 4, 4, 4, 5, 5]
]

let columnCount = 1;
const soundboard = document.querySelector('.soundboard');
buttonMapping.forEach(element => {
    const column = document.createElement('div');
    column.classList.add('column');
    column.classList.add(`column-${columnCount}`);
    element.forEach(button => {
        const buttonElement = document.createElement('button');
        buttonElement.addEventListener('click', () => soundboardButtonClicked(buttonElement));
        const p = document.createElement('p');

        if (button === 1) {
            p.innerText = 'DRUMS';
            buttonElement.classList.add('drums');
        } else if (button === 2) {
            p.innerText = 'FX';
            buttonElement.classList.add('fx');
        } else if (button === 3) {
            p.innerText = 'BASS';
            buttonElement.classList.add('bass');
        } else if (button === 4) {
            p.innerText = 'GOAT SOUL';
            buttonElement.classList.add('goatsoul');
        } else if (button === 5) {
            p.innerText = 'MELODY';
            buttonElement.classList.add('melody');
        }

        buttonElement.appendChild(p);
        column.appendChild(buttonElement);
    });
    soundboard.appendChild(column);
    columnCount++;
});

function soundboardButtonClicked(button) {
    // Get the parent column of the clicked button
    const column = button.parentElement;

    // Loop through all buttons in the column
    const buttons = column.querySelectorAll('button');
    buttons.forEach(btn => {
        // Remove the active class from each button
        btn.classList.remove('glow');
        btn.classList.remove('active');

    });

    // Add the active class to the clicked button
    button.classList.add('active');
    button.classList.add('glow');
}
