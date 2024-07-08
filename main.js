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
    column.classList.add(columnCount);
    let buttonCount = 1;
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

        buttonElement.classList.add(buttonCount);
        buttonCount++;
        buttonElement.appendChild(p);
        column.appendChild(buttonElement);
    });
    soundboard.appendChild(column);
    columnCount++;
});

function soundboardButtonClicked(button) {
    // If the button is already active, remove the active class and return
    if (button.classList.contains('active')) {
        button.classList.remove('active');
        button.classList.remove('glow');
        return;
    }
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

let interval = 0;
setInterval(() => {
    const activeButtons = document.querySelectorAll('.counter.active');
    if (activeButtons.length < 8) {
        const lastButton = activeButtons[activeButtons.length - 1];
        const nextButton = lastButton.nextElementSibling;
        nextButton.classList.add('active');
    } else {
        // Make the first counter active
        activeButtons.forEach(button => {
            button.classList.remove('active');
        });
        const firstButton = document.querySelector('.counter');
        firstButton.classList.add('active');

        // Play audio if any button is active
        const activeSoundButtons = document.querySelectorAll('button.active');
        if (activeSoundButtons.length === 0) {
            interval = 0;
        } else if (activeSoundButtons.length != 0) {
            if (interval === 2) {
                interval = 0
            }
            if (interval === 0) {
                activeSoundButtons.forEach(button => {
                    // Getting the number of the parent column
                    const parent = button.parentElement;
                    const parentClasses = parent.classList;
                    const parentClassesNumber = Array.from(parentClasses)[1];

                    // Getting the number of the button
                    const buttonClasses = button.classList;
                    const buttonClassesNumber = Array.from(buttonClasses)[1];

                    // Playing the audio
                    var audio = new Audio(`./audio/${parentClassesNumber}${buttonClassesNumber}.ogg`);
                    audio.play();
                });
                interval++;
            } else {
                interval++;
            }
        }
    }
}, 860); // Technically it needs to be every 869.6ms but 860 will give the audio a bit of time to load