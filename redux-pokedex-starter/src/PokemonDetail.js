import React, { Component } from 'react';
import {thunks} from './store/pokemon';
import {connect} from 'react-redux';

class PokemonDetail extends Component {

  async componentDidMount() {
    const id = Number.parseInt(this.props.match.params.id);
    this.props.fetchPokemonDetail(id)
  }

  async componentDidUpdate(oldProps) {
    const oldId = Number.parseInt(oldProps.match.params.id);
    const newId = Number.parseInt(this.props.match.params.id);
    if (oldId === newId) {
      return;
    } 
    this.props.fetchPokemonDetail(newId)
  }

  render() {
    const pokemon = this.props.detail;

    if (Object.keys(pokemon).length === 0) {
      return null;
    }
    return (
      <div className="pokemon-detail">
        <div className={`pokemon-detail-image-background`}
             style={{backgroundImage: `url('/images/${pokemon.type}.jpg')`}}>
          <div className="pokemon-detail-image"
               style={{backgroundImage: `url('${pokemon.imageUrl}')`}}>
          </div>
          <h1 className="bigger">{pokemon.name}</h1>
        </div>
        <div className="pokemon-detail-lists">
          <div>
            <h2>Information</h2>
            <ul>
              <li><b>Type</b> {pokemon.type}</li>
              <li><b>Attack</b> {pokemon.attack}</li>
              <li><b>Defense</b> {pokemon.defense}</li>
              <li>
                <b>Moves</b>
                <ul>
                  {pokemon.moves.map(move =>
                    <li key={move}>{move}</li>
                  )}
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <h2>Items</h2>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Happiness</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {pokemon.items.map(item =>
                  <tr key={item.price * item.happiness}>
                    <td>
                      <img className="item-image" alt={item.imageUrl} src={item.imageUrl} />
                    </td>
                    <td>{item.name}</td>
                    <td className="centered">{item.happiness}</td>
                    <td className="centered">${item.price}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    detail: state.pokemon.detail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPokemonDetail: (id) => { dispatch(thunks.fetchPokemonDetail(id)) },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail);
