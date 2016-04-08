import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { connect } from 'react-redux';
import Card from './card';
import _ from 'lodash';
import * as actions from '../actions/versus-actions';

function mapStateToProps(state){
    return {
        versus: state.versus
    };
}

export default class Versus extends React.Component {
    constructor(props) {
        super(props);
        this.currentVersusIndex = this.currentVersusIndex.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.processVersusForm = this.processVersusForm.bind(this);
        this.notComplete = this.notComplete.bind(this);
    }

    handleButton(key, option) {
        const oldOption = this.props.versus.choices[this.currentVersusIndex()];
        const newOption = Object.assign({}, oldOption);
        newOption.selected = key;
        this.props.dispatch(actions.versusChosen(newOption, this.currentVersusIndex()));
    }

    processVersusForm(e) {
        if (e) {e.preventDefault();}
        const oldOption = this.props.versus.choices[this.currentVersusIndex()];
        const completeOption = Object.assign({}, oldOption);
        const { versus, history } = this.props;
        const comment = this.refs.comment.value;

        completeOption.complete = true;
        completeOption.commenttext = comment;
        this.props.dispatch(actions.versusChosen(completeOption, this.currentVersusIndex()));

        this.refs.versusForm.reset();

        if ( (Number(this.currentVersusIndex()) <  this.props.versus.choices.length - 1) && this.notComplete()) {
            history.push('/versus/'+ (Number(this.currentVersusIndex()) + 1));
        } else {
            history.push('/results');
        }
    }

    notComplete() {
        const { versus } = this.props;
        let notComplete = true;

        const completed = versus.choices.map(function(obj){
            return obj.complete === false ? false : true;
        });

        completed.forEach(function(i){
            notComplete = i ? false : true;
        });

        return notComplete;
    }

    currentVersusIndex() {
        const { params } = this.props;
        return params.indexRoute;
    }

    render() {
        var self = this;
        const { versus, history, params } = this.props;
        const versusIndex = this.currentVersusIndex();
        var versusSection = function() {
                const option = versus.choices[versusIndex];
                return (
                    <div className="l-h-1 v-bg-extralight">
                        <form ref="versusForm" onSubmit={self.processVersusForm} className="l-container">
                            <div className="l-grid l-d-flex l-d-flex-r-mobile">

                                <Card key="a"
                                    selected={option.selected}
                                    objectKey="a" name={option.name}
                                    option={option.options.a}
                                    handleButton={self.handleButton}
                                />

                                <div className="l-col-1-5 t-center t-lato-uppercase l-margin-top-400 v-arrows">OR</div>

                                <Card
                                    key="b"
                                    selected={option.selected}
                                    objectKey="b" name={option.name}
                                    option={option.options.b}
                                    handleButton={self.handleButton}
                                />
                            </div>

                            <label className="t-lato-uppercase l-margin-top-400 l-margin-bottom-100 l-d-block" htmlFor="comment">Comments</label>
                            <textarea className="v-text-area l-col-1" ref="comment" name="textarea" defaultValue={ option.commenttext || ""}></textarea>

                            <button className="l-col-2-5 l-col-right v-button l-margin-top-400" type="submit">Continue</button>
                        </form>
                    </div>
                );
        };
        return (
            <div>
                <div className="l-padding-100">
                    <h1 className="t-big-noodle-titling alpha">Select One</h1>
                </div>
                { versus.choices && versus.choices.length ? versusSection() : '' }
            </div>
        );
    }
};

export default connect(
  mapStateToProps
)(Versus);
