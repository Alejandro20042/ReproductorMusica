const audio = document.getElementById('audioPlayer');
const progressBar = document.getElementById('progressBar');
const currentTimeDisplay = document.getElementById('currentTime');
const playButton = document.querySelector('.controlPlay');
const volumeSlider = document.getElementById('volumeSlider');
let allSongs = [];

playButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playButton.textContent = "⏸";
  } else {
    audio.pause();
    playButton.textContent = "⏵";
  }
});

audio.addEventListener('timeupdate', () => {
  let currentTime = audio.currentTime;
  let duration = audio.duration;

  if (duration) {
    let progress = (currentTime / duration) * 100;
    progressBar.value = progress;

    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
    currentTimeDisplay.textContent = `${minutes}:${seconds}`;
  }
});

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});


async function getApi() {
  try {
    const response = await fetch("https://api-musica.netlify.app/api/");
    const datajson = await response.json();

    allSongs = datajson.data;
    getListAlbumLastest(allSongs);
    getListLatestSingles(allSongs);
    console.log(allSongs)
    
    return datajson;

  } catch (error) {
    console.error('Error en fetch:', error);
  }
}

function getListAlbumLastest(canciones){
  const albumList = document.getElementById("albumList");
  albumList.innerHTML = "";

  const albums = [];
  const ids = new Set();

  canciones.forEach(cancion => {
    const album = cancion.albumCompleto;
    if (!ids.has(album.id)) {
      ids.add(album.id);
      albums.push(album);
    }
  });

  albums.slice(0, 4).forEach(album => {
    const li = document.createElement("li");
    li.className = "albums";
    li.innerHTML = `
      ▶ <img>
      ${album.titulo} (${album.añoLanzamiento})
    `;
    albumList.appendChild(li);
  });
}

function getListLatestSingles(canciones) {
  const singleList = document.getElementById("singleList");
  singleList.innerHTML = "";

  canciones.slice(0, 4).forEach(cancion => {
    const li = document.createElement("li");
    li.className = "albumssingle";
    li.innerHTML = `
      ▶ <img >
      <strong>${cancion.titulo}</strong> - ${cancion.artista} <span style="font-size: 12px; color: #aaa;">(${cancion.duracion})</span>
    `;
    singleList.appendChild(li);
  });
}
getApi();

