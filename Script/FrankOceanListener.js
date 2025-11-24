
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
        console.log('Login form found');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submitted, redirecting...');
            window.location.href = 'Pages/Blonde.html';
        });
    } else {
        console.log('Login form not found');
    }
});
