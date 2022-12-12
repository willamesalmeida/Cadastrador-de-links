const express = require('express')

const app = express()
const port = 3001;

app.get('/', (req, res) => {
     return res.json('API runing...')
} )






app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})