const jwt = require('jsonwebtoken');
const secretKey = 'knovator';

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized user' });
    } else {
      const tokenParts = token.split(" ");
      // created this condition as while creating a post if header authorization container only token or in format "Bearer then token"
      if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({ message: 'Invalid token format' });
      }
      token = tokenParts[1];
      try {
        let user = jwt.verify(token, secretKey);
        req.userId = user.id;
        next();
      } catch (error) {
        return res.status(403).json({ message: 'Access denied. Invalid token.' });
      }
    }
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
};

module.exports = auth;
