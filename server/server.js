const path = require('path');
const express = require('express');
const { name } = require('../package.json');


const PUBLIC_PATH = path.join(__dirname, '../public')

const app = express()
const port = 3000
app.use(express.static(PUBLIC_PATH))
app.listen(port, () => console.log(` ${name} app listening on port ${port}!`))
