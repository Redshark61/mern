import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });

		if (!existingUser) return res.status(404).json({ message: "User doesn't exists" });

		const isPasswordValid = await bcrypt.compare(password, existingUser.password);

		if (!isPasswordValid) return res.status(401).json({ message: "Invalid credential" });

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
	const { firstName, lastName, email, password, confirrmPassword } = req.body;

	try {
		const existingUser = await User.findOne({ email });

		if (existingUser) return res.status(400).json({ message: "User already exists" });

		if (password !== confirrmPassword)
			return res.status(400).json({ message: "Password doesn't match" });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await User.create({
			name: `${firstName} ${lastName}`,
			email,
			password: hashedPassword,
		});

		const token = jwt.sign({ id: result._id, email: result.email }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		return res.status(200).json({ result, token });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
