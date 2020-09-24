//action type
const SET_USER = 'pokedex/authentication/SET_USER';

//action creator function
const setUser = (user) => {
	return {
		type: SET_USER,
		user
	}
}

export const actions = {setUser};


//thunk action creator
const login = (email, password) => async dispatch => {
	//from login panel
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
        console.log('fetch failed')
    }
	
	//once we have data we want - dispatch an action
}

export const thunks = {login};


const authReducer = (state={}, action) => {
	const nextState = Object.assign({}, state);
	switch(action.type) {
		case SET_USER:
			return nextState[action.user.id] = action.user;
		default:
			return nextState;
	}
}

export default authReducer;