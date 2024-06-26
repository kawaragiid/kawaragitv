const express = require('express');
const path = require('path');
const m3u8url = require('./m3u8url');
const axios = require('axios');


const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', async (req, res) => {
    try {
        console.log('Fetching M3U8 URL:', m3u8url);
        const response = await axios.get(m3u8url);
        const playlist = response.data.split('\n').filter(line => line.trim().startsWith('http'));
        console.log('Playlist:', playlist); // Tambahkan log ini
        res.render('index', { playlist });
    } catch (error) {
        console.error('Error fetching the M3U file:', error.message);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
