import React, { Component } from 'react';
import {connect} from 'react-redux'
import {thunks} from './store/authentication';
import {Redirect} from 'react-router-dom';

// thunks.login(email, password)

class LoginPanelRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'demo@example.com',
            password: 'password',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateEmail = this.updateValue('email');
        this.updatePassword = this.updateValue('password');
    }

    updateValue = name => e => {
        this.setState({ [name]: e.target.value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        this.props.login(email, password);
    }
    render() {
        if(this.props.currentUserId) {
            return (<Redirect to='/'/>)
        }
        return (
            <main className="centered middled">
                <form onSubmit={this.handleSubmit}>
                    <input type="text"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.updateEmail} />
                    <input type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.updatePassword} />
                    <button type="submit">Login</button>
                </form>
            </main>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUserId: state.authentication.id,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => {dispatch(thunks.login(email, password))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPanelRedux);