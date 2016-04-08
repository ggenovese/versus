import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { connect } from 'react-redux';
import SelectionMenu from './selection-menu';
import SendEmail from './send-email';
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
        this.handleUtil = this.handleUtil.bind(this);
        this.setSettingsState = this.setSettingsState.bind(this);
        this.setAltImgState = this.setAltImgState.bind(this);
        this.setCommentState = this.setCommentState.bind(this);
        this.navigateToVersus = this.navigateToVersus.bind(this);
        this.setUtilsFalse = this.setUtilsFalse.bind(this);
        this.handleSendEmail = this.handleSendEmail.bind(this);
    }

    handleUtil( id, name ) {
        if ( name ) {
            switch (name) {
                case 'settings':
                    this.setSettingsState(id);
                    break;
                case 'altimg':
                    this.setAltImgState(id);
                    break;
                case 'comment':
                    this.setCommentState(id);
                    break;
                default:

            }
        }

    }

    setUtilsFalse(obj, id) {
        this.props.dispatch(actions.setSettingsFalse(obj, id));
        this.props.dispatch(actions.setAltImgFalse(obj, id));
        this.props.dispatch(actions.setCommentFalse(obj, id));
    }

    setSettingsState(id) {
        const { versus } = this.props;
        const self = this;

        versus.choices.map(function(selections) {
            if ( selections.id === id ) {

                self.props.dispatch(actions.setSettingsState(selections, id));
                self.props.dispatch(actions.setAltImgFalse(selections, id));
                self.props.dispatch(actions.setCommentFalse(selections, id));

            } else {
                self.setUtilsFalse(selections, selections.id);
            }
        });
    }

    setAltImgState(id) {
        const { versus } = this.props;
        const self = this;
        versus.choices.map(function(selections) {
            if ( selections.id === id ) {

                self.props.dispatch(actions.setAltImgState(selections, id));
                self.props.dispatch(actions.setCommentFalse(selections, selections.id));

            } else {

                self.props.dispatch(actions.setAltImgFalse(selections, selections.id));

            }
        });
    }

    setCommentState(id) {
        const { versus } = this.props;
        const self = this;
        versus.choices.map(function(selections) {
            if ( selections.id === id ) {

                self.props.dispatch(actions.setCommentState(selections, id));
                self.props.dispatch(actions.setAltImgFalse(selections, selections.id));

            } else {

                self.props.dispatch(actions.setCommentFalse(selections, selections.id));

            }
        });
    }

    navigateToVersus(index, editVersus) {
        const { history, versus } = this.props;
        const self = this;

        if ( editVersus ) {
            versus.choices.map(function(selections){
                self.setUtilsFalse(selections, selections.id);
            });
            this.props.dispatch(actions.resetEmailSent());
        }
        history.push('/versus/'+index);
    }

    handleSendEmail(){
        this.props.dispatch(actions.emailSent());
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

            let liStyle = {
                  backgroundImage: 'url(' + selectedObj.value + ')'
              }
            return (
                <li style={liStyle}
                    key={selection.id}
                    className={"versus-card l-h-2-5 v-bg-white l-col-1-4 l-position-relative "+((selection.altImg || selection.comment) && selection.settings ? "v-overlay" : "")}>
                    <SelectionMenu handleUtil={self.handleUtil}
                                   navigateToVersus={self.navigateToVersus}
                                   altimg={unSelectedObj.value}
                                   selection={selection}
                                   setUtilsFalse={self.setUtilsFalse}/>
                </li>
            );
        });

        return (
            <div>
                <div className="l-padding-100">
                    <h1 className="t-big-noodle-titling alpha">Your Results</h1>
                </div>
                <div className="l-padding-100 v-bg-extralight l-h-1">
                    <ul className="l-grid l-list-no-style">
                        { selections }
                    </ul>
                    <SendEmail handleSendEmail={this.handleSendEmail} emailSent={versus.emailSent} name={versus.user.name} email={versus.user.email}/>
                </div>
            </div>
        );
    }
};

export default connect(
  mapStateToProps
)(Results);
