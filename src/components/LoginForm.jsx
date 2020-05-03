import React from 'react';
import { Form, Button } from 'semantic-ui-react';

const LoginForm = ({ submitFormHandler, message }) => {
  return (
    <Form onSubmit={submitFormHandler} id='login-form'>
      <label>Email</label>
      <input name='email' type='email' id='email'></input>

      <label>Password</label>
      <input name="password" type="password" id="password"></input>

      <Button id="submit">Submit</Button>
      <p id="message">{message}</p>
    </Form>
  );
};

export default LoginForm;
