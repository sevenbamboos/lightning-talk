const browser = require('browser-detect');
 
const MiddleWare = () => req => {

    req.locals.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    req.locals.host = req.headers.host;
    req.locals.browser = browser(req.headers['user-agent']);

    next();
};
 
module.exports = MiddleWare;