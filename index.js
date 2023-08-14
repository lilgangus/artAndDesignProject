const exhibits = document.querySelectorAll('.exhibit');
let currentExhibit = 0;

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const exhibitOffset = exhibits[currentExhibit].offsetTop;

    if (scrollPosition >= exhibitOffset) {
        currentExhibit++;
        if (currentExhibit < exhibits.length) {
            window.scrollTo({ top: exhibits[currentExhibit].offsetTop, behavior: 'smooth' });
        }
    }
});
