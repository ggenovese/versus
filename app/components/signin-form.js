import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

export const fields = [ 'name', 'email']

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Required'
    } else if (values.name.length > 15) {
        errors.name = 'Must be 15 characters or less'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}


class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.processSignInForm = this.processSignInForm.bind(this);
    }

    processSignInForm() {
        // 1. Take data from from form
        var signInData = {
            name: this.refs.name.value,
            email: this.refs.email.value
        }

        // 2. Pass data back to main layout
        this.props.addUser(signInData);

        // 3. Reset the form
        this.refs.signInForm.reset();

        //4. Navigate to Versus
        this.props.navigateToVersus();

    }

    render() {
        const { fields: { name, email }, resetForm, handleSubmit, submitting } = this.props
        return (
            <form ref="signInForm" className="l-grid" onSubmit={handleSubmit(this.processSignInForm)}>
                <div className={"l-position-relative v-input-group "+ (name.touched && name.error ? "v-form-error" : "")}>
                    <input className={"v-text-input l-d-block l-margin-bottom-400 "+
                                 (name.touched && name.error ? "v-error" : "valid")}
                       name="name" type="text" ref="name" {...name} required/>
                   <label htmlFor="name" className="v-label l-position-absolute">Your Name</label>
                   {name.touched && name.error && <p className="v-error-text l-position-absolute">{name.error}</p>}
                </div>

                <div className={"l-position-relative v-input-group "+ (email.touched && email.error ? "v-form-error" : "")}>
                    <input className={"v-text-input l-d-block l-margin-bottom-400 "+
                                 (email.touched && email.error ? "v-error" : "valid")}
                       name="email" type="text" ref="email" {...email} required/>
                   <label htmlFor="email" className="v-label l-position-absolute">Email</label>
                   {email.touched && email.error && <p className="v-error-text l-position-absolute">{email.error}</p>}
                </div>

                <button className="v-button v-button-large l-col-1" id="submit" type="submit">Sign In</button>

            </form>
        );
    }
}

SignInForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'signInForm',
  fields,
  validate
})(SignInForm)
