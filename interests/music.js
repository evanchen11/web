document.querySelectorAll('.song-box').forEach(box => {
    box.addEventListener('click', function(event) {
        if (event.target.classList.contains('image-only')) {
            event.stopPropagation();
        } else {
            window.open(this.getAttribute('data-url'), '_blank');
        }
    });
});

const masonry = new Masonry('.song-list', {
    // columnWidth: '.album-cover', // Set column width to match .album-cover width
    // gutter: 1000 px // Set gutter width
    // itemSelector: '.song-box', // Select song boxes 
 });

 // set masonry layout - song boxes that aren't image only are set to this size
 document.querySelectorAll('.song-box').forEach((songBox) => {
    if (!songBox.querySelector('img.image-only')) {
      songBox.style.width = '350px';
      songBox.style.height = 'auto';
    }
  });