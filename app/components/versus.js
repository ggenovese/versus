import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { connect } from 'react-redux';
import Card from './card';
import CardControls from './card-controls';
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
        this.handleBack = this.handleBack.bind(this);
        this.handleCommentDisplay = this.handleCommentDisplay.bind(this);
    }

    handleButton(key, option) {
        const oldOption = this.props.versus.choices[this.currentVersusIndex()];
        const newOption = Object.assign({}, oldOption);
        newOption.selected = key;
        key === 'a' ? newOption.notselected = 'b' : newOption.notselected = 'a';
        this.props.dispatch(actions.versusChosen(newOption, this.currentVersusIndex()));
    }

    processVersusForm(newComment) {
        const oldOption = this.props.versus.choices[this.currentVersusIndex()];
        const completeOption = Object.assign({}, oldOption);
        const { versus, history } = this.props;
        const comment = newComment;

        completeOption.complete = true;
        completeOption.commenttext = comment;
        this.props.dispatch(actions.versusChosen(completeOption, this.currentVersusIndex()));

        if ( (Number(this.currentVersusIndex()) <  this.props.versus.choices.length - 1) && this.notComplete()) {
            history.push('/versus/'+ (Number(this.currentVersusIndex()) + 1));
        } else {
            history.push('/results');
        }
    }

    handleBack() {
        const oldOption = this.props.versus.choices[this.currentVersusIndex()];
        const newOption = Object.assign({}, oldOption);
        newOption.selected = '';
        newOption.notselected = '';
        this.props.dispatch(actions.versusChosen(newOption, this.currentVersusIndex()));
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

    handleCommentDisplay() {
        const { versus } = this.props;
        const oldOption = this.props.versus.choices[this.currentVersusIndex()];
        const newOption = Object.assign({}, oldOption);
        newOption.commentDisplayInput = !oldOption.commentDisplayInput;

        this.props.dispatch(actions.setCommentDisplayInput(newOption, this.currentVersusIndex()));

    }

    render() {
        const self = this;
        const { versus, history, params } = this.props;
        const versusIndex = this.currentVersusIndex();
        var versusSection = function() {
                const option = versus.choices[versusIndex];
                return (
                    <div>
                        <form ref="versusForm" className="l-position-relative">
                            <div className="l-grid">

                                <Card key="a"
                                      selected={option.selected}
                                      notselected={option.notselected}
                                      objectKey="a" name={option.name}
                                      option={option.options.a}
                                      handleButton={self.handleButton}
                                />

                                <Card key="b"
                                      selected={option.selected}
                                      notselected={option.notselected}
                                      objectKey="b" name={option.name}
                                      option={option.options.b}
                                      handleButton={self.handleButton}
                                />
                            </div>

                            <CardControls selected={option.selected}
                                          handleButton={self.handleButton}
                                          options={option.options}
                                          commenttext={option.commenttext}
                                          comment={option.comment}
                                          onSubmit={self.processVersusForm}
                                          handleBack={self.handleBack}
                                          handleCommentDisplay={self.handleCommentDisplay}
                                          commentDisplayInput={option.commentDisplayInput}/>
                        </form>
                    </div>
                );
        };

        let selectOne = versus.choices[versusIndex].selected === "" ? <div className="l-padding-100"><h1 className="t-big-noodle-titling alpha">Select One</h1></div> : "";
        return (
            <div>
                { selectOne }
                { versus.choices && versus.choices.length ? versusSection() : '' }
            </div>
        );
    }
};

export default connect(
  mapStateToProps
)(Versus);
