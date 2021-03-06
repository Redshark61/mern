import React, { useEffect, useState } from "react";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import { useDispatch } from "react-redux";
import Pagination from "../Pagination";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Home = () => {
	const classes = useStyles();
	const [currentId, setCurrentId] = useState(null);
	const [search, setSearch] = useState("");
	const [tags, setTags] = useState([]);
	const dispatch = useDispatch();
	const query = useQuery();
	const navigate = useNavigate();
	const page = query.get("page") || 1;
	const searchQuery = query.get("search") || "";

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			searchPost();
		}
	};

	const handleAdd = (tag) => setTags((prevState) => [...prevState, tag]);

	const handleDelete = (tag) => setTags((prevState) => prevState.filter((t) => t !== tag));

	const searchPost = () => {
		if (search.trim() || tags.length) {
			dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
			navigate(`/posts/search?search=${search || "none"}&tags=${tags.join(",") || "none"}`);
		} else {
			navigate("/");
		}
	};

	return (
		<Grow in>
			<Container maxWidth="xl">
				<Grid
					container
					className={classes.gridContainer}
					justifyContent="space-between"
					alignItems="stretch"
					spacing={3}
				>
					<Grid item xs={12} sm={6} md={9}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppBar className={classes.appBarSearch} position="static" color="inherit">
							<TextField
								name="search"
								variant="outlined"
								label="Search Memories"
								fullWidth
								value={search}
								onChange={(e) => {
									setSearch(e.target.value);
								}}
								onKeyPress={handleKeyPress}
							/>
							<ChipInput
								style={{ margin: "10px 0" }}
								value={tags}
								onAdd={handleAdd}
								onDelete={handleDelete}
								label="Search tags"
								variant="outlined"
							/>
							<Button onClick={searchPost} color="primary" variant="contained">
								Search
							</Button>
						</AppBar>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
						{!searchQuery && !tags.length && (
							<Paper className={classes.pagination}>
								<Pagination page={page} />
							</Paper>
						)}
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
