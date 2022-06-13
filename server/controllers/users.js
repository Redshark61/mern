import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			return res.status(404).json({ message: "User doesn't exists" });
		}

		const isPasswordValid = await bcrypt.compare(password, existingUser.password);

		if (!isPasswordValid) return res.status(401).json({ message: "Invalid credential" });

		console.log("I'm in the signin function");
		console.log(process.env.JWT_SECRET);
		const token = jwt.sign(
			{ id: existingUser._id, email: existingUser.email },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		return res.status(200).json({ result: existingUser, token });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export const signup = async (req, res) => {
	const { firstName, lastName, email, password, confirmPassword } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ error: "User already exists" });
		}
		console.log("I'm in the signup controller");

		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Password doesn't match" });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		// console.log(hashedPassword, firstName, lastName, email);
		const result = new User({
			name: `${firstName} ${lastName}`,
			email,
			password: hashedPassword,
		});
		result.save();
		const token = jwt.sign({ id: result._id, email: result.email }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		return res.status(200).json({ result, token });
	} catch (error) {
		console.log("une erreur");
		res.status(500).json({ message: error });
	}
};
