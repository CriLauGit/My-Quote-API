//Helper function used to retrieve random quotes
const getRandomElement = arr => {
  if(!Array.isArray(arr)) {
    throw new Error('Expected an array');
  } else {
    let randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
  }
}

//Helper function used to retrive quotes of a certain author
const getElementsByAuthor = (arr, author) => {
  let elementsByAuthor = arr.filter(element => element.person === author);
  return elementsByAuthor;
}

/**
 * Helper function used to generate IDs for added quotes 
 * ID: a simbol for each theme and the number of the quote
 */
const generateId = (arr, value) => {
  let newId = `${value}${String(arr.length+1)}` 
  return newId;
}

/**
 * Helper function used to find the index of a quote with a provided id
 */
const findIndex = (arr, id) => {
  const idToSearch = String(id.substr(1)); //removes the : caracter from the request id
  const index = arr.findIndex(item => {
    return item.id === idToSearch;
  })
  return index;
}

module.exports = {
  getRandomElement, getElementsByAuthor, generateId, findIndex
};

