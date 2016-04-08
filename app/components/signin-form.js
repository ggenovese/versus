import React from 'react';

const SignInForm = React.createClass({

    processSignInForm: function(event) {
        event.preventDefault();

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

    },


  render: function() {
    return (
      <form ref="signInForm" onSubmit={this.processSignInForm}>
        <label htmlFor="name" className="l-visually-hidden">Your Name</label>
        <input className="v-text-input l-d-block l-margin-bottom-100" name="name" type="text" ref="name" placeholder="Your Name" required/>
        <label htmlFor="email" className="l-visually-hidden">Email</label>
        <input className="v-text-input l-d-block l-margin-bottom-100" name="email" type="text" ref="email" placeholder="Email" required/>
        <button className="v-button l-col-1-2 l-col-right" id="submit" type="submit">Sign In</button>
      </form>
    );
  }
});

export default SignInForm;
