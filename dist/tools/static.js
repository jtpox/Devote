"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const mime_1 = __importDefault(require("mime"));
exports.default = (directory) => {
    /*
      * Check if the entry is a directory or not via regex.
      * ^(.*)\/$
      */
    let name = null; // Name of the route;
    let regex = null;
    if (/^(.*)\/$/.test(directory)) {
        regex = new RegExp(`^(${directory})((?!.*\\.\\.))`);
    }
    else {
        regex = new RegExp(directory);
    }
    return (req, res, next) => {
        // Check if directory matches the url.
        if (regex.test(req.url)) {
            /*
               * Replace the first instance of "/" in req.url
               * so that fs won't think to look for file from root.
               */
            const file = req.url.replace('/', '');
            fs_1.default.readFile(file, (err, data) => {
                if (err) {
                    res.notFound();
                }
                else {
                    res.header.setHeader('Content-Type', mime_1.default.getType(file));
                    res.send(data);
                }
            });
        }
        else {
            next();
        }
    };
};
//# sourceMappingURL=static.js.map