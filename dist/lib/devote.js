"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const merge_descriptors_1 = __importDefault(require("merge-descriptors"));
const registry_1 = __importDefault(require("./registry"));
const route_1 = __importDefault(require("./route"));
const header_1 = __importDefault(require("./header"));
const response_1 = __importDefault(require("./response"));
class Devote {
    constructor() {
        this.template = {
            name: null,
            directory: null,
            callback: null,
        };
        this.app = http.createServer(this.server.bind(this));
        this.registry = new registry_1.default();
        this.route = new route_1.default();
    }
    engine(name, directory, callback) {
        this.template.name = name;
        this.template.directory = directory;
        this.template.callback = callback;
    }
    server(req, res) {
        res.header = new header_1.default();
        merge_descriptors_1.default(res, response_1.default(res, this.template));
        const routeCheck = this.registry.check(req.url, req.method);
        req.params = routeCheck.exec;
        this.route.run(req, res, routeCheck);
        /* if (routeCheck.error) {
          res.notFound('Route not found in registry');
        } else {
          req.params = routeCheck.exec;
          this.route.run(req, res, routeCheck);
        } */
    }
    listen(port, callback) {
        this.app.listen(port, callback);
    }
    /*
     * Routes
     */
    middleware(middleware) {
        this.route.use(middleware);
    }
    get(regex, middleware, callback = null) {
        this.registry.add('get', regex, middleware, callback);
    }
    post(regex, middleware, callback = null) {
        this.registry.add('post', regex, middleware, callback);
    }
    put(regex, middleware, callback = null) {
        this.registry.add('put', regex, middleware, callback);
    }
    patch(regex, middleware, callback = null) {
        this.registry.add('patch', regex, middleware, callback);
    }
    delete(regex, middleware, callback = null) {
        this.registry.add('delete', regex, middleware, callback);
    }
    options(regex, middleware, callback = null) {
        this.registry.add('options', regex, middleware, callback);
    }
}
exports.default = Devote;
//# sourceMappingURL=devote.js.map