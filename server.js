
const express = require('express');
const app = express();
const port = 3033;

app.use(express.static('dist'));

app.listen(
  port,
  () => console.log(`Listening at http://localhost:${port} ...`)
);
