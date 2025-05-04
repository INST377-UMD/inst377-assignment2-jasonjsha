fetch('https://dog.ceo/api/breeds/image/random/10')
  .then(res => res.json())
  .then(data => {
    const images = data.message;
    const carousel = document.getElementById('carousel');

    const imgTag = document.createElement('img');
    imgTag.src = images[0];
    imgTag.style.width = '100%';
    imgTag.style.maxWidth = '400px';
    imgTag.style.height = 'auto';
    imgTag.style.maxHeight = '300px';
    imgTag.style.objectFit = 'contain';
    imgTag.style.backgroundColor = 'white';
    imgTag.style.borderRadius = '10px';
    imgTag.style.cursor = 'pointer';

    let index = 0;
    imgTag.onclick = () => {
      index = (index + 1) % images.length;
      imgTag.src = images[index];
    };

    carousel.style.textAlign = 'center';
    carousel.appendChild(imgTag);
  });

fetch('https://dogapi.dog/api/v2/breeds')
  .then(res => res.json())
  .then(data => {
    const breeds = data.data;
    const container = document.getElementById('breedButtons');
    breeds.forEach(breed => {
      const btn = document.createElement('button');
      btn.textContent = breed.attributes.name;
      btn.classList.add('breed-btn');
      btn.onclick = () => {
        const info = document.getElementById('breedInfo');
        info.innerHTML = `<h2>${breed.attributes.name}</h2>
          <p>${breed.attributes.description}</p>
                    <p>Dog Breed Min Life: ${breed.attributes.life.min} years</p>
          <p>Dog Breed Max Life: ${breed.attributes.life.max} years</p>`;
      };
      container.appendChild(btn);
    });
  });
