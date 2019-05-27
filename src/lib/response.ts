export default (res, template) => {
    const response = {
      head: (): void => {
        res.writeHead(res.header.statusCode, res.header.headers);
      },
      /*
       * Render from template.
       */
      render: (template, options) => {
        template.callback(
          `${template.directory}/${template}.${template.name}`,
          options,
          (err, render) => {
            if (err) {
              res.notFound('Template file not found.');
            } else {
              res.send(render);
            }
          },
        );
      },
      /*
       * For sending ordinary data.
       */
      send: (val): void => {
        res.head();
        res.write(val);
        res.end();
      },
      /*
       * For sending formatted JSON data.
       */
      json: (val): void => {
        res.header.setHeader('Content-Type', 'application/json');
        res.head();
        res.write(JSON.stringify(val));
        res.end();
      },
      /*
       * 404 Error.
       */
      notFound: (message = null): void => {
        res.header.setStatus(404);
        res.head();
        res.write((message !== null) ? message : 'Route not found in registry.');
        res.end();
      },
    };
  
    return response;
  };
  