import React, { Component } from "react";
import DisplayCooperResult from './components/DisplayCooperResult';
import DisplayPerformanceData from './components/DisplayPerformanceData';
import InputFields from './components/InputFields';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm'
import { authenticate, register } from "./modules/auth";
import { Menu, Image, Header, Button, Segment, Divider, Container } from 'semantic-ui-react'

export default class App extends Component {
  state = {
    distance: "",
    gender: JSON.parse(window.localStorage.getItem('preset')).gender || "female",
    age: JSON.parse(window.localStorage.getItem('preset')).age || "",
    renderLoginForm: "none",
    authenticated: false,
    message: "",
    entrySaved: false,
    renderIndex: false
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name] : e.target.value, entrySaved: false })
    window.localStorage.setItem('preset', JSON.stringify({age: this.state.age, gender: this.state.gender}));
  };

  onLogin = async e => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({ authenticated: true, renderLoginForm: "none"});
    } else {
      this.setState({ message: response.message });
    }
  };

  onSignup = async e => {
    e.preventDefault();
    const response = await register(
      e.target.email.value,
      e.target.password.value,
      e.target.password_confirmation.value
    );
    if (response.authenticated) {
      this.setState({ authenticated: true, renderLoginForm: "none"});
    } else {
      this.setState({ message: response.message });
    }
  };

  logOut() {
    this.setState({ renderLoginForm: false, 
                    message: "You have logged out!", 
                    authenticated: false,
                    entrySaved: false,
                    renderIndex: false
    })
    window.sessionStorage.removeItem('credentials');
  }
  
  renderForm(form) {
    switch(form){
      case "sign-up":
        return(
        <>
          <SignupForm submitFormHandler={this.onSignup} message={this.state.message} />
          <Divider horizontal>
            Sign up!
          </Divider>
        </>
        )
      case "login":
        return(
          <>
            <LoginForm submitFormHandler={this.onLogin} message={this.state.message}/>
            <Divider horizontal>
              Log In!
            </Divider>
          </>
        )
      default:
        return;
    }
  }

  render() {
    const { renderLoginForm, authenticated, message } = this.state;
    let renderLogin;
    let performanceDataIndex;
    let formDiv;
    let fixer;
    switch(true) {
      case !authenticated:
        renderLogin = (
          <Button.Group>
            <Button inverted color="pink" id="login"
              id="sign_up"
              onClick={() => this.setState({ renderLoginForm: this.state.renderLoginForm == "sign-up" ? "none" : "sign-up"})}
            >Sign Up
            </Button>
            <Button inverted color="pink" id="login"
                onClick={() => this.setState({ renderLoginForm: renderLoginForm == "login" ? "none" : "login"})}
            >Login
            </Button>
          </Button.Group>
        )
        fixer = "";
        formDiv = (
          <div className="content" style={{"padding-top":"5rem"}}>
              { this.renderForm(this.state.renderLoginForm) }
              <p id="message">{ message }</p>
          </div>
        )
        break;
      case authenticated:
        renderLogin = (
          <>
            <Button 
              className="black"
              id='message'
              size="large">
                Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}
            </Button>
            <Button id="logout" onClick={() => this.logOut()}>
          Logout
        </Button>
          </>
        );
        performanceDataIndex = (
            <button id="show-index" onClick={() => this.setState({ renderIndex: true })}>Show past entries</button>
        )
        fixer = (<div style={{"padding-top":"6rem"}}> </div>)
        if (this.state.renderIndex) {
          performanceDataIndex = (
            <>
              <DisplayPerformanceData
                updateIndex={this.state.updateIndex}
                indexUpdated={() => this.setState({ updateIndex: false })}
              />
              <button onClick={() => this.setState({ renderIndex: false })}>Hide past entries</button>
            </>
          )
        } else {
          performanceDataIndex = (
            <button id="show-index" onClick={() => this.setState({ renderIndex: true })}>Show past entries</button>
          )
        }
    }

    return (
      <>
        <Menu
          as="menu"
          className="menu"
          inverted
          fixed="top">
          <Menu.Item>
            <Header size="huge" className="inverted">
            <Image
              src='wut_logo_neg_transparent.png'
              size='medium'
            />
              TrackTracker
            </Header>
          </Menu.Item>
          <Menu.Menu position="right">
          <Menu.Item >
            { renderLogin }
          </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Container width="10%">
          { formDiv }
          <div className="content main" style = {{ "padding-top":"1rem"}}>
            {fixer}
            <InputFields onChangeHandler={this.onChangeHandler} age={this.state.age} gender={this.state.gender} />
            <DisplayCooperResult
              distance={this.state.distance}
              gender={this.state.gender}
              age={this.state.age}
              authenticated={this.state.authenticated}
              entrySaved={this.state.entrySaved}
              entryHandler={() => this.setState({ entrySaved: true, updateIndex: true })}
            />
            {performanceDataIndex}
          </div>
        </Container>
      </>
    );
  } 
};
