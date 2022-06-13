import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find();
		res.status(200).json(postMessages);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	const body = req.body;

	const newPost = new PostMessage({
		...body,
		creator: req.userId,
		createdAt: new Date().toISOString(),
	});

	try {
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	const { id: _id } = req.params;
	const post = req.body;

	if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Invalid ID");

	const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
	res.json(updatedPost);
};

export const deletePost = async (req, res) => {
	const { id: _id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Invalid ID");

	const deletedPost = await PostMessage.findByIdAndRemove(_id);
	res.json(deletedPost);
};

export const likePost = async (req, res) => {
	const { id: _id } = req.params;

	if (!req.userId) return res.status(401).send("Unauthenticated");

	if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Invalid ID");

	const post = await PostMessage.findById(_id);
	const index = post.likes.indexOf(req.userId);

	if (index === -1) {
		post.likes.push(req.userId);
	} else {
		post.likes.splice(index, 1);
	}
	await post.save();
	res.json(post);
};
