import React from 'react';
import { Form } from 'semantic-ui-react';

const InputFields = ({ onChangeHandler }) => {
    return (
        <>
          <Form>
            <label>Distance</label>
            <input 
              onChange={onChangeHandler}
              name="distance" 
              id="distance"  
            ></input><br></br>

            <select onChange={onChangeHandler} name="gender" id="gender">
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select><br></br>

            <label>Age</label>
            <input
              onChange={onChangeHandler}
              name="age"
              id="age"
            ></input>
          </Form>
        </>
    );
};

export default InputFields;