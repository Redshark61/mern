import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const isCustomAuth = token.length < 500;

		if (token && isCustomAuth) {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.userId = decoded?.id;
		} else {
			const decoded = jwt.decode(token);
			req.userId = decoded?.sub;
		}

		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;
