import React, { Component } from 'react';
import axios from 'axios';
import 'jquery';
import './Auth.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import $ from 'jquery';

var technicalSkillsArr = [];
var interestPathsArr = [];

class AuthPage extends Component {
  state = {
    email: '',
    userName: '',
    password: '',
    technicalSkills: '',
    interestPaths: ''
  };

  inputChangeHandler = (event, input) => {
    this.setState({ [input]: event.target.value });
  };

  resetValues = event => {
    this.setState({ email: '' });
    this.setState({ userName: '' });
    this.setState({ password: '' });
    this.setState({ technicalSkills: '' });
    this.setState({ interestPaths: '' });
    technicalSkillsArr = [];
    interestPathsArr = [];
    var x = document.getElementsByClassName('interestPathBoxSelected')
    while (x.length > 0) {
      x[0].className = 'interestPathBox';
    }
    let request;
    request = axios.get('http://localhost:3100/home');
    request
      .then(result => {
        this.setState({ isLoading: false });
        this.props.history.replace('/home');
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
        this.props.onError(
          'Resetting the user details failed. Please try again later'
        );
      });
  };

  selectInterestPath = (event, btnId) => {
    var btnSelected = document.getElementById(btnId);
    $(btnSelected).toggleClass("interestPathBox interestPathBoxSelected");
    if (btnSelected.className.includes('interestPathBoxSelected')) {
      this.addInterestPaths(event, btnId);
    }
    else {
      this.removeInterestPaths(event, btnId);
    }
  };

  addInterestPaths = (event, interestPathId) => {
    var interestPathEl = document.getElementById(interestPathId);
    var interestPathId;
    interestPathId = interestPathEl.id;
    switch (interestPathId) {
      case 'btnLiterature':
        interestPathsArr.push('Literature');
        break;
      case 'btnArt':
        interestPathsArr.push('Art');
        break;
      case 'btnDance':
        interestPathsArr.push('Dance');
        break;
      case 'btnMusic':
        interestPathsArr.push('Music');
        break;
      case 'btnPhotography':
        interestPathsArr.push('Photography');
        break;
      case 'btnCinema':
        interestPathsArr.push('Cinema');
        break;
      case 'btnGames':
        interestPathsArr.push('Games');
        break;
      case 'btnVideography':
        interestPathsArr.push('Videography');
        break;
      case 'btnComedy':
        interestPathsArr.push('Comedy');
        break;
      case 'btnTravel':
        interestPathsArr.push('Travel');
        break;
      case 'btnInteriorDesigning':
        interestPathsArr.push('Interior Designing');
        break;
      case 'btnFashionDesigning':
        interestPathsArr.push('Fashion Designing');
        break;
      default:
        break;
    }
    this.setState({ interestPaths: interestPathsArr.join(", ") });
  };

  removeInterestPaths = (event, interestPathId) => {
    var interestPathEl = document.getElementById(interestPathId);
    var interestPathId = interestPathEl.id;
    var unSelect;
    switch (interestPathId) {
      case 'btnLiterature':
        unSelect = interestPathsArr.indexOf('Literature');
        break;
      case 'btnArt':
        unSelect = interestPathsArr.indexOf('Art');
        break;
      case 'btnDance':
        unSelect = interestPathsArr.indexOf('Dance');
        break;
      case 'btnMusic':
        unSelect = interestPathsArr.indexOf('Music');
        break;
      case 'btnPhotography':
        unSelect = interestPathsArr.indexOf('Photography');
        break;
      case 'btnCinema':
        unSelect = interestPathsArr.indexOf('Cinema');
        break;
      case 'btnGames':
        unSelect = interestPathsArr.indexOf('Games');
        break;
      case 'btnVideography':
        unSelect = interestPathsArr.indexOf('Videography');
        break;
      case 'btnComedy':
        unSelect = interestPathsArr.indexOf('Comedy');
        break;
      case 'btnTravel':
        unSelect = interestPathsArr.indexOf('Travel');
        break;
      case 'btnInteriorDesigning':
        unSelect = interestPathsArr.indexOf('Interior Designing');
        break;
      case 'btnFashionDesigning':
        unSelect = interestPathsArr.indexOf('Fashion Designing');
        break;
      default:
        break;
    }
    if (unSelect > -1) {
      interestPathsArr.splice(unSelect, 1);
    }
    this.setState({ interestPaths: interestPathsArr.join(", ") });
  };

  // selectTime = (event, optionlist, txtId) => {
  //   var example = optionlist.selectedIndex;
  //   var demo = txtId.options[example].innerHTML;
  //   var demo = txtId.options[example].value;
  // };

  validateFormValues = () => {
    if (this.state.email.length === 0 || this.state.userName.length === 0 || this.state.password.length === 0 || this.state.technicalSkills.length === 0 || this.state.interestPaths.length === 0) {
      throw "Please fill all the required values before submitting.";
    }
  }

