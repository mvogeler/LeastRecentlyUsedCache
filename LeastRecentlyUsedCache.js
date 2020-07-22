class LeastRecentlyUsedCache {
  constructor(max) {
    this.max = max;
    this.cache = new Map();
  }

  set(key, value) {
    // if the key is already in the cache, delete it from cache
    // so it can be set to the first element in the cache
    if (this.cache.has(key)) {
      this.cache.delete(key);
    // if it's not in the cache, delete the oldest in the cache
    // if we've hit the max size
    } else if (this.cache.size == this.max) {
      this.cache.delete(this.getLastElement());
    }
    // add this key value pair to the cache
    this.cache.set(key, value);
  }

  get(key) {
    let value = this.cache.get(key);
    // if the key is in the cache, it's used, so use 
    // the set method to refresh the key-value in the cache
    if (key) {
      this.set(key, value);
    }
    return value;
  }

  // returns the element that is first in the array of keys
  // aka the least used element
  getLastElement() {
    return this.cache.keys().next().value;
  }
}

let userCommand = null;
let keyValueCache = new LeastRecentlyUsedCache(10);

while(userCommand != 3) {
  userCommand = prompt("1 - enter new key-value pair\n2 - retrieve value for key\n3 - exit");

  switch(parseInt(userCommand)) {
    case 1:
      addKeyValue();
      break;
    case 2:
      getValue();
      break;
    case 3:
      alert('Finished.');
      break;
    default:
      alert("Invalid choice of " + userCommand);
  }
}

function addKeyValue() {
  let key = prompt("Enter key:");
  let value = prompt("Enter value:");

  keyValueCache.set(key, value);
}

function getValue() {
  let key = prompt("Enter key to retrieve.");
  let value = keyValueCache.get(key);

  alert(value);
}
