import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/versus-actions';

function mapStateToProps(state){
    return {
        versus: state.versus
    };
}

export default class ProfileEditInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.dispatch(actions.editProfileValue(this.props.name, e.target.previousSibling.value));
        this.props.dispatch(actions.editProfileEdit(this.props.name));
    }

    render() {
        const { versus } = this.props;

        return (
            <div>
                <input type="text" className="v-text-input l-margin-tb-100"/>
                <button className="v-button v-button--blue l-margin-bottom-100" onClick={this.handleClick}>update</button>
            </div>
        );
    }
};

export default connect(
  mapStateToProps
)(ProfileEditInput);
