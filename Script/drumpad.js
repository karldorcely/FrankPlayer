// Drum sounds using Web Audio API to generate synthetic drum sounds
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Recording variables
let mediaRecorder;
let audioChunks = [];
let isRecording = false;
let mediaStreamDestination;

// Get elements
const backingTrack = document.getElementById('backing-track');
const recordBtn = document.getElementById('record-btn');
const stopBtn = document.getElementById('stop-btn');
const downloadBtn = document.getElementById('download-btn');
const statusText = document.getElementById('status');

// Create a destination for recording
mediaStreamDestination = audioContext.createMediaStreamDestination();

// Connect backing track to audio context and recording destination
const trackSource = audioContext.createMediaElementSource(backingTrack);
trackSource.connect(audioContext.destination);
trackSource.connect(mediaStreamDestination);

const drumSounds = {
    kick: () => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        gain.connect(mediaStreamDestination); // Also connect to recording
        
        osc.frequency.setValueAtTime(150, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        gain.gain.setValueAtTime(1, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.5);
    },
    snare: () => {
        const noise = audioContext.createBufferSource();
        const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.2, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseBuffer.length; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        noise.buffer = noiseBuffer;
        
        const noiseGain = audioContext.createGain();
        noise.connect(noiseGain);
        noiseGain.connect(audioContext.destination);
        noiseGain.connect(mediaStreamDestination); // Also connect to recording
        noiseGain.gain.setValueAtTime(1, audioContext.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        noise.start(audioContext.currentTime);
    },
    hihat: () => {
        const noise = audioContext.createBufferSource();
        const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.05, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseBuffer.length; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        noise.buffer = noiseBuffer;
        
        const bandpass = audioContext.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.value = 10000;
        
        const noiseGain = audioContext.createGain();
        noise.connect(bandpass);
        bandpass.connect(noiseGain);
        noiseGain.connect(audioContext.destination);
        noiseGain.connect(mediaStreamDestination); // Also connect to recording
        noiseGain.gain.setValueAtTime(0.3, audioContext.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        
        noise.start(audioContext.currentTime);
    },
    openhat: () => {
        const noise = audioContext.createBufferSource();
        const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.3, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseBuffer.length; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        noise.buffer = noiseBuffer;
        
        const bandpass = audioContext.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.value = 8000;
        
        const noiseGain = audioContext.createGain();
        noise.connect(bandpass);
        bandpass.connect(noiseGain);
        noiseGain.connect(audioContext.destination);
        noiseGain.connect(mediaStreamDestination); // Also connect to recording
        noiseGain.gain.setValueAtTime(0.3, audioContext.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        noise.start(audioContext.currentTime);
    },
    clap: () => {
        for (let i = 0; i < 3; i++) {
            const noise = audioContext.createBufferSource();
            const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.05, audioContext.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            for (let j = 0; j < noiseBuffer.length; j++) {
                output[j] = Math.random() * 2 - 1;
            }
            noise.buffer = noiseBuffer;
            
            const noiseGain = audioContext.createGain();
            noise.connect(noiseGain);
            noiseGain.connect(audioContext.destination);
            noiseGain.connect(mediaStreamDestination); // Also connect to recording
            noiseGain.gain.setValueAtTime(0.5, audioContext.currentTime + i * 0.02);
            noiseGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.02 + 0.05);
            
            noise.start(audioContext.currentTime + i * 0.02);
        }
    },
    tom: () => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        gain.connect(mediaStreamDestination); // Also connect to recording
        
        osc.frequency.setValueAtTime(200, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        gain.gain.setValueAtTime(0.7, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.4);
    },
    perc1: () => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        gain.connect(mediaStreamDestination); // Also connect to recording
        
        osc.frequency.setValueAtTime(800, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        gain.gain.setValueAtTime(0.5, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.1);
    },
    perc2: () => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        gain.connect(mediaStreamDestination); // Also connect to recording
        
        osc.frequency.setValueAtTime(400, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.05);
        gain.gain.setValueAtTime(0.5, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.15);
    },
    crash: () => {
        const noise = audioContext.createBufferSource();
        const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 1.5, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseBuffer.length; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        noise.buffer = noiseBuffer;
        
        const bandpass = audioContext.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.value = 5000;
        
        const noiseGain = audioContext.createGain();
        noise.connect(bandpass);
        bandpass.connect(noiseGain);
        noiseGain.connect(audioContext.destination);
        noiseGain.connect(mediaStreamDestination); // Also connect to recording
        noiseGain.gain.setValueAtTime(0.5, audioContext.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
        
        noise.start(audioContext.currentTime);
    }
};

// Get all drum pads
const drumPads = document.querySelectorAll('.drum-pad');

// Add click event listeners
drumPads.forEach(pad => {
    pad.addEventListener('click', () => {
        playSound(pad);
    });
});

// Add keyboard event listener
let pressedKeys = new Set();

document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    
    // Prevent key repeat delay
    if (pressedKeys.has(key)) return;
    pressedKeys.add(key);
    
    const pad = document.querySelector(`.drum-pad[data-key="${key}"]`);
    
    if (pad) {
        playSound(pad);
    }
});

document.addEventListener('keyup', (e) => {
    const key = e.key.toUpperCase();
    pressedKeys.delete(key);
});

// Function to play sound and add visual effect
function playSound(pad) {
    // Add playing class for visual effect
    pad.classList.add('playing');
    
    // Play the drum sound
    const soundType = pad.dataset.sound;
    if (drumSounds[soundType]) {
        drumSounds[soundType]();
    }
    
    // Remove playing class after animation
    setTimeout(() => {
        pad.classList.remove('playing');
    }, 150);
}

// Recording functionality
recordBtn.addEventListener('click', async () => {
    if (!isRecording) {
        try {
            // Use the audio stream from Web Audio API
            const stream = mediaStreamDestination.stream;
            
            // Create media recorder
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            
            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };
            
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);
                
                // Enable download
                downloadBtn.href = audioUrl;
                downloadBtn.download = 'frank-ocean-drumpad-freestyle.webm';
                downloadBtn.removeAttribute('disabled');
                
                statusText.textContent = 'Recording saved! Click Download to save your freestyle.';
                statusText.classList.remove('recording');
            };
            
            // Start recording and play backing track
            mediaRecorder.start();
            backingTrack.currentTime = 0;
            backingTrack.play();
            
            isRecording = true;
            recordBtn.setAttribute('disabled', 'true');
            stopBtn.removeAttribute('disabled');
            downloadBtn.setAttribute('disabled', 'true');
            
            statusText.textContent = '🔴 Recording... Play your drums!';
            statusText.classList.add('recording');
            
        } catch (error) {
            console.error('Error starting recording:', error);
            statusText.textContent = 'Error: Could not start recording.';
        }
    }
});

stopBtn.addEventListener('click', () => {
    if (isRecording && mediaRecorder) {
        mediaRecorder.stop();
        backingTrack.pause();
        
        isRecording = false;
        recordBtn.removeAttribute('disabled');
        stopBtn.setAttribute('disabled', 'true');
    }
});

