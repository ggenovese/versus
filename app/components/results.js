import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { connect } from 'react-redux';
import SendEmail from './send-email';
import Edit from './edit';
import _ from 'lodash';
import * as actions from '../actions/versus-actions';

function mapStateToProps(state){
    return {
        versus: state.versus
    };
}

export default class Results extends React.Component {

    constructor(props) {
        super(props);
        this.navigateToVersus = this.navigateToVersus.bind(this);
        this.handleSendEmail = this.handleSendEmail.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    navigateToVersus(index, editVersus) {
        const { history } = this.props;
        const self = this;

        if ( editVersus ) {
            const oldOption = this.props.versus.choices[index];
            const newOption = Object.assign({}, oldOption);
            newOption.selected = '';
            newOption.notselected = '';
            this.props.dispatch(actions.versusChosen(newOption, index));

            this.props.dispatch(actions.resetEmailSent());

        }
        this.props.history.push('/versus/'+index);
    }

    handleSendEmail(){
        this.props.dispatch(actions.emailSent());
    }

    handleScroll(bool){
        this.props.dispatch(actions.handleScroll(bool));
    }

    render() {
        const self = this;
        const { versus, history } = this.props;
        const selections = versus.choices.map(function(selection) {
            let selectedObj = {};
            let unSelectedObj = {};

            if (selection.selected === "a") {
                selectedObj = selection.options.a;
                unSelectedObj = selection.options.b;
            } else {
                selectedObj = selection.options.b;
                unSelectedObj = selection.options.a;
            }

            return (
                <li key={selection.id}
                    className="l-grid v-bg-white l-d-flex l-d-flex-r-mobile l-position-relative v-brd-b-cantina-blue-100">
                    <div className="l-col-1-3 l-col-r">
                        <img src={selectedObj.value} />
                    </div>
                    <div className="l-col-2-3 l-col-r l-padding-100 l-d-flex l-d-flex-r-mobile">
                        <div className="l-col-3-4 l-col-r l-padding-right-100">
                            <h2 className="v-brd-b-light l-bar-header-padding">{ selection.name }</h2>
                            <p className="delta l-bar-header-padding">{ selection.commenttext || "No comments text. Lorem ipsum dolor sit amet, consectetur adipisicing elit." }</p>
                        </div>
                        <Edit
                            navigateToVersus={self.navigateToVersus}
                            altImg={unSelectedObj.value}
                            id={selection.id}/>
                    </div>
                </li>
            );
        });

        return (
            <div>
                <div className="l-padding-100">
                    <h1 className="t-big-noodle-titling alpha">Your Results</h1>
                </div>
                <div className="l-grid l-padding-100 v-bg-extralight">
                    <ul className="l-col-3-4 l-col-r l-list-no-style">
                        { selections }
                    </ul>
                    <SendEmail handleSendEmail={ this.handleSendEmail }
                               emailSent={ versus.emailSent }
                               name={ versus.user.name }
                               email={ versus.user.email }
                               handleScroll={ this.handleScroll }
                               fixEmailCta={ versus.fixEmailCta }/>
                </div>
            </div>
        );
    }
};

export default connect(
  mapStateToProps
)(Results);
