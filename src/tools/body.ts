import { parse } from 'querystring';

/*
 * Handle POST body data.
 * Output is parsed by querystring.
 */
const allowedRequest = ['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

function getData(req): Promise<string> {
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

export default (req, res, next): void => {
  req.body = null;
  if (
    req.headers['content-type'] === 'application/x-www-form-urlencoded'
    && allowedRequest.indexOf(req.method) !== -1
  ) {
    getData(req).then((buffer) => {
      req.body = parse(buffer);
      next();
    }).catch((err) => {
      // console.log(err);
      res.notFound(err);
    });
    // next();
  } else {
    next();
  }
};
