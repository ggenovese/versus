import React from 'react';
import { connect } from 'react-redux';
import Isvg from 'react-inlinesvg';

function mapStateToProps(state){
    return {
        versus: state.versus
    };
}

export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.navigateToVersus = this.navigateToVersus.bind(this);
    }

    navigateToVersus(e) {
        e.preventDefault();
        let index = (Number(this.props.id)) - 1;
        const editVersus = true;
        return this.props.navigateToVersus(index, editVersus);
    }

    render() {
        return (
            <div className="l-col-1-4 l-col-r">
                <div className="v-brd-light l-padding-50">
                    <h3 className="eta t-lato-uppercase t-center l-margin-bottom-100">Alternative</h3>
                    <img src={this.props.altImg} />
                </div>
                <button className="v-button v-button--blue l-col-1 l-margin-top-100 l-margin-bottom-100"
                        onClick={this.navigateToVersus}>Edit</button>
            </div>
        );
    }
};

export default connect(
  mapStateToProps
)(Edit);
