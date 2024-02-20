const { forEach } = require('lodash');
const owners = require('./owners.json');

forEach(owners.owners, (owner, key) => {
  if (owner.length >= 500) {
    console.log(key, owner.length);
  }
})