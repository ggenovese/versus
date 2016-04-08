import React from 'react';
import Isvg from 'react-inlinesvg';
import { Link } from 'react-router';

const SecondaryHeader = React.createClass({
  render: function() {
    return (
        <nav className="v-brd-b-light l-bar-header-padding">
            <ul className="l-hor-list">
                <li><Link to="/" activeClassName="active">Home</Link></li>
                <li><Link to="/userprofile" activeClassName="active">Profile</Link></li>
            </ul>
        </nav>
    );
  }
});

export default SecondaryHeader;
