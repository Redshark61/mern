import { AppBar, Avatar, Button, Typography, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import decode from "jwt-decode";

const Navbar = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useNavigate();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	console.log(user);

	const logout = useCallback(() => {
		dispatch({ type: "LOGOUT" });
		history("/");
		setUser(null);
	}, [dispatch, history]);
	const token = user?.token;

	useEffect(() => {
		if (token) {
			const decoded = decode(token);
			if (decoded.exp * 1000 < new Date().getTime()) logout();
		}

		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [token, logout]);

	return (
		<AppBar className={classes.appBar} position="static" color="inherit">
			<Link to="/" className={classes.brandContainer}>
				<img src={memoriesText} alt="icon" height="45px" />
				<img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
			</Link>
			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={user.result.name}
							src={user.result.imageURL}
						>
							{user.result.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant="h6">
							{user.result.name}
						</Typography>
						<Button
							variant="contained"
							className={classes.logout}
							color="secondary"
							onClick={logout}
						>
							Logout
						</Button>
					</div>
				) : (
					<Button component={Link} to="/auth" variant="contained" color="primary">
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
