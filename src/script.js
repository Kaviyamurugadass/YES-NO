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
    
    // If already spinning, ignore the click
    if (isSpinning) return;
    
    // Calculate a random number of complete rotations (5-10) plus extra degrees
    const minSpins = 5;
    const maxSpins = 10;
    const spins = Math.floor(Math.random() * (maxSpins - minSpins + 1) + minSpins);
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalDegrees = (spins * 360) + extraDegrees;
    
    // Get current rotation
    const currentRotation = getRotationDegrees(wheel);
    
    // Add to current rotation to ensure continuous spinning
    const value = currentRotation + totalDegrees;
    
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

    // Apply the new rotation with a consistent transition
    wheel.style.transition = 'transform 5s cubic-bezier(0.2, 0.8, 0.3, 1)';
    wheel.style.transform = `rotate(${value}deg)`;
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
    // Normalize rotation to a value between 0 and 360
    const normalizedRotation = rotation % 360;
    console.log('Normalized Rotation:', normalizedRotation);
    
    // Each segment is 60 degrees (360/6)
    const segmentSize = 60;
    
    // Calculate the segment index (0-5)
    // Add 30 degrees to account for the offset and reverse the direction
    let segmentIndex = Math.floor(((360 - (normalizedRotation + 30)) % 360) / segmentSize);
    console.log('Initial Segment Index:', segmentIndex);
    
    // Map to ARRAY_OBJ index (1-based)
    // We need to adjust the mapping to match the visual segments
    const mappedIndex = ((segmentIndex + 1) % 6) || 6;  // Convert 0 to 6
    console.log('Mapped Index:', mappedIndex);
    
    // Log segment boundaries for debugging
    const segmentStart = (360 - ((segmentIndex + 1) * 60 + 30)) % 360;
    const segmentEnd = (360 - (segmentIndex * 60 + 30)) % 360;
    console.log(`Segment ${mappedIndex} boundaries: ${segmentStart}° to ${segmentEnd}°`);
    
    // Find the matching segment in ARRAY_OBJ
    const segment = ARRAY_OBJ.find(obj => Number(obj.num) === mappedIndex);
    console.log('Found Segment:', segment);
    
    if (segment) {
        console.log(`Landing on segment ${segment.num}: ${segment.child} (${segment.color})`);
    }
    
    return segment ? segment.child : 'YES';
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
