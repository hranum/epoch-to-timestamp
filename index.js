/**
 * Converts epoch in s or ms to iso 8601 timestamp
 * @param {number} epoch time since epoch in ms or s
 * @param {boolean} human replace T with a space
 * @return {string}
 */
const epochToTimestamp = (epoch, human) => {
  const parsedEpoch = epoch ? parseInt(epoch) : null;
  if (!parsedEpoch  || parsedEpoch === NaN) { 
    throw Error('Epoch is not a number');
  }
  const d = new Date(0);
  if (parsedEpoch.toString().length >= 13) {
    d.setUTCMilliseconds(epoch);
  } else {
    d.setUTCSeconds(epoch);
  }
  const isoString = d.toISOString().split('.')[0];
  return human ? isoString.replace('T', ' ') : isoString;
};

module.exports = epochToTimestamp;