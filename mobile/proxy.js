const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use((req, res, next) => {
  console.log(`[INCOMING] ${req.method} ${req.url} from ${req.ip}`);
  next();
});

// Reverse proxy to handle the fact that Expo is stuck binding to localhost
app.use('/', createProxyMiddleware({ 
  target: 'http://localhost:8085', 
  changeOrigin: true,
  ws: true, // extremely important for React Native Metro Bundler
  logLevel: 'debug'
}));

const PORT = 19001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n==============================================`);
  console.log(`✅ LOCALHOST REVERSE PROXY ACTIVE!`);
  console.log(`👉 TELL YOUR PHONE TO CONNECT TO:`);
  console.log(`exp://192.168.100.55:${PORT}`);
  console.log(`==============================================\n`);
  setInterval(() => console.log('Proxy alive...'), 10000);
});
