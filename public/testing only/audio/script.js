// Sample audio data (replace with actual data)
const audioData = [
  { thumbnail: 'audio1.jpg', title: 'Audio 1', uploadDate: '2024-02-15', duration: '5:30', audioSrc: 'audio1.mp3' },
  { thumbnail: 'audio2.jpg', title: 'Audio 2', uploadDate: '2024-02-16', duration: '4:45', audioSrc: 'audio2.mp3' },
  { thumbnail: 'audio3.jpg', title: 'Audio 3', uploadDate: '2024-02-17', duration: '6:15', audioSrc: 'audio3.mp3' },
  // Add more audio data as needed
];

document.addEventListener("DOMContentLoaded", function() {
  const audioTableBody = document.querySelector('.audio-table-body');
  const detailsContainer = document.querySelector('.right-panel .audio-details');
  const audioPlayer = document.querySelector('.big-audio');
  const playPauseBtn = document.querySelector('.play-pause');
  const volumeInput = document.querySelector('.volume');
  const progress = document.querySelector('.progress');
  const currentTime = document.querySelector('.current-time');
  const duration = document.querySelector('.duration');

  // Load audio details in table format
  audioData.forEach((audio, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td><img src="${audio.thumbnail}" alt="Thumbnail"></td>
          <td>${audio.title}</td>
          <td>${audio.uploadDate}</td>
          <td>${audio.duration}</td>
      `;
      row.addEventListener('click', () => showAudioDetails(audio));
      audioTableBody.appendChild(row);
  });

  // Function to show audio details on the right panel and play audio
  function showAudioDetails(audio) {
      detailsContainer.innerHTML = `
          <h2>Audio Details</h2>
          <p><strong>Title:</strong> ${audio.title}</p>
          <p><strong>Upload Date:</strong> ${audio.uploadDate}</p>
          <p><strong>Duration:</strong> ${audio.duration}</p>
      `;
      // Play audio
      audioPlayer.src = audio.audioSrc;
      audioPlayer.play();
      audioPlayer.style.display = 'block';
      // Update duration
      audioPlayer.addEventListener('loadedmetadata', () => {
          duration.textContent = formatTime(audioPlayer.duration);
      });
  }

  // Play/Pause button functionality
  playPauseBtn.addEventListener('click', () => {
      if (audioPlayer.paused || audioPlayer.ended) {
          audioPlayer.play();
          playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
          audioPlayer.pause();
          playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
  });

  // Volume control
  volumeInput.addEventListener('input', () => {
      audioPlayer.volume = volumeInput.value;
  });

  // Progress bar
  audioPlayer.addEventListener('timeupdate', () => {
      const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progress.value = percent;
      currentTime.textContent = formatTime(audioPlayer.currentTime);
  });

  progress.addEventListener('input', () => {
      const time = (progress.value / 100) * audioPlayer.duration;
      audioPlayer.currentTime = time;
  });

  // Function to format time in MM:SS format
  function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
});

