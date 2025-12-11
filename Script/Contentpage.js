//Zach
document.addEventListener('DOMContentLoaded', () => {
    const pinkWhiteAudio = document.getElementById('pink-white-audio');
    
    if (pinkWhiteAudio) {
        pinkWhiteAudio.addEventListener('play', () => {
            setTimeout(() => {
                pinkWhiteAudio.pause();
            }, 10000);
        });

        pinkWhiteAudio.addEventListener('timeupdate', () => {
            if (pinkWhiteAudio.currentTime >= 10) {
                pinkWhiteAudio.pause();
                pinkWhiteAudio.currentTime = 0;
            }
        });
    }
});
