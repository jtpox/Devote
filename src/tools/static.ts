import fs from 'fs';

import mime from 'mime';

export default (directory): Function => {
  /*
    * Check if the entry is a directory or not via regex.
    * ^(.*)\/$
    */
  let name = null; // Name of the route;
  let regex = null;
  if (/^(.*)\/$/.test(directory)) {
    regex = new RegExp(`^(${directory})((?!.*\\.\\.))`);
  } else {
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
      fs.readFile(file, (err, data) => {
        if (err) {
          res.notFound();
        } else {
          res.header.setHeader('Content-Type', mime.getType(file));
          res.send(data);
        }
      });
    } else {
      next();
    }
  };
}