import Cookies from 'js-cookie';


//action type
const SET_USER = 'pokedex/authentication/SET_USER';
const LOGOUT_USER = 'pokedex/authentication/LOGOUT_USER';


//action creator function
const setUser = (user) => {
	return {
		type: SET_USER,
		user
	}
}

//action creator function 
const logoutUser = () => {
	return {
		type: LOGOUT_USER,
	}
}

export const actions = {setUser, logoutUser};


//thunk action creator for login
const login = (email, password) => async dispatch => {
	const response = await fetch(`/api/session`, {
		method: 'put',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({email, password}),
	});
	if (response.ok) {
		const { player } = await response.json();
		dispatch(setUser(player));
    }
    if(!response.ok){

    }
}

//thunk action creator for logout
const logout = () => async dispatch => {
	const response = await fetch(`/api/session`, {
		method: 'delete'
	});
	if (response.ok) {
		dispatch(logoutUser());
	} else {
		console.log('logout failed')
	}
}

export const thunks = {login, logout};

const loadUser = () => {
	const authToken = Cookies.get("token");
	if (authToken) {
		try {
			const payload = authToken.split(".")[1];
			const decodedPayload = atob(payload);
            const payloadObj = JSON.parse(decodedPayload);
            const { data } = payloadObj;
			return data; 
		} catch (e) {
			Cookies.remove("token");
		}
	}
return {};
}

const authReducer = (state=loadUser(), action) => {
	switch(action.type) {
		case SET_USER:
            return action.user
        case LOGOUT_USER:
            return {}
		default:
			return state;
	}
}

export default authReducer;