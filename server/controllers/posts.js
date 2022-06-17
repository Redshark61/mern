import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
	const { page } = req.query;

	try {
		const LIMIT = 1;
		// convert page to number
		const newPage = parseInt(page);
		const startIndex = (newPage - 1) * LIMIT;
		const total = await PostMessage.countDocuments({});

		const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

		res.status(200).json({
			data: posts,
			currentPage: newPage,
			numberOfPages: Math.ceil(total / LIMIT),
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getPostsBySearch = async (req, res) => {
	const { search, tags } = req.query;

	try {
		const title = search ? new RegExp(search, "i") : null;
		const posts = await PostMessage.find({
			$or: [{ title }, { tags: { $in: tags.split(",") } }],
		});
		res.status(200).json({ data: posts });
	} catch (error) {
		res.status(404).json({ error });
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
