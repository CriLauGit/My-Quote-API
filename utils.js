const getRandomElement = arr => {
  if(!Array.isArray(arr)) {
    throw new Error('Expected an array');
  } else {
    let randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
  }
}

const getElementsByAuthor = (arr, author) => {
  let elementsByAuthor = arr.filter(element => element.person === author);
  return elementsByAuthor;
}

const generateId = (arr, value) => {
  let newId = `${value}${String(arr.length+1)}` 
  return newId;
}

module.exports = {
  getRandomElement, getElementsByAuthor, generateId
};

