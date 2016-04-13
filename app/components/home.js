import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { connect } from 'react-redux';
import Isvg from 'react-inlinesvg';
import SignInForm from './signin-form'
import * as actions from '../actions/versus-actions';

function mapStateToProps(state){
    return {
        versus: state.versus
    };
}

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.addUser = this.addUser.bind(this);
        this.navigateToVersus = this.navigateToVersus.bind(this);
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(actions.getVersus());
    }

    addUser(signInData){
        const { dispatch } = this.props;
        this.props.dispatch(actions.addUser(signInData));
    }

    navigateToVersus(){
        const { history } = this.props;
        history.push('/versus/0');
    }

    render() {
        return (
            <div className="l-grid v-bg-extralight l-h-1 l-padding-100">
                <div className="l-col-1-2 l-col-r l-center-block">
                    <div className="l-padding-800 v-bg-dark l-margin-top-100">
                        <div className="vs-logo v-bg-cantina-blue">
                          <Isvg src="/images/vs.svg" />
                        </div>
                        <p className="t-paragraph-lead t-reverse"><span>Versus</span> is a comparison tool to create an informed design approach, as well as to foster a sense of design transparency and participation on the part of you the client.</p>
                        <h4 className="t-lato-uppercase l-margin-tb-400 t-reverse">Get Started</h4>
                        <SignInForm addUser={this.addUser} navigateToVersus={this.navigateToVersus}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
  mapStateToProps
)(Home);
