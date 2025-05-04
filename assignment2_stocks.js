document.getElementById('lookupBtn').addEventListener('click', async () => {
    const tickerInput = document.getElementById('tickerInput');
    const ticker = tickerInput.value.toUpperCase().trim();
    if (ticker.length === 0) {
      alert('Please enter a stock ticker before searching.');
      return;
    }
  
    const days = document.getElementById('days').value;
    const end = new Date();
    const start = new Date(end);
    start.setDate(end.getDate() - parseInt(days));
  
    const formatDate = d => d.toISOString().split('T')[0];
    const apiKey = 'lhpUwMlY4pse7CwzA604kvp6JSpRjrpn';
    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${formatDate(start)}/${formatDate(end)}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`;
  
    try {
      const res = await fetch(url);
      const data = await res.json();
  
      if (!data.results || data.results.length === 0) {
        alert('No data available for this ticker.');
        return;
      }
  
      const labels = data.results.map(d => new Date(d.t).toLocaleDateString());
      const values = data.results.map(d => d.c);
  
      const ctx = document.getElementById('stockChart').getContext('2d');
      if (window.stockChartInstance) {
        window.stockChartInstance.destroy();
      }
      window.stockChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: `${ticker} Closing Prices`,
            data: values,
            borderColor: 'blue',
            backgroundColor: 'lightblue',
            tension: 0.1,
            fill: false
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: `${ticker} Price Chart`
            }
          }
        }
      });
    } catch (err) {
      console.error(err);
      alert('Error fetching stock data.');
    }
  });

  fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03')
    .then(res => res.json())
    .then(data => {
      const top5 = data.slice(0, 5);
      const table = document.getElementById('redditStocks');
      table.innerHTML = '<tr><th>Ticker</th><th>Comments</th><th>Sentiment</th></tr>';
      top5.forEach(stock => {
        const sentimentIcon = stock.sentiment === 'Bullish' ? '🐂' : '🐻';
        const row = `<tr><td><a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">${stock.ticker}</a></td><td>${stock.no_of_comments}</td><td>${sentimentIcon}</td></tr>`;
        table.innerHTML += row;
      });
    });
  