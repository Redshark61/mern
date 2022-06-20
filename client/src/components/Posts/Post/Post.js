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

const Post = ({ post, setCurrentId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("profile"));
	const navigation = useNavigate();

	const openPost = () => navigation(`/post/${post._id}`);

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
				<Button
					size="small"
					color="primary"
					disabled={!user?.result}
					onClick={() => {
						dispatch(likePost(post._id));
					}}
				>
					<Likes post={post} user={user} />
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
