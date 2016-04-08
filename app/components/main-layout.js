import React from 'react';
import { Link } from 'react-router';
import Header from './header';
import SecondaryHeader from './secondary-header';


const MainLayout = React.createClass({

    render: function() {
        return (
            <div className="app">
                <Header />
                <SecondaryHeader />
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
});

export default MainLayout;
