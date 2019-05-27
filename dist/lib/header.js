"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Header {
    constructor() {
        this.statusCode = 200;
        this.headers = {
            'Content-Type': 'text/html',
            'X-Powered-By': 'Dexterity',
        };
    }
    setStatus(code) {
        this.statusCode = code;
    }
    setHeader(type, value) {
        this.headers[type] = value;
    }
}
exports.default = Header;
//# sourceMappingURL=header.js.map