"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Route {
    constructor() {
        this.middlewares = [];
    }
    use(middleware) {
        if (Array.isArray(middleware)) {
            this.middlewares = this.middlewares.concat(middleware);
        }
        else {
            this.middlewares.push(middleware);
        }
    }
    execute(middlewares, req, res, next) {
        const composition = middlewares.reduceRight((next, fn) => (rq, rs) => {
            fn(req, res, next);
        }, next);
        composition(req, res);
    }
    run(req, res, routeCheck) {
        let { middlewares } = this;
        if (!routeCheck.error) {
            /*
           * Merge middlewares with route.
           */
            if (Array.isArray(routeCheck.middleware)) {
                middlewares = middlewares.concat(routeCheck.middleware);
            }
            else {
                middlewares.push(routeCheck.middleware);
            }
            // Add route to middlewares.
            middlewares.push(routeCheck.callback);
        }
        this.execute(middlewares, req, res, () => {
            res.notFound('Route not found in registry');
        });
    }
}
exports.default = Route;
//# sourceMappingURL=route.js.map