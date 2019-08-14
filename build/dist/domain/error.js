"use strict";

function errorBuilder(message, status, code) {
  return {
    message: message,
    status: status,
    code: code
  };
}

module.exports = errorBuilder;
//# sourceMappingURL=error.js.map