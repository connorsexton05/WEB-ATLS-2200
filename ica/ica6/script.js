
const filterButtons = document.querySelectorAll('.gallery-nav button');
const photoCards = document.querySelectorAll('.photo-card');


filterButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const filterValue = event.target.textContent.toLowerCase();
    filterPhotos(filterValue);
  });
});

function filterPhotos(category) {
    photoCards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'all';
      } else {
        card.style.display = 'block';
      }
      if (category === 'nature' || card.dataset.category === category) {
        card.style.display = 'nature';
      } else {
        card.style.display = 'block';
      }
      if (category === 'architecture' || card.dataset.category === category) {
        card.style.display = 'architecture';
      } else {
        card.style.display = 'block';
      }
    });
  }