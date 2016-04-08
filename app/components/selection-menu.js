import React from 'react';
import { connect } from 'react-redux';
import Isvg from 'react-inlinesvg';

function mapStateToProps(state){
    return {
        versus: state.versus
    };
}

export default class SelectionMenu extends React.Component {
    constructor(props) {
        super(props);
        this.handleUtil = this.handleUtil.bind(this);
        this.navigateToVersus = this.navigateToVersus.bind(this);
    }

    handleUtil(e){
        return this.props.handleUtil(this.props.selection.id, e.target.name);
    }

    navigateToVersus(e) {
        e.preventDefault();
        let index = (Number(this.props.selection.id)) - 1;
        const editVersus = true;
        return this.props.navigateToVersus(index, editVersus);
    }

    render() {
        return (
            <nav className="selection-menu l-position-absolute">
                <button name="settings" onClick={this.handleUtil} className="v-button v-button--blue v-button--svg"><Isvg src="/images/gear.svg" /></button>
                <ul className={"l-d-block l-position-relative l-list-no-style "+(this.props.selection.settings ? "active" : "")}>
                    <li>
                        <button onClick={this.handleUtil} name="comment" className="v-button v-button--blue v-button--svg"><Isvg src="/images/comment.svg" /></button>
                        <div className={"selection-menu__comment l-position-absolute "+(this.props.selection.comment ? "active" : "")}><p className="eta">{this.props.selection.commenttext || "No Comment made"}</p></div>
                    </li>
                    <li>
                        <button onClick={this.handleUtil} name="altimg" className="v-button v-button--blue v-button--svg"><Isvg src="/images/option.svg" /></button>
                        <img className={"l-position-absolute "+(this.props.selection.altImg ? "active" : "")} src={this.props.altimg} />
                    </li>
                    <li><button onClick={this.navigateToVersus} className="v-button v-button--blue v-button--svg"><Isvg src="/images/undo.svg" /></button></li>
                </ul>
            </nav>
        );
    }
};

export default connect(
  mapStateToProps
)(SelectionMenu);
