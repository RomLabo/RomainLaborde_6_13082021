const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 min window
    max: 5, // start blocking after 5 requests
    message: "Too many accounts created from this IP, please try again after an hour"
});

module.exports = rateLimiter;