require('dotenv').config()
const express = require('express');
const router = require('./routes')
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(router);

app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})
