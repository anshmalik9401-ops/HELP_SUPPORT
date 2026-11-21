const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../server/.env') });

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use((req, _res, next) => {
  const vercelPath = req.query.__vercel_path;
  if (typeof vercelPath === 'string' && vercelPath.startsWith('/api/')) {
    const url = new URL(req.url, 'http://localhost');
    url.searchParams.delete('__vercel_path');
    req.url = `${vercelPath}${url.search}`;
  }
  next();
});
app.use('/api/support', require('../server/support/router'));

module.exports = app;
