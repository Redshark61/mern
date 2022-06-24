import React, { useState, useRef, useEffect } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { commentPost } from "../../actions/posts";

const CommentSection = (props) => {
	const { post } = props;
	const classes = useStyles();
	const dispatch = useDispatch();
	const comments = post.comments;
	const [comment, setComment] = useState("");
	const user = JSON.parse(localStorage.getItem("profile"));
	const commentRef = useRef();

	console.log(post);

	useEffect(() => {
		commentRef.current.scrollIntoView({ behavior: "smooth" });
	}, []);

	const handleClick = () => {
		const finalComment = `${user.result.name}: ${comment}`;
		dispatch(commentPost(finalComment, post._id));
	};

	return (
		<div>
			<div className={classes.commentsOuterContainer}>
				<div className={classes.commentsInnerContainer}>
					<Typography gutterBottom variant="h6">
						Comments
					</Typography>
					{comments.map((comment, i) => (
						<Typography key={i} gutterBottom variant="subtitle1">
							<strong>{comment.split(":")[0]}</strong>
							{comment.split(":")[1]}
						</Typography>
					))}
					<div ref={commentRef} />
				</div>
				{user?.result.name && (
					<div style={{ width: "70%" }}>
						<Typography gutterBottom variant="h6">
							Write a comment
						</Typography>
						<TextField
							fullWidth
							minRows={4}
							variant="outlined"
							label="Comment"
							multiline
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						<Button
							style={{ marginTop: "10px" }}
							variant="contained"
							color="primary"
							onClick={handleClick}
							disabled={!comment}
						>
							Submit
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentSection;
