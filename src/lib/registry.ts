import pathToRegexp from 'path-to-regexp';

export default class Registry {
  /*
   * {
     request,
     route,
     middleware,
     callback,
   }
   */
  routes = [];

  /*
   * Adding route to the Registry.
   * [0] regex: RegExp or string
   * [1] middleware: Array or function (function only works for routing).
   * [2] callback: function.
   */
  add(method: string, regex, middleware = [], callback: Function = null): void {
    this.routes.push({
      method,
      route: regex,
      middleware: (Array.isArray(middleware))? middleware : [middleware],
      callback,
    });
  };

  check(url: string, method: string) {
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
      } else if (this.routes[i].route === url && method.toLowerCase() === this.routes[i].method) {
        returnCheck.error = false;
        returnCheck.middleware = this.routes[i].middleware;
        returnCheck.callback = this.routes[i].callback;
        break;
      } else {
        /*
         * Use path-to-regexp
         * More info: https://www.npmjs.com/package/path-to-regexp
         */
        const keys = [];
        const regexp = pathToRegexp(this.routes[i].route, keys);
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