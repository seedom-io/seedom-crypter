const keccak256 = require('js-sha3').keccak256;

module.exports.hex = (message) => {
    // confirm message
    if (!message || (message.length == 0) || message.length > 32) {
        return null;
    }

    const buffer = Buffer.alloc(32);
    buffer.write(message);
    return `0x${buffer.toString('hex')}`;
};

module.exports.hash = (hex, address) => {
    // confirm hex
    if (!hex || (hex.length < 2) || (hex.length !== 66)) {
        return null;
    }

    // confirm address
    if (!address || (address.length < 2) || (address.length !== 42)) {
        return null;
    }

    // remove 0xs
    hex = hex.substr(2);
    address = address.substr(2);
    // concatenate message hex and address, update hash
    const hasher = new keccak256.create(256);
    const buffer = new Buffer(hex, 'hex');
    hasher.update(buffer);
    const addressBuffer = new Buffer(address, 'hex');
    hasher.update(addressBuffer);
    return `0x${hasher.hex()}`;

};