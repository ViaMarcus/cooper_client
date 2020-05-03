import React from 'react';
import { Form, Button } from 'semantic-ui-react';

const SignupForm = ({ submitFormHandler }) => {
  return (
    <Form onSubmit={submitFormHandler} id='signup-form'>
      <label>Email</label>
      <input name='email' type='email' id='email'></input>

      <label>Password</label>
      <input name="password" type="password" id="password"></input>

      <label>Password Confirmation</label>
      <input name="password-confirmation" type="password" id="password_confirmation"></input>

      <Button id="submit">Submit</Button>
    </Form>
  );
};

export default SignupForm;