import * as http from 'http';

import Mixin from 'merge-descriptors';

import Registry from './registry';

import Route from './route';

import Header from './header';

import Response from './response';

export default class Devote {
  app: http.Server;
  registry: Registry;
  route: Route;
  template = {
    name: null,
    directory: null,
    callback: null,
  };

  constructor() {
    this.app = http.createServer(this.server.bind(this));

    this.registry = new Registry();
    this.route = new Route();
  }

  engine(name: string, directory: string, callback: Function): void {
    this.template.name = name;
    this.template.directory = directory;
    this.template.callback = callback;
  }

  server(req, res): void {
    res.header = new Header();
    Mixin(res, Response(res, this.template));
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

  listen(port: number, callback): void {
    this.app.listen(port, callback);
  }

  /*
   * Routes
   */
  middleware(middleware): void {
    this.route.use(middleware);
  }

  get(regex, middleware, callback: Function = null) :void { 
    this.registry.add('get', regex, middleware, callback);
  }

  post(regex, middleware, callback: Function = null) :void { 
    this.registry.add('post', regex, middleware, callback);
  }

  put( regex, middleware, callback: Function = null) :void { 
    this.registry.add('put', regex, middleware, callback);
  }

  patch(regex, middleware, callback: Function = null) :void { 
    this.registry.add('patch', regex, middleware, callback);
  }

  delete(regex, middleware, callback: Function = null) :void { 
    this.registry.add('delete', regex, middleware, callback);
  }

  options(regex, middleware, callback: Function = null) :void { 
    this.registry.add('options', regex, middleware, callback);
  }
}
