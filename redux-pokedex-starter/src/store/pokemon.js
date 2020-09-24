//action type
const GET_POKEMON = "GET POKEMON";
const NEW_POKEMON = 'NEW_POKEMON';
const SET_TYPES = 'SET_TYPES';
const SET_POKEMON_DETAIL = 'SET_POKEMON_DETAIL';

//action creator function
const setPokemon = (pokemon) => {
    return {
        type: GET_POKEMON,
        pokemon
    }
 }

const setPokemonDetail = (pokemonDetail) => {
    return {
        type: SET_POKEMON_DETAIL,
        pokemonDetail
    }
}

const createPokemon = (newPokemon) => {
    return {
        type: NEW_POKEMON,
        newPokemon
    }
}

const setTypes = types => {
    return {
        type: SET_TYPES,
        types
    }
}

export const actions = {setPokemon, setPokemonDetail, createPokemon, setTypes}

//action creator thunk

const fetchPokemon = () => async dispatch => {
    const res = await fetch(`/api/pokemon`);
    if (res.ok) {
        const pokemon = await res.json();
        dispatch(setPokemon(pokemon))
    }
}

const fetchPokemonDetail = (id) => async dispatch => {
    const res = await fetch(`/api/pokemon/${id}`);
    if (res.ok) {
        const pokemonDetail = await res.json();

        dispatch(setPokemonDetail(pokemonDetail))
    }
}

const fetchTypes = () => async dispatch => {
    const response = await fetch(`/api/pokemon/types`);
    if (response.ok) {
      const types = await response.json();
      dispatch(setTypes(types));
      return types
    }
}

const newPokemon = (payload) => async dispatch => {

    try{

        const res = await fetch(`/api/pokemon`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(payload),
    });
    if (res.ok) {
        dispatch(fetchPokemon())
    } else {
        throw res
    }
} catch (e) {
    console.error(e);
}
}
export const thunks = {fetchPokemon, newPokemon, fetchPokemonDetail, fetchTypes};


// Reducer

const pokemonReducer = (state= { types: [], list: [], detail: {} }, action) => {
    Object.freeze(state)
    const nextState = {...state};

    switch(action.type){
        case GET_POKEMON:
            nextState.list = [...action.pokemon]
            return nextState;
        case SET_POKEMON_DETAIL:
            nextState.detail = {...action.pokemonDetail};
            return nextState;
        case NEW_POKEMON:
            nextState.list = [...nextState.list, action.newPokemon];
            return nextState;
        case SET_TYPES:
            nextState.types = [...action.types];    
            return nextState
		default:
			return state;
    }
}

export default pokemonReducer;