// let spinButton = document.querySelector(".spinBtn");

// Add spinning state flag
let isSpinning = false;

export default ()=>{
    let wheel = document.querySelector(".wheel");
    var value = Math.floor(Math.random()*3600+3600);

    // Set spinning state to true
    isSpinning = true;

    // Remove any existing transition end listener
    wheel.removeEventListener('transitionend', handleSpinComplete);
    
    // Add transition end listener
    wheel.addEventListener('transitionend', handleSpinComplete);

    wheel.style.transform = "rotate(" +value+ "deg)";
    console.log("Spinning to degree:", value);
};

// Function to handle spin completion
function handleSpinComplete(event) {
    // Only show result if we were spinning
    if (!isSpinning) return;
    
    // Reset spinning state
    isSpinning = false;

    const wheel = event.target;
    const rotation = getRotationDegrees(wheel);
    const result = calculateResult(rotation);
    
    // Remove the event listener to prevent multiple triggers
    wheel.removeEventListener('transitionend', handleSpinComplete);
    
    // Show popup with result
    showResultPopup(result);
}

// Get the actual rotation value
function getRotationDegrees(element) {
    const style = window.getComputedStyle(element);
    const matrix = new WebKitCSSMatrix(style.transform);
    const angle = Math.round(Math.atan2(matrix.m12, matrix.m11) * (180/Math.PI));
    return (angle < 0) ? angle + 360 : angle;
}

// Calculate whether it landed on YES or NO
function calculateResult(rotation) {
    // Each segment is 60 degrees (360/6)
    const normalizedRotation = rotation % 360;
    const segmentSize = 60;
    const segment = Math.floor(normalizedRotation / segmentSize);
    // Odd segments are YES (1, 3, 5), even segments are NO (0, 2, 4)
    return segment % 2 === 1 ? 'YES' : 'NO';
}

// Show the result popup
function showResultPopup(result) {
    // Remove any existing popups first
    const existingPopup = document.querySelector('.result-popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    const popup = document.createElement('div');
    popup.className = 'result-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Result</h2>
            <p class="result-text">${result}</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    document.body.appendChild(popup);
}

export const ARRAY_OBJ = [{
    num: '1',
    color: "#00ff00",
    child: 'YES',
},
{
    num: 2,
    color: 'rgb(255, 64, 0)',
    child: 'NO',
},
{
    num: 3,
    color: '#00ff00',
    child: 'YES',
},
{
    num: 4,
    color: 'rgb(255, 64, 0)',
    child: 'NO',
},
{
    num: 5,
    color: '#00ff00',
    child: 'YES',
},
{
    num: 6,
    color: 'rgb(255, 64, 0)',
    child: 'NO',
},
];
