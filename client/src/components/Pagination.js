import { Pagination, PaginationItem } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Paginate = (props) => {
	const { numberOfPages } = useSelector((state) => state.posts);
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		if (props.page) {
			dispatch(getPosts(props.page));
		}
	}, [props.page, dispatch]);

	return (
		<Pagination
			classes={{ ul: classes.ul }}
			count={numberOfPages}
			page={parseInt(props.page) || 1}
			variant="outlined"
			color="primary"
			renderItem={(item) => (
				<PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
			)}
		/>
	);
};

export default Paginate;
