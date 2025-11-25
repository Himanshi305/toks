import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

export const authUser = (req, res, next) => {
  try {
    // 1. Get token from the authorization header
    const authHeader = req.headers['authorization'];

    // 2. Check if the header exists and is in the correct format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header is missing or malformed.' });
    }
    const token = authHeader.split(' ')[1];

    // 3. Verify the token synchronously
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach the decoded payload to the request object
    req.user = decodedPayload;
    
    // 5. Pass control to the next function (the controller)
    next();

  } catch (error) {
    // This will catch any error from jwt.verify (e.g., expired token, invalid signature)
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: 'Token is invalid or expired.' });
  }
};