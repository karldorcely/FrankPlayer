
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('frankocean-intro');
    const playButton = document.getElementById('play-demo-btn');
    
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
});