  addUserHandler = event => {
    event.preventDefault();
    try {
      this.validateFormValues();
    }
    catch (err) {
      this.setState({ isLoading: false });
      this.props.onError(err);
      return;
    }
    this.setState({ isLoading: true });
    const userData = {
      email: this.state.email,
      userName: this.state.userName,
      password: this.state.password,
      technicalSkills: this.state.technicalSkills,
      interestPaths: this.state.interestPaths
    };
    let request;
    if (this.props.match.params.mode === 'edit') {
      request = axios.patch(
        'http://localhost:3100/users/' + this.props.match.params.id,
        userData
      );
    } else {
      request = axios.post('http://localhost:3100/users', userData);
    }
    request
      .then(result => {
        this.setState({ isLoading: false });
        this.props.history.replace('/users');
        this.props.onSuccess(result.data.message);
      })
      .catch(err => {
        this.setState({ isLoading: false });
        //console.log(err);
        const errData = {
          message: err.message,
        };
        let err_request;
        err_request = axios.post('http://localhost:3100/errorlog', errData);
        err_request
          .then(err_result => {
            this.setState({ isLoading: false });
            this.props.onError(err_result.message);
            return;
          });
        this.props.onError(
          'Registering the user account failed. Please try again later'
        );
      });
    technicalSkillsArr = [];
    interestPathsArr = [];
  };

  render() {
    let modeButtonText = 'Switch to Signup';
    let submitButtonText = 'Login';
    let loginContent = null;
    let signupContent = null;
    loginContent = (
      <div>
        <Input label="E-Mail" config={{ type: 'email' }} onChange={event => this.inputChangeHandler(event, 'email')} />
        <br />
        <Input label="Password" config={{ type: 'password' }} onChange={event => this.inputChangeHandler(event, 'password')} />
        <br />
        <Button type="submit">{submitButtonText}</Button>
      </div>
    );
    if (this.props.mode === 'signup') {
      modeButtonText = 'Switch to Login';
      submitButtonText = 'Signup';
      signupContent = (
        <div>
          <Input label="Name" config={{ type: 'text' }} onChange={event => this.inputChangeHandler(event, 'userName')} />
          <br />
          <Input label="E-Mail" config={{ type: 'email' }} onChange={event => this.inputChangeHandler(event, 'email')} />
          <br />
          <Input label="Password" config={{ type: 'password' }} onChange={event => this.inputChangeHandler(event, 'password')} />
          <br />
          Technical Skills
          <br />
          <br />
          <select id="technicalSkills" name="technicalSkills" className="dropdown">
            <option value="0">Select</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="dotnet">.NET</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="angular">Angular</option>
            <option value="react">React</option>
            <option value="r">R</option>
            <option value="ruby">Ruby</option>
          </select>
          <br />
          <br />
          Interest Paths:
          <br />
          <br />
          <button type="button" id="btnLiterature" className="interestPathBox switchColor"
            onClick={event => this.selectInterestPath(event, 'btnLiterature')}><span className="interestPathBoxText">Literature</span></button>
          <button type="button" id="btnArt" className="interestPathBox switchColor"
            onClick={event => this.selectInterestPath(event, 'btnArt')}><span className="interestPathBoxText">Art</span></button>
          <button type="button" id="btnDance" className="interestPathBox switchColor"
            onClick={event => this.selectInterestPath(event, 'btnDance')}><span className="interestPathBoxText">Dance</span></button>
          <button type="button" id="btnMusic" className="interestPathBox switchColor"
            onClick={event => this.selectInterestPath(event, 'btnMusic')}><span className="interestPathBoxText">Music</span></button>
          <button type="button" id="btnPhotography" className="interestPathBox switchColor"
            onClick={event => this.selectInterestPath(event, 'btnPhotography')}><span className="interestPathBoxText">Photography</span></button>
          <button type="button" id="btnCinema" className="interestPathBox switchColor"
            onClick={event => this.selectInterestPath(event, 'btnCinema')}><span className="interestPathBoxText">Cinema</span></button>
          <button type="button" id="btnGames" className="interestPathBox switchColor"
            onClick={event => this.selectInterestPath(event, 'btnGames')}><span className="interestPathBoxText">Games</span></button>
          <button type="button" id="btnVideography" className="interestPathBox switchColor"
            onClick={event => this.selectInterestPath(event, 'btnVideography')}><span className="interestPathBoxText">Videography</span></button>
          <button type="button" id="btnComedy" className="interestPathBox switchColor"
            onClick={event => this.selectInterestPath(event, 'btnComedy')}><span className="interestPathBoxText">Comedy</span></button>
          <button type="button" id="btnBeatboxing" className="interestPathBox switchColor"
            onClick={event => this.selectInterestPath(event, 'btnBeatboxing')}><span className="interestPathBoxText">Beatboxing</span></button>
          <button type="button" id="btnTravel" className="interestPathBox switchColor"
            onClick={event => this.selectInterestPath(event, 'btnTravel')}><span className="interestPathBoxText">Travel</span></button>
          <button type="button" id="btnInteriorDesigning" className="interestPathBox switchColor"
            onClick={event => this.selectInterestPath(event, 'btnInteriorDesigning')}><span className="interestPathBoxText">Interior Designing</span></button>
          <button type="button" id="btnFashionDesigning" className="interestPathBox switchColor"
            onClick={event => this.selectInterestPath(event, 'btnFashionDesigning')}><span className="interestPathBoxText">Fashion Designing</span></button>
          <br />
          <br />
          <Button type="submit" style={{ alignSelf: "center" }} onSubmit={this.addUserHandler}>{submitButtonText}</Button>
          <br />
          <br />
        </div>);
    }
    return (
      <main>
        <section className="auth__mode-control">
          <Button type="button" onClick={this.props.onAuthModeChange}>
            {modeButtonText}
          </Button>
        </section>
        <form
          className="auth__form"
          onSubmit={event =>
            this.props.onAuth(event, {
              email: this.state.email,
              password: this.state.password
            })
          }
        >
          {this.props.mode === 'signup' ? signupContent : loginContent}
        </form>
      </main>
    );
  }
}
export default AuthPage;