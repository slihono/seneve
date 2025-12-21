const container = document.getElementById('heart-container');

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '❤️';

    const startX = Math.random() * window.innerWidth;
    heart.style.left = `${startX}px`;
    heart.style.bottom = '0px';
   const size = Math.random() * 20 + 10; 
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;

    
    const duration = Math.random() * 5 + 5;
    heart.style.animationDuration = `${duration}s`;
    
    const drift = (Math.random() - 0.5) * 200;
    heart.style.setProperty('--drift', `${drift}px`);
    
    heart.style.animationDelay = `${-Math.random() * 5}s`; 

   
    heart.style.animationName = 'float-up';
    container.appendChild(heart);

   
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

setInterval(createHeart, 250);
