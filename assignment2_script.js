fetch('https://zenquotes.io/api/random')
  .then(response => response.json())
  .then(data => {
    document.getElementById('quote').textContent = data[0].q + ' — ' + data[0].a;
  });

File: assignment2_annyangCommands.js

if (annyang) {
  const commands = {
    'hello': () => alert('Hello World'),
    'change the color to *color': color => document.body.style.backgroundColor = color,
    'navigate to *page': page => {
      const p = page.toLowerCase();
      if (p === 'home') location.href = 'assignment2_index.html';
      else if (p === 'stocks') location.href = 'assignment2_stocks.html';
      else if (p === 'dogs') location.href = 'assignment2_dogs.html';
    },
    'lookup *stock': stock => {
      document.getElementById('tickerInput').value = stock.toUpperCase();
      document.getElementById('lookupBtn').click();
    },
    'load dog breed *breed': breed => {
      const breedButtons = document.querySelectorAll('.breed-btn');
      breedButtons.forEach(btn => {
        if (btn.textContent.toLowerCase() === breed.toLowerCase()) {
          btn.click();
        }
      });
    }
  };
  annyang.addCommands(commands);
  annyang.start();
}