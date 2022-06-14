import React, { useEffect, useState } from "react";
import { Container, Grow, Grid, Paper } from "@material-ui/core";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";
import { getPosts } from "../../actions/posts";
import { useDispatch } from "react-redux";
import Pagination from "../Pagination";

const Home = () => {
	const classes = useStyles();
	const [currentId, setCurrentId] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, [currentId, dispatch]);

	return (
		<Grow in>
			<Container>
				<Grid
					container
					className={classes.mainContainer}
					justifyContent="space-between"
					alignItems="stretch"
					spacing={3}
				>
					<Grid item xs={12} sm={7}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
						<Paper className={classes.pagination}>
							<Pagination />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
