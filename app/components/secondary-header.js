import React from 'react';
import { connect } from 'react-redux';
import Isvg from 'react-inlinesvg';
import { Link } from 'react-router';
import * as actions from '../actions/versus-actions';

function mapStateToProps(state){
    return {
        versus: state.versus
    };
}



export default class SecondaryHeader extends React.Component {

    render() {
        const { versus } = this.props;
        const userName = versus.user.name;
        return (
            <nav className="v-brd-b-light l-bar-header-padding">
                <ul className="l-hor-list">
                    <li><Link to="/" activeClassName="active">Home</Link></li>
                    { userName !== "" ? <li><Link to="/profile" activeClassName="active">Profile</Link></li> : ""}
                </ul>
            </nav>
        );
    }
}

export default connect(
  mapStateToProps
)(SecondaryHeader);
