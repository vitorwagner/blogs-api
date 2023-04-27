const generateError = (code, message) => ({ status: code, message });

module.exports = generateError;