import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";

const Likes = ({ post, userID, likes }) => {
	if (post?.likes?.length > 0) {
		return likes.find((like) => like === userID) ? (
			<>
				<ThumbUpAltIcon fontSize="small" />
				&nbsp;
				{likes.length > 2
					? `You and ${likes.length - 1} others`
					: `${likes.length} like${likes.length > 1 ? "s" : ""}`}
			</>
		) : (
			<>
				<ThumbUpAltOutlined fontSize="small" />
				&nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
			</>
		);
	}

	return (
		<>
			<ThumbUpAltOutlined fontSize="small" />
			&nbsp;Like
		</>
	);
};

export default Likes;
