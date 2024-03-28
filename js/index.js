const API_KEY = "ZDgZcihAnXDiHgjRFTzyqkE1qMmptukT";
const API_URL1 = (ticker) => `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?apiKey=${API_KEY}&interval=1m`;
const API_URL2 = (ticker) => `https://api.polygon.io/v1/meta/symbols/${ticker}/company?apiKey=${API_KEY}`;

async function fetchLatestStockInfo(ticker) {
    // Get stock price data
    const response = await fetch(API_URL1(ticker));
    const stockData = await response.json();

    // Fetch exchange information
    const exchangeResponse = await fetch(API_URL2(ticker));
    const exchangeData = await exchangeResponse.json();

    return { stockData, exchangeData };
}

// Register handler for button async
document.getElementById("check").addEventListener("click", async () => {
    // Get ticker and check it
    const ticker = document.getElementById("ticker").value;
    if (!ticker)   
        return alert("Cannot leave the ticker blank!");

    const { stockData, exchangeData } = await fetchLatestStockInfo(ticker);

    // Did it work?
    if (stockData && exchangeData) {
        // Request the API for the stock
        const stock = stockData.results[0];

        // Set student ID
        document.getElementById("name").innerText = 'Name: Matthew Contaldi | ID: 1227490';

        // Set docs url
        document.getElementById("docs").innerText = "Docs: https://polygon.io/docs/stocks/getting-started";

        // Set data
        document.getElementById("open").innerText = `Open: $${stock.o}`;
        document.getElementById("high").innerText = `High: $${stock.h}`;
        document.getElementById("low").innerText = `Low: $${stock.l}`;
        document.getElementById("close").innerText = `Close: $${stock.c}`;
        document.getElementById("volume").innerText = `Volume: $${stock.v}`;

        // Render image
        document.getElementById("image").src = `https://logo.clearbit.com/${exchangeData.url}`;
    }
});
