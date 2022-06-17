import Post from "./Post/Post";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import { Grid, CircularProgress } from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
	const { posts, isLoading } = useSelector((state) => state.posts);
	const classes = useStyles();

	if (!posts.length && !isLoading) return <h1>No posts found</h1>;

	return isLoading ? (
		<CircularProgress />
	) : (
		<Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
			{posts.map((post) => (
				<Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
					<Post post={post} setCurrentId={setCurrentId} />
				</Grid>
			))}
		</Grid>
	);
};

export default Posts;
