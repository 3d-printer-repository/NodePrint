/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./util//logger');
const Glue = require('glue');
const Manifest = require('../config/manifest');

const argv = require('./util/argv');
const port = require('./util//port');
const setup = require('./middlewares/frontendMiddleware');
const { resolve } = require('path');

const app = express();
// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';



// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});


process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise} reason: ${reason}`);
});


const main = async function () {

  const options = { relativeTo: __dirname };
  const server = await Glue.compose(Manifest.get('/'), options);

  await server.start();
  
  logger.apiStarted(Manifest.get('/server/port'), prettyHost);
};

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);

  main();
});




