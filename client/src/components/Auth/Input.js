import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Input = (props) => {
	return (
		<Grid item xs={12} sm={props.half ? 6 : 12}>
			<TextField
				name={props.name}
				onChange={props.handleChange}
				variant="outlined"
				required
				fullWidth
				label={props.label}
				autoFocus={props.autoFocus}
				type={props.type}
				InputProps={
					props.name === "password" && {
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={props.handleShowPassword}>
									{props.type === "password" ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						),
					}
				}
			/>
		</Grid>
	);
};

export default Input;
