const jwt = require('jsonwebtoken');
// const passport = require('passport');

// Middleware to check the validity of a JWT token
function checkJWTToken(req, res, next) {
  const token = req.cookies.access_token;
  // If there is no token
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized', success: false });
  }
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized, invalid token', success: false });
    }
    req.user = decoded; // Attach the decoded user data to the request object
    return next(); // Move to the next middleware or route handler
  });
}

// const protectRoute = (req, res, next) => {
//   passport.authenticate('google', { session: false }, (err, user) => {
//     if (!err && user) {
//       req.user = user;
//       return next(); // User authenticated via GoogleStrategy
//     }
//     // If GoogleStrategy authentication fails, attempt JWT verification
//     return next(checkJWTToken()); // Use your JWT middleware
//   });
// };

module.exports = { checkJWTToken };
