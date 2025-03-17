import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const ACCESS_KEY = process.env.JWT_SECRET;

// Middleware to verify JWT token
export const verifyJWT = (req, res, next) => {
    console.log("🔍 Verifying JWT...");

    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("❌ No token provided or incorrect format");
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    console.log("🛠 Extracted Token:", token);

    jwt.verify(token, ACCESS_KEY, (err, decoded) => {
        if (err) {
            console.error("❌ Token verification failed:", err);
            return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
        }

        console.log("✅ Token verified successfully:", decoded);

        // Check if userId exists in decoded payload
        if (!decoded.userId) {
            console.log("❌ No userId in decoded token");
            return res.status(403).json({ message: 'Invalid token payload' });
        }

        req.user = decoded; // Attach full decoded token
        next();
    });
};
