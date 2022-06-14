import React, { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import useStyles from "./styles";
import Icon from "./Icon";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin, signup } from "../../actions/auth";

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const Auth = () => {
	const classes = useStyles();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const [formData, setFormData] = useState(initialState);
	const dispatch = useDispatch();
	const history = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSignUp) {
			dispatch(signup(formData, history));
		} else {
			dispatch(signin(formData, history));
		}
	};

	const handleChange = (e) => {
		setFormData((prevState) => {
			return { ...prevState, [e.target.name]: e.target.value };
		});
	};

	const switchMode = () => {
		setIsSignUp((prevState) => !prevState);
		setIsPasswordVisible(false);
	};

	const googleSuccess = async (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch({ type: "AUTH", payload: { token, result } });
			history("/");
		} catch (error) {
			console.log(error);
		}
	};

	const googleFailure = (error) => {
		console.log(error);
	};

	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5">
					{isSignUp && "Sign Up"}
					{!isSignUp && "Sign In"}
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignUp && (
							<>
								<Input
									name="firstName"
									label="First Name"
									handleChange={handleChange}
									autoFocus
									half
								/>
								<Input
									name="lastName"
									label="Last Name"
									handleChange={handleChange}
									half
								/>
							</>
						)}
						<Input
							name="email"
							label="Email"
							handleChange={handleChange}
							type="email"
						/>
						<Input
							name="password"
							label="Password"
							handleChange={handleChange}
							type={isPasswordVisible ? "text" : "password"}
							handleShowPassword={() => setIsPasswordVisible((state) => !state)}
						/>
						{isSignUp && (
							<Input
								name="confirmPassword"
								label="Confirm Password"
								handleChange={handleChange}
								type="password"
							/>
						)}
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						{isSignUp ? "Sign Up" : "Sign In"}
					</Button>
					<GoogleLogin
						clientId={process.env.REACT_APP_CLIENT_ID}
						render={(renderProps) => (
							<Button
								className={classes.googleButton}
								color="primary"
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<Icon />}
								variant="contained"
							>
								Sign In
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleFailure}
						cookiePolicy="single_host_origin"
					/>

					<Grid container justifyContent="flex-end">
						<Grid item>
							<Button onClick={switchMode}>{isSignUp ? "Sign In" : "Sign Up"}</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
