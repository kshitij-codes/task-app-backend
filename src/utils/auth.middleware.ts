import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend the Request interface to include a 'user' property
declare global {
	namespace Express {
		interface Request {
			userId?: String;
		}
	}
}

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
	try {
		// get JWT token from request header
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			return res.status(401).json({ error: "Authentication failed" });
		}

		if (!process.env.JWT_KEY) {
			return res.status(500).json({ error: "JWT_KEY is not defined" });
		}

		// Verify the token
		const decoded = jwt.verify(
			token,
			process.env.JWT_KEY as string
		) as JwtPayload;

		req.userId = decoded.userId;

		next();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
};

export default authenticateUser;
