document.addEventListener('DOMContentLoaded', () => {
    const baitBtn = document.getElementById('bait-btn');
    const trapContainer = document.getElementById('trap-container');
    const videoWrapper = document.getElementById('video-wrapper');
    const prankVideo = document.getElementById('prank-video');

    baitBtn.addEventListener('click', () => {
        // 1. Hide the fake game UI
        trapContainer.classList.add('hidden');

        // 2. Show the black fullscreen wrapper
        videoWrapper.classList.remove('hidden');

        // 3. Play the local video!
        prankVideo.play();
        
        // Optional: Force the video to fullscreen mode for maximum trap effectiveness
        if (prankVideo.requestFullscreen) {
            prankVideo.requestFullscreen();
        } else if (prankVideo.webkitRequestFullscreen) { /* Safari */
            prankVideo.webkitRequestFullscreen();
        }
    });
});