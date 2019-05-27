"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Handle POST body data.
 * Output is not parsed.
 */
const allowedRequest = ['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];
function getData(req) {
    return new Promise((resolve, reject) => {
        let buffer = '';
        req.on('data', (data) => {
            buffer += data;
        });
        req.on('end', () => {
            resolve(buffer);
        });
        req.on('error', (err) => {
            reject(err);
        });
    });
}
exports.default = (req, res, next) => {
    req.body = null;
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded'
        && allowedRequest.indexOf(req.method) !== -1) {
        getData(req).then((buffer) => {
            req.body = buffer;
            next();
        }).catch((err) => {
            // console.log(err);
            res.notFound(err);
        });
        // next();
    }
    else {
        next();
    }
};
//# sourceMappingURL=body.js.map