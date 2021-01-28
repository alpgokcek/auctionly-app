const moment = require('moment');

function formatMessage(username, bid, currentPrice) {
  return {
    username,
    bid,
    currentPrice,
    time: moment()
  };
}

module.exports = formatMessage;
