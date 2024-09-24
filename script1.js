let lastScrollTop = 0;
let dialogShown = false;
let music1 = document.getElementById('music1');
let music2 = document.getElementById('music2');
let musicChanged = false;
let scrollBeyond50 = false;
let clickDialogShown = false; 

window.onscroll = function() {
    const scrollPosition = (window.scrollY + window.innerHeight) / document.body.scrollHeight;

    // Show dialog at x% scroll
    if (!dialogShown && scrollPosition > 0.40) {
        showDialog();
        dialogShown = true;
    }

    // Change music at x% scroll
    if (!musicChanged && scrollPosition > 0.50) {
        switchMusic();
        musicChanged = true;
    }

    // Prevent scrolling up after x% scroll
    preventScrollUp(scrollPosition);
};

function showDialog() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('dialog').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

document.getElementById('continue').onclick = function() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('dialog').style.display = 'none';
    document.body.style.overflow = 'auto';
};

document.getElementById('stop').onclick = function() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('dialog').style.display = 'none';
    document.body.style.overflow = 'hidden';
};

function switchMusic() {
    music1.pause();
    music1.currentTime = 0;
    music2.play();
}

function preventScrollUp(scrollPosition) {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // If the user reaches or surpasses x%, block scrolling up
    if (scrollPosition > 0.50) {
        scrollBeyond50 = true;
    }

    // Allow scrolling up if the user hasn't passed x%
    if (scrollBeyond50 && scrollTop < lastScrollTop) {
        window.scrollTo(0, lastScrollTop);
    } else {
        lastScrollTop = scrollTop;
    }
}

window.addEventListener('click', function() {
    // Only show the dialog when user has scrolled beyond 50% and if the click dialog hasn't been shown
    if (scrollBeyond50 && !clickDialogShown) {
        showClickDialog();
        clickDialogShown = true;
    }
});

function showClickDialog() {
    document.getElementById('click-overlay').style.display = 'block';
    document.getElementById('click-dialog').style.display = 'block';
}

// Close the click dialog and prevent propagation
document.getElementById('close-click-dialog').onclick = function(event) {
    event.stopPropagation();  // Prevent the window click event from triggering
    document.getElementById('click-overlay').style.display = 'none';
    document.getElementById('click-dialog').style.display = 'none';
    
    // Reset the clickDialogShown flag so the dialog can appear again after initial click
    clickDialogShown = false;
};
