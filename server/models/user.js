import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	_id: { type: String },
});

const user = mongoose.model("User", userSchema);
export default user;
