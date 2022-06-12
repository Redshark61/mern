import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signin = (formData, history) => {
	return async (dispatch) => {
		try {
			// Login user

			history("/");
		} catch (error) {
			console.log(error);
		}
	};
};

export const signup = (formData, history) => {
	return async (dispatch) => {
		try {
			// Sign up user

			history("/");
		} catch (error) {
			console.log(error);
		}
	};
};
