let currentIndex = 0;
const slider = document.querySelector('.sliderMenu');
const leftControl = document.querySelector('.left-control');
const rightControl = document.querySelector('.right-control');

const imagePaths = [
  "/images/peronoteenamores.webp",
  "/images/poresosojos.webp",
  "/images/regida.webp"
];

let imageIndex = 0;

function getAlbumWidth() {
  const first = document.querySelector('.album');
  if (!first) return 0;
  const styles = getComputedStyle(first);
  const width = first.offsetWidth;
  const margin = parseInt(styles.marginLeft || 0) + parseInt(styles.marginRight || 0);
  return width + margin;
}

function updateSlider() {
  const width = getAlbumWidth();
  slider.style.transform = `translateX(-${currentIndex * width}px)`;
}

function addNewAlbum() {
  const newAlbum = document.createElement('div');
  newAlbum.classList.add('album');

  const newImg = document.createElement('img');
  newImg.src = imagePaths[imageIndex];
  newImg.alt = 'Album';

  newAlbum.appendChild(newImg);
  slider.appendChild(newAlbum);

  imageIndex = (imageIndex + 1) % imagePaths.length;
}

rightControl.addEventListener('click', () => {
  currentIndex++;
  // Si estamos en el último visible, agregamos uno nuevo
  if (currentIndex >= slider.children.length - 2) {
    addNewAlbum();
  }
  updateSlider();
});

leftControl.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});
