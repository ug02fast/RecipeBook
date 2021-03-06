import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { Redirect } from 'react-router-dom';

class Signup extends Component {
  renderNewView() {
    if (this.props.authenticated) {
      return <Redirect to='/' />
    }
  }
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm}} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className='form-group'>
          <label>Email:</label>
          <input className='form-control' {...email} />
          {email.touched && email.error && <div className='error'>{email.error}</div>}
          <span>Enter a valid email address</span>
        </fieldset>
        <fieldset className='form-group'>
          <label>Password:</label>
          <input className='form-control' type='password' {...password} />
          {password.touched && password.error && <div className='error'>{password.error}</div>}
          <span>Enter a valid password</span>
        </fieldset>
        <fieldset className='form-group'>
          <label>Confirm Password:</label>
          <input className='form-control' type='password' {...passwordConfirm} />
          {passwordConfirm.touched && passwordConfirm.error && <div className='error'>{passwordConfirm.error}</div>}
          <span>Confirm your password</span>
        </fieldset>
        {this.renderAlert()}
        {this.renderNewView()}
        <button action='submit' className='btn btn-primary'>Sign up</button>
      </form>
    );
  }
}

function validate(formProps) {
  const error = {};

  if (!formProps.email) {
    error.email = 'Please enter an email';
  }

  if (!formProps.password) {
    error.password = 'Please enter an password';
  }

  if (!formProps.passwordConfirm) {
    error.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    error.password = 'Passwords must match';
  }

  return error;
}

function mapStateToProps(state) {
  return { 
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated
  }
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);
