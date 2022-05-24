import useStyles from "./styles";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";

const Form = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [postData, setPostData] = useState({
		creator: "",
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createPost(postData));
	};

	const clear = (e) => {};

	return (
		<Paper className={classes.paper}>
			<form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
				<Typography variant="h6">Creating a memory</Typography>
				<TextField
					name="creator"
					variant="outlined"
					label="Creator"
					fullWidth
					value={postData.creator}
					onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
				/>
				<TextField
					name="title"
					variant="outlined"
					label="title"
					fullWidth
					value={postData.title}
					onChange={(e) => setPostData({ ...postData, title: e.target.value })}
				/>
				<TextField
					name="message"
					variant="outlined"
					label="message"
					fullWidth
					value={postData.message}
					onChange={(e) => setPostData({ ...postData, message: e.target.value })}
				/>
				<TextField
					name="tags"
					variant="outlined"
					label="tags"
					fullWidth
					value={postData.tags}
					onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
				/>

				<div className={classes.fileInput}>
					<FileBase
						type="file"
						multiple={false}
						onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
					/>
				</div>
				<Button
					className={classes.buttonSubmit}
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth
				>
					Submit
				</Button>
				<Button
					variant="contained"
					color="secondary"
					size="small"
					fullWidth
					onClick={clear}
				>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
