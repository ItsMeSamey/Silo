// Sample video data (replace with actual data)
const videoData = [
    { thumbnail: 'video1.jpg', title: 'Video 1', uploadDate: '2024-02-15', duration: '5:30', videoSrc: 'x.mp4' },
    { thumbnail: 'video2.jpg', title: 'Video 2', uploadDate: '2024-02-16', duration: '4:45', videoSrc: 'video2.mp4' },
    { thumbnail: 'video3.jpg', title: 'Video 3', uploadDate: '2024-02-17', duration: '6:15', videoSrc: 'video3.mp4' },
    // Add more video data as needed
];

document.addEventListener("DOMContentLoaded", function() {
    const videoTableBody = document.querySelector('.video-table-body');
    const detailsContainer = document.querySelector('.right-panel .video-details');
    const videoPlayer = document.querySelector('.big-video');
    const playPauseBtn = document.querySelector('.play-pause');
    const volumeInput = document.querySelector('.volume');
    const progress = document.querySelector('.progress');
    const currentTime = document.querySelector('.current-time');
    const duration = document.querySelector('.duration');

    // Load video details in table format
    videoData.forEach((video, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${video.thumbnail}" alt="Thumbnail"></td>
            <td>${video.title}</td>
            <td>${video.uploadDate}</td>
            <td>${video.duration}</td>
        `;
        row.addEventListener('click', () => showVideoDetails(video));
        videoTableBody.appendChild(row);
    });

    // Function to show video details on the right panel and play video in bigger view
    function showVideoDetails(video) {
        detailsContainer.innerHTML = `
            <h2>Video Details</h2>
            <p><strong>Title:</strong> ${video.title}</p>
            <p><strong>Upload Date:</strong> ${video.uploadDate}</p>
            <p><strong>Duration:</strong> ${video.duration}</p>
        `;
        // Play video in bigger view
        videoPlayer.src = video.videoSrc;
        videoPlayer.style.display = 'block';
        // Update duration
        videoPlayer.addEventListener('loadedmetadata', () => {
            duration.textContent = formatTime(videoPlayer.duration);
        });
    }

    // Play/Pause button functionality
    playPauseBtn.addEventListener('click', () => {
        if (videoPlayer.paused || videoPlayer.ended) {
            videoPlayer.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            videoPlayer.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    // Volume control
    volumeInput.addEventListener('input', () => {
        videoPlayer.volume = volumeInput.value;
    });

    // Progress bar
    videoPlayer.addEventListener('timeupdate', () => {
        const percent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progress.value = percent;
        currentTime.textContent = formatTime(videoPlayer.currentTime);
    });

    progress.addEventListener('input', () => {
        const time = (progress.value / 100) * videoPlayer.duration;
        videoPlayer.currentTime = time;
    });

    // Function to format time in MM:SS format
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
});
