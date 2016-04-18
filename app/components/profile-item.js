import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Isvg from 'react-inlinesvg';
import { connect } from 'react-redux';
import ProfileEditInput from './profile-edit-input';

function mapStateToProps(state){
    return {
        versus: state.versus
    };
}

export default class ProfileItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    handleEditClick(e) {
        e.preventDefault();
        this.props.handleEditClick(e.target.name);
    }

    render() {
        const { versus, name, edit } = this.props;
        let editInput;

        if (edit) {
            editInput = <ProfileEditInput name={name}/>
        }
        return (

            <div className="l-position-relative">
                <label className="t-lato-uppercase l-d-inline-block l-margin-tb-100">
                    {name}:
                </label>
                <span className="l-d-inline-block t-lato-light gamma l-padding-left-100">{name === "name" ? versus.user.name : versus.user.email}</span>
                <button name={name} className="v-button--util v-button v-button--blue l-d-block l-position-absolute"
                        onClick={this.handleEditClick}>
                    <Isvg src="/images/edit.svg"/>
                </button>
                { editInput }
            </div>

        );
    }
};

export default connect(
  mapStateToProps
)(ProfileItem);
