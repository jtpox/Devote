"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_to_regexp_1 = __importDefault(require("path-to-regexp"));
class Registry {
    constructor() {
        /*
         * {
           request,
           route,
           middleware,
           callback,
         }
         */
        this.routes = [];
    }
    /*
     * Adding route to the Registry.
     * [0] regex: RegExp or string
     * [1] middleware: Array or function (function only works for routing).
     * [2] callback: function.
     */
    add(method, regex, middleware = [], callback = null) {
        this.routes.push({
            method,
            route: regex,
            middleware: (Array.isArray(middleware)) ? middleware : [middleware],
            callback,
        });
    }
    ;
    check(url, method) {
        const returnCheck = {
            error: true,
            route: null,
            middleware: null,
            callback: null,
            exec: null,
        };
        for (let i = 0; i < this.routes.length; i += 1) {
            /*
             * Check if the route field is RegExp of string.
             */
            if (typeof this.routes[i].route.test === 'function') {
                // Check if the url matches REGEX.
                if (this.routes[i].route.test(url) && method.toLowerCase() === this.routes[i].method) {
                    const exec = this.routes[i].route.exec(url); // Get the parameters.
                    /*
                     * Remove unnecessary parameters.
                     */
                    exec.splice(0, 1);
                    delete exec.index;
                    delete exec.input;
                    delete exec.groups;
                    returnCheck.error = false;
                    returnCheck.middleware = this.routes[i].middleware;
                    returnCheck.callback = this.routes[i].callback;
                    returnCheck.exec = exec;
                    break;
                }
            }
            else if (this.routes[i].route === url && method.toLowerCase() === this.routes[i].method) {
                returnCheck.error = false;
                returnCheck.middleware = this.routes[i].middleware;
                returnCheck.callback = this.routes[i].callback;
                break;
            }
            else {
                /*
                 * Use path-to-regexp
                 * More info: https://www.npmjs.com/package/path-to-regexp
                 */
                const keys = [];
                const regexp = path_to_regexp_1.default(this.routes[i].route, keys);
                if (regexp.test(url) && method.toLowerCase() === this.routes[i].method) {
                    const exec = regexp.exec(url);
                    /*
                     * Remove unnecessary parameters.
                     */
                    exec.splice(0, 1);
                    delete exec.index;
                    delete exec.input;
                    delete exec.groups;
                    returnCheck.error = false;
                    returnCheck.middleware = this.routes[i].middleware;
                    returnCheck.exec = {};
                    /*
                     * Merge keys with value taken from exec.
                     */
                    returnCheck.callback = this.routes[i].callback;
                    for (let ei = 0; ei < keys.length; ei += 1) {
                        returnCheck.exec[keys[ei].name] = exec[ei];
                    }
                    break;
                }
            }
        }
        return returnCheck;
    }
}
exports.default = Registry;
//# sourceMappingURL=registry.js.map