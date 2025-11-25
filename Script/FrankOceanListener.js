//Karl-Edouard Dorcely
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('frankocean-intro');
    const playButton = document.getElementById('play-demo-btn');
    const loginForm = document.getElementById('login');
    
    if (audio && playButton) {
        playButton.addEventListener('click', () => {
            audio.play().then(() => {
                playButton.textContent = 'Playing...';
                playButton.disabled = true;
                
                setTimeout(() => {
                    audio.pause();
                    audio.currentTime = 0;
                    playButton.textContent = 'Play Demo Now';
                    playButton.disabled = false;
                }, 10000);
                
            }).catch(error => {
                console.log('Error playing audio:', error);
            });
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nickname = document.getElementById('nickname').value;
            const country = document.getElementById('country').value;
            const greetingInput = document.getElementById('greeting');
            const greeting = greetingInput.value;
            
            if (greeting.length >= 20) {
                greetingInput.value = `Thank you ${nickname} from ${country}!`;
            } else {
                greetingInput.value = 'You could say more!';
            }
        });
    }
});




