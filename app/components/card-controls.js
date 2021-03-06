import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state){
    return {
        versus: state.versus
    };
}

export default class CardControls extends React.Component {
    constructor(props) {
        super(props);
        this.handleButton = this.handleButton.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleCommentDisplay = this.handleCommentDisplay.bind(this);
    }

    handleButton(event){
        event.preventDefault();
        this.props.handleButton(event.target.name, this.props.option);
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.onSubmit(this.refs.comment.value);
        this.refs.comment.value = "";
    }

    handleBack(event){
        event.preventDefault();
        this.props.handleBack();
    }

    handleCommentDisplay(event){
        event.preventDefault();
        this.props.handleCommentDisplay();
    }

    render() {
        const { options, commenttext, comment, selected, onSubmit, commentDisplayInput } = this.props;
        let commentIcon = commentDisplayInput ?  <span aria-hidden="true">&nbsp;&nbsp;&#9660;</span> : <span aria-hidden="true">&nbsp;&nbsp;&#9654;</span>;

        return (
            <div className={"card-controls v-brd-light l-padding-100 l-position-absolute l-col-2-3 l-center-absolute-el v-b-shadow "+(selected === "" ? "card-controls-pre" : "card-controls-post")}>
                <div className={"l-d-flex "+ (selected === "" ? "" : "l-hidden") }>
                    <button className="l-col-1-3 v-button v-button--blue" name="a" onClick={this.handleButton}>
                        <span className="l-mobile-hidden">Select</span>
                        <span className="l-hidden l-mobile-visible">▲</span>
                    </button>
                    <div className="l-col-1-3 t-center t-lato-uppercase v-arrows">OR</div>
                    <button className="l-col-1-3 v-button v-button--blue" name="b" onClick={this.handleButton}>
                        <span className="l-mobile-hidden">Select</span>
                        <span className="l-hidden l-mobile-visible">▼</span>
                    </button>
                </div>

                <div className={ selected !== "" ? "" : "l-hidden" }>
                    <label className="t-blue card-controls__comment-label t-lato-uppercase l-d-block" htmlFor="comment" onClick={this.handleCommentDisplay}>
                        Comments
                        { commentIcon }
                    </label>
                    <textarea className={"v-text-area l-col-1 l-margin-top-100 "+ (commentDisplayInput ? "" : "inactive")} ref="comment" name="textarea" defaultValue={ commenttext || ""}></textarea>
                    <button className="l-col-2-5 v-button v-button--blue l-margin-top-100" onClick={this.handleBack}>Choose Again</button>
                    <button className="l-col-2-5 l-col-right v-button l-margin-top-100" type="submit" onClick={this.handleSubmit}>Continue</button>
                </div>
            </div>
        );
  }
};

CardControls.propTypes = {
    selected: React.PropTypes.string.isRequired,
    handleButton: React.PropTypes.func.isRequired,
    options: React.PropTypes.object.isRequired,
    commenttext: React.PropTypes.string,
    comment: React.PropTypes.bool,
    onSubmit: React.PropTypes.func.isRequired,
    handleBack: React.PropTypes.func.isRequired,
    handleCommentDisplay: React.PropTypes.func.isRequired,
    commentDisplayInput: React.PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps
)(CardControls);
