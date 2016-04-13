import React from 'react';
import { connect } from 'react-redux';
import EmailNotSent from './send-email-notsent';
import EmailSent from './send-email-sent';

function mapStateToProps(state){
    return {
        versus: state.versus
    };
}

export default class SendEmail extends React.Component {
    constructor(props) {
        super(props);
        this.handleSendEmail = this.handleSendEmail.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        if (document.body.scrollTop > 160) {
            this.props.handleScroll(true);
        } else {
            this.props.handleScroll(false);
        }
    }

    handleSendEmail(e){
        e.preventDefault();
        this.props.handleSendEmail();
    }

    render() {
        var opts = {},
            sent;

        if (!this.props.emailSent) {
            sent = <EmailNotSent />;
        } else {
            sent = <EmailSent />;
            opts['disabled'] = 'disabled';
        }

        return (

            <div className={"l-col-1-4 l-col-r l-padding-left-100 "+( this.props.fixEmailCta ? "email-cta-fixed" : "email-cta")}>
                <div className="v-brd-light">
                    <div className="l-padding-100 v-brd-b-light v-brd-t-cantina-blue-400">
                        <h3 className="t-lato-uppercase">{ this.props.name }</h3>
                        <p className="eta">{ this.props.email }</p>
                    </div>
                    <div className="v-bg-white l-padding-100">
                        { sent }
                        <div className="l-grid l-margin-top-400">
                            <button {...opts} className={"v-button v-button-large l-col-1 "+(this.props.emailSent ? "v-button-disabled" : "")} onClick={this.handleSendEmail}>Send Results</button>
                        </div>
                    </div>
                </div>
            </div>
        );
  }
};

export default connect(
  mapStateToProps
)(SendEmail);
