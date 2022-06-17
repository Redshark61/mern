import {
	FETCH_ALL,
	CREATE_POST,
	UPDATE_POST,
	DELETE_POST,
	LIKE_POST,
	FETCH_BY_SEARCH,
} from "../constants/actionTypes";

const reducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_ALL:
			return {
				...state,
				posts: action.payload.data,
				currentPage: action.payload.currentPage,
				numberOfPages: action.payload.numberOfPages,
			};
		case FETCH_BY_SEARCH:
			return { ...state, posts: action.payload };
		case CREATE_POST:
			return [...state, action.payload];
		case UPDATE_POST:
		case LIKE_POST:
			return state.map((post) => (post._id === action.payload._id ? action.payload : post));
		case DELETE_POST:
			return state.filter((post) => post._id !== action.payload._id);
		default:
			return state;
	}
};

export default reducer;
