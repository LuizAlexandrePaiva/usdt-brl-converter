const http = require('http');

http.get('http://localhost:8888/.netlify/functions/usdt-rate', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log("STATUS:", res.statusCode);
        console.log("DATA_TYPE:", typeof data);
        console.log("RAW_DATA:", data);
    });
}).on('error', err => {
    console.log("Error: " + err.message);
});
