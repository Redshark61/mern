import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";

const CommentSection = (props) => {
	const { post } = props;
	const classes = useStyles();
	const dispatch = useDispatch();
	const [comments, setComments] = useState([1, 2, 3]);
	const [comment, setComment] = useState("");

	const handleClick = () => {
		setComments([...comments, comment]);
		setComment("");
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
							{comment}
						</Typography>
					))}
				</div>
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
			</div>
		</div>
	);
};

export default CommentSection;
