import React, { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from "@material-ui/core";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import useStyles from "./styles";

const Auth = () => {
	const classes = useStyles();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);

	const handleSubmit = () => {};
	const handleChange = () => {};
	const switchMode = () => {
		setIsSignUp((prevState) => !prevState);
		setIsPasswordVisible(false);
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
					<Grid container justify="flex-end">
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
