const ipaddr = require('ipaddr.js');

module.exports = {

  collectIP: (address) => {
    let { octets, parts } = ipaddr.process(address);
  
  
    if ( parts ) {
      return parts.join(':');
    }
  
    return octets.join('.');
  
  }
};