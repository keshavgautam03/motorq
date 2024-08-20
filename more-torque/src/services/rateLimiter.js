const { rateLimitRequests, rateLimitInterval } = require('../config');

const rateLimitMap = new Map();

const rateLimitMiddleware = (req, res, next) => {
  const now = Date.now();
  const ip = req.ip;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, startTime: now });
    next();
  } else {
    const data = rateLimitMap.get(ip);
    if (now - data.startTime < rateLimitInterval) {
      if (data.count >= rateLimitRequests) {
        return res.status(429).json({ message: 'Too many requests' });
      } else {
        data.count += 1;
        rateLimitMap.set(ip, data);
        next();
      }
    } else {
      data.count = 1;
      data.startTime = now;
      rateLimitMap.set(ip, data);
      next();
    }
  }
};

module.exports = rateLimitMiddleware;
