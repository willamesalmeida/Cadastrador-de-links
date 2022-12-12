const express = require('express')

const authController = require('./controllers/auth.js')
const app = express()
const port = 3001;

app.use('/auth', authController);

app.get('/', (req, res) => {
     return res.json('API runing...')
}) ;


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})