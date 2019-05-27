"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        }
        return returnCheck;
    }
}
exports.default = Registry;
//# sourceMappingURL=registry.js.map