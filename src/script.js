// let spinButton = document.querySelector(".spinBtn");

// Add spinning state flag
let isSpinning = false;
let wheelAudio = null;
let victorySound = null;

// Initialize audio
function initAudio() {
    if (!wheelAudio) {
        wheelAudio = new Audio('./spin-232536.mp3');
        wheelAudio.loop = true;
        wheelAudio.volume = 0.6;
    }
    
    if (!victorySound) {
        victorySound = new Audio('https://assets.mixkit.co/active_storage/sfx/2020/2020-preview.mp3');
        victorySound.volume = 0.4;
    }
}

// Initialize confetti
function initConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const count = 200;
    const defaults = {
        origin: { y: 0.7 },
        spread: 360,
        ticks: 100,
        gravity: 0.8,
        decay: 0.95,
        startVelocity: 30,
        shapes: ['square', 'circle', '🤩'],
        colors: colors,
        scalar: 1.2
    };

    function fire(particleRatio, opts) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
        });
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}

export default ()=>{
    let wheel = document.querySelector(".wheel");
    var value = Math.floor(Math.random()*3600+3600);

    // Set spinning state to true
    isSpinning = true;

    // Initialize and play spinning sound
    initAudio();
    if (wheelAudio) {
        wheelAudio.currentTime = 0;
        wheelAudio.play().catch(error => {
            console.error('Error playing audio:', error);
        });
    }

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

    // Stop the spinning sound immediately
    if (wheelAudio) {
        wheelAudio.pause();
        wheelAudio.currentTime = 0;
    }

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

    // Play victory sound
    if (victorySound) {
        victorySound.currentTime = 0;
        victorySound.play().catch(error => {
            console.error('Error playing victory sound:', error);
        });
    }

    // Trigger confetti effect
    initConfetti();

    const popup = document.createElement('div');
    popup.className = 'result-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <p class="result-text ${result}">${result}!</p>
            <button class="got-it ${result}" onclick="this.parentElement.parentElement.remove()">GOT IT!</button>
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
