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
        const input = document.getElementById('tickerInput');
        const button = document.getElementById('lookupBtn');
        if (input && button) {
          input.value = stock.toUpperCase();
          button.click();
        }
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
  