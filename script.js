const generatePaletteBtn = document.getElementById('generate-palette-btn');
const paletteContainer = document.querySelector('.palette-container');

generatePaletteBtn.addEventListener("click", generatePalette);

paletteContainer.addEventListener("click", function(e){
    if(e.target.classList.contains("copy-btn")){
        const hexValue = e.target.parentElement.querySelector('.color-hex').textContent;
        navigator.clipboard.writeText(hexValue)
        .then(() => showCopySuccess(e.target))
        .catch(() => console.log("Failed to copy color"))
    } else if(e.target.classList.contains("color")){
        const hexValue = e.target.nextElementSibling.querySelector('.color-hex').textContent;
        navigator.clipboard.writeText(hexValue)
        .then(() => {
            const copyBtn = e.target.nextElementSibling.querySelector('.copy-btn');
            showCopySuccess(copyBtn);
        })
        .catch(() => console.log("Failed to copy color"))
    }
});

function generatePalette() {
    const colors = [];
    for (let i = 0; i < 5; i++) {
        colors.push(getRandomColor());
    }
    displayPalette(colors);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function displayPalette(colors) {
    const colorBoxes = document.querySelectorAll('.color-box');

    colorBoxes.forEach((colorBox, index) => {
        const color = colors[index];
        const colorDiv = colorBox.querySelector('.color');
        const hexValue = colorBox.querySelector('.color-hex');

        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;

    });
}

function showCopySuccess(copyBtn) {
    const originalColor = copyBtn.style.color;
    
    copyBtn.classList.remove("fa-copy");
    copyBtn.classList.add("fa-check");
    copyBtn.style.color = "#00feba";

    setTimeout(() => {
        copyBtn.classList.remove("fa-check");
        copyBtn.classList.add("fa-copy");
        copyBtn.style.color = originalColor;
    }, 1500);
}
