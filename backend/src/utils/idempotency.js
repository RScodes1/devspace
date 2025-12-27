const { redis } = require("../config/redis");

const checkAndSetIdempotency = async (key, ttl = 300) => {
  return new Promise((resolve, reject) => {
    redis.set(key, "1", "NX", "EX", ttl, (err, result) => {
      if (err) return reject(err);
      resolve(result === null); 
    });
  });
};



module.exports = { checkAndSetIdempotency };
