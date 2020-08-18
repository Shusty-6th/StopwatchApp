// button selectors
const btnSelectTheme = document.querySelector('i.select-theme');
const btnInstruction = document.querySelector('i.instruction');
const btnClose = document.querySelector('button.close');

const btnThemeColors = {
    red: document.querySelector('button.color.red'),
    blue: document.querySelector('button.color.blue'),
    green: document.querySelector('button.color.green')
};

// selectors
const hideLayer = document.querySelector('div.hide-layer');
const infoPanel = document.querySelector('aside.info');
const selectThemePanel = document.querySelector('section.theme-color');

// theme-colors
const root = document.documentElement;
const style = getComputedStyle(root);
const colors = {
    red: style.getPropertyValue('--theme-color-red'),
    blue: style.getPropertyValue('--theme-color-blue'),
    green: style.getPropertyValue('--theme-color-green')
};

//register button click events
btnInstruction.addEventListener('click', () => {
    hideLayer.classList.add('active');
    infoPanel.classList.add('active');
});

function registerCloseInfoPanel() {
    hideLayer.classList.remove('active');
    infoPanel.classList.remove('active');
}

btnClose.addEventListener('click', registerCloseInfoPanel);
hideLayer.addEventListener('click', registerCloseInfoPanel);

btnSelectTheme.addEventListener('click', () => {
    selectThemePanel.classList.toggle('active');
});

for (const [key, value] of Object.entries(btnThemeColors)) {
    value.addEventListener('click', () => {
        root.style.setProperty('--theme-color', colors[key]);
    });
}

// stopwatch  timer
const stopwatch = new Stopwatch();