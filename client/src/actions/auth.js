import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signin = (formData, history) => {
	return async (dispatch) => {
		try {
			const { data } = await api.signin(formData);

			dispatch({ type: AUTH, data });

			history("/");
		} catch (error) {
			console.log(error);
		}
	};
};

export const signup = (formData, history) => {
	return async (dispatch) => {
		try {
			const { data } = await api.signup(formData);
			dispatch({ type: AUTH, data });
			// Sign up user

			history("/");
		} catch (error) {
			console.log(error);
		}
	};
};
