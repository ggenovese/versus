import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Isvg from 'react-inlinesvg';
import { connect } from 'react-redux';
import ProfileItem from './profile-item';
import * as actions from '../actions/versus-actions';

function mapStateToProps(state){
    return {
        versus: state.versus
    };
}

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.navigateToVersus = this.navigateToVersus.bind(this);
        this.navigetToResults = this.navigetToResults.bind(this);
    }

    handleEditClick(inputName) {
        this.props.dispatch(actions.editProfileEdit(inputName));
    }

    navigetToResults(e){
        e.preventDefault();
        const { history } = this.props;
        this.props.history.push('/results');
    }

    navigateToVersus(e){
        e.preventDefault();
        const { history } = this.props;
        this.props.history.push('/versus/0');
    }

    render() {
        const { versus } = this.props;

        return (
            <div className="profile l-grid v-bg-extralight l-h-1 l-padding-100">
                <div className="l-col-1-2 l-col-r l-center-block">
                    <div className="l-padding-100 v-bg-dark l-margin-top-100 l-position-relative l-padding-top-800">
                        <div className="vs-logo v-bg-cantina-blue l-position-absolute l-center-absolute-el">
                          <Isvg src="/images/vs.svg" />
                        </div>
                        <div className="v-bg-white l-padding-800">
                            <h1 className="t-center l-margin-tb-400">Profile</h1>

                            <ProfileItem name="name" edit={versus.user.editName} handleEditClick={this.handleEditClick}/>

                            <ProfileItem name="email" edit={versus.user.editEmail} handleEditClick={this.handleEditClick}/>

                            <div className="l-grid l-margin-top-400">
                                <div className="l-col-1-2 l-col-r l-padding-right-100">
                                    <button className="v-button l-col-1" onClick={this.navigateToVersus}>Make Selections</button>
                                </div>
                                <div className="l-col-1-2 l-col-r l-padding-left-100">
                                    <button className="v-button l-col-1" onClick={this.navigetToResults}>View Selections</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default connect(
  mapStateToProps
)(Profile);
