'use strict';

const time = () => {
  const date = new Date();
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const hour = `${date.getHours()}`.padStart(2, 0);
  const minute = `${date.getMinutes()}`.padStart(2, 0);
  const second = `${date.getSeconds()}`.padStart(2, 0);
  return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`;
};

const t = ['90m[DEBUG]', '31m[ERROR]', '34m[INFO] ', '33m[WARN] '];

/**
 * Write a message to the terminal
 * @arg {string} msg A string
 * @arg {number} type Logger type
 * @returns {boolean}
 */
const write = (msg, type) =>
  process.stdout.write(`${time()} | \u001b[${t[type]}\u001b[39m | ${msg}\n`);

module.exports = write;
