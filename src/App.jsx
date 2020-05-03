import React, { Component } from "react";
import DisplayCooperResult from './components/DisplayCooperResult';
import DisplayPerformanceData from './components/DisplayPerformanceData';
import InputFields from './components/InputFields';
import LoginForm from './components/LoginForm';
import { authenticate } from "./modules/auth";
import { Menu, Image, Header, Button, Segment, Divider, Container } from 'semantic-ui-react'

export default class App extends Component {
  state = {
    distance: "",
    gender: "female",
    age: "",
    renderLoginForm: "none",
    authenticated: false,
    message: "",
    entrySaved: false,
    renderIndex: false
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name] : e.target.value, entrySaved: false })
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

  logoutButton() {
    const { message } = this.state;
    return (
      <>
        <Button
          id="logout"
          onClick={() => this.setState({ renderLoginForm: !this.state.renderLoginForm})}
        >
          Logout
        </Button>
      </>
    )
  }

  renderForm(form) {
    switch(form){
      case "sign-up":
        return(
        <>
          Awaiting Sign-up form here!
        </>)
      case "login":
        return(<LoginForm submitFormHandler={this.onLogin} />)
      default:
        return;
    }
  }

  render() {
    const { renderLoginForm, authenticated, message } = this.state;
    let renderLogin;
    let performanceDataIndex;
    let formDiv;
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
            <Header 
              className="black"
              id='message'
              size="large">
                Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}
            </Header>
            {this.logoutButton()}
          </>
        );
        performanceDataIndex = (
          <button id="show-index" onClick={() => this.setState({ renderIndex: true })}>Show past entries</button>
        )
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
            { formDiv }
        <div className="content main" style = {{ "padding-top":"5rem"}}>
          <InputFields onChangeHandler={this.onChangeHandler} />
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
      </>
    );
  } 
};
