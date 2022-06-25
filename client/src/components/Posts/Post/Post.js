import useStyles from "./styles";
import {
	Card,
	CardContent,
	CardMedia,
	Button,
	Typography,
	CardActions,
	ButtonBase,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import Likes from "./Likes";
import { useState } from "react";

const Post = ({ post, setCurrentId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [likes, setLikes] = useState(post?.likes);
	const user = JSON.parse(localStorage.getItem("profile"));
	const navigation = useNavigate();
	const userID = user?.result?.googleId || user?.result?._id;
	const openPost = () => navigation(`/post/${post._id}`);
	const hasLiked = post.likes.find((like) => like === userID);

	const handleClick = () => {
		dispatch(likePost(post._id));

		if (hasLiked) {
			setLikes(post.likes.filter((id) => id !== userID));
		} else {
			setLikes((prevState) => {
				return [...prevState, userID];
			});
		}
	};

	return (
		<Card className={classes.card} raised elevation={6}>
			<div className={classes.overlay2}>
				{(user?.result?.googleId === post?.creator ||
					user?.result?._id === post?.creator) && (
					<Button
						style={{ color: "white" }}
						size="small"
						onClick={() => {
							setCurrentId(post._id);
						}}
					>
						<MoreHorizIcon fontSize="large" />
					</Button>
				)}
			</div>
			<ButtonBase className={classes.cardAction} onClick={openPost}>
				<CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
				<div className={classes.overlay}>
					<Typography variant="h6">{post.name}</Typography>
					<Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
				</div>

				<div className={classes.details}>
					<Typography variant="body2" color="textSecondary">
						{post.tags.map((tag) => `#${tag}`)}
					</Typography>
				</div>
				<Typography className={classes.title} variant="h5" gutterBottom>
					{post.title}
				</Typography>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p" gutterBottom>
						{post.message}
					</Typography>
				</CardContent>
			</ButtonBase>
			<CardActions className={classes.cardActions}>
				<Button size="small" color="primary" disabled={!user?.result} onClick={handleClick}>
					<Likes post={post} userID={userID} likes={likes} />
				</Button>
				{(user?.result?.googleId === post?.creator ||
					user?.result?._id === post?.creator) && (
					<Button
						size="small"
						color="primary"
						onClick={() => {
							dispatch(deletePost(post._id));
						}}
					>
						<DeleteIcon size="small" />
						Delete
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default Post;
