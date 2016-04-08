import React from 'react';
import Isvg from 'react-inlinesvg';
import { Link } from 'react-router';

const Header = React.createClass({
  render: function() {
    return (
      <header className="primary-header v-bg-dark v-brd-b-medium">
        <Link to="/" activeClassName="active" className="logo v-bg-cantina-blue l-d-block l-position-absolute ">
          <Isvg src="/images/cantina-logo.svg" />
        </Link>
        <h4 className="l-d-inline-block t-reverse t-lato-uppercase">Versus</h4>
      </header>
    );
  }
});

export default Header;
