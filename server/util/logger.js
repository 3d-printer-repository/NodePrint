/* eslint-disable no-console */

const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n----------------------------------------------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {
    // Called whenever there's an error on the server we want to print
    error: (err) => {
        console.error(chalk.red(err));
    },

    // Called when express.js app starts on given port w/o errors
    appStarted: (port, host) => {
        console.log('');
        console.log(`Server started ! ${chalk.green('✓')}`);

        console.log(`
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.green(`http://${host}:${port}`)}
      LAN: ${chalk.green(`http://${ip.address()}:${port}`)}${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
    },

    // Called when express.js app starts on given port w/o errors
    apiStarted: (port, host) => {
        console.log('');

        console.log(`API Server started ! ${chalk.green('✓')}`);

        console.log(`
  ${chalk.bold('API URLs:')}${divider}
  Localhost       : ${chalk.green(`http://${host}:${port}/api`)}
  Swagger Document: ${chalk.green(`http://${host}:${port}/swagger.json`)}
        LAN       : ${chalk.green(`http://${ip.address()}:${port}/api`)}${divider}
  ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
      `);
    }
};

module.exports = logger;
