const getRandomElement = arr => {
  if(!Array.isArray(arr)) {
    throw new Error('Expected an array');
  } else {
    let randIndex = Math.floor(Math.random * arr.length);
    return arr[randIndex];
  }
}

module.exports = {
  getRandomElement
};

