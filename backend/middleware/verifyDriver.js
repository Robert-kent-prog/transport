import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const ACCESS_KEY = process.env.JWT_SECRET;

export const verifyDriver = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Check if the authorization header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Access Denied: No Token Provided' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    jwt.verify(token, ACCESS_KEY, (err, decoded) => {
        if (err) {
            // If token is invalid or expired, return 403
            return res.status(401).json({ message: 'Invalid or Expired Token' });
        }

        // Check if the user role is 'driver'  enum: ['driver', 'passenger'],
        if (decoded.role !== 'driver') {
            return res.status(403).json({ message: 'Access Denied: Drivers Allowed Only' });
        }

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    });
};
