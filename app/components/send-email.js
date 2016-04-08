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

            <div className="l-grid l-margin-top-400">
                <div className="l-col-1-2 l-col-right v-brd-light">
                    <div className="l-padding-100 v-brd-b-light v-brd-t-cantina-blue">
                        <h3 className="t-lato-uppercase">{ this.props.name }</h3>
                        <p className="eta">{ this.props.email }</p>
                    </div>
                    <div className="v-bg-white l-padding-100">
                        { sent }
                        <div className="l-grid l-margin-top-400">
                            <button {...opts} className={"l-col-1-2 l-col-right v-button "+(this.props.emailSent ? "v-button-disabled" : "")} onClick={this.handleSendEmail}>Send Email</button>
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
