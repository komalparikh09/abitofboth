import React, { Component } from 'react';
import axios from 'axios';

import './EditEvent.css';
import '../../../src/elements.css';
import '../../../src/util.js';
// import Input from '../../components/Input/Input';
// import Button from '../../components/Button/Button';
import $ from 'jquery';

//const $ = window.$;
var specializationArr = [];
var workingDaysArr = [];

class EditEventPage extends Component {
  state = {
    isLoading: true,
    eventName: '',
    eventCreatedBy: '',
    eventDate: '',
    eventTime: '',
    eventDuration: '',
    eventDescription: '',
    registeredUsers: '',
    prizes: '',
    registeredTeams: '',
    interestCode: '',
    gameIndicator: '',
    quizIndicator: '',
    madePublicIndicator: ''
  };

  componentDidMount() {
    // Will be "edit" or "add"
    if (this.props.match.params.mode === 'edit') {
      axios
        .get('http://localhost:3100/events/' + this.props.match.params.id)
        .then(eventResponse => {
          const event = eventResponse.data;
          this.setState({
            isLoading: false,
            eventName: event.eventName,
            eventCreatedBy: event.eventCreatedBy,
            eventDate: event.eventDate,
            eventTime: event.eventTime,
            eventDuration: event.eventDuration,
            eventDescription: event.eventDescription,
            registeredUsers: event.registeredUsers,
            prizes: event.prizes,
            registeredTeams: event.registeredTeams,
            interestCode: event.interestCode,
            gameIndicator: event.gameIndicator,
            quizIndicator: event.quizIndicator,
            madePublicIndicator: event.madePublicIndicator
          });
          document.getElementById('eventName').value = this.state.eventName;
          document.getElementById('eventCreatedBy').value = this.state.eventCreatedBy;
          //this.editLoadSpecialization(this.state.specialization);
          document.getElementById('eventDate').value = this.state.eventDate;
          //this.editLoadWorkingDays(this.state.workingDays);
          document.getElementById('eventTime').value = this.state.eventTime;
          document.getElementById('eventDuration').value = this.state.eventDuration;
          document.getElementById('eventDescription').value = this.state.eventDescription;
          document.getElementById('registeredUsers').value = this.state.registeredUsers;
          document.getElementById('prizes').value = this.state.prizes;
          document.getElementById('registeredTeams').value = this.state.registeredTeams;
          document.getElementById('interestCode').value = this.state.interestCode;
          document.getElementById('gameIndicator').value = this.state.gameIndicator;
          document.getElementById('quizIndicator').value = this.state.quizIndicator;
          document.getElementById('madePublicIndicator').value = this.state.madePublicIndicator;
        })
        .catch(err => {
          this.setState({ isLoading: false });
          console.log(err);
        });
    } else {
      this.setState({ isLoading: false });
    }
  }

  editEventHandler = event => {
    event.preventDefault();
    // if (
    //   this.state.name.trim() === '' ||
    //   this.state.phoneNumber.trim() === '' ||
    //   this.state.specialization.trim() === '' ||
    //   this.state.totalExperience.trim() === '' ||
    //   this.state.workingDays.trim() === '' ||
    //   this.state.visitingHoursFrom.trim() === '' ||
    //   this.state.visitingHoursTo.trim() === ''
    // ) {
    //   return;
    // }
    this.setState({ isLoading: true });
    const eventData = {
      eventCreatedBy: this.state.eventCreatedBy,
      eventName: this.state.eventName,
      eventDate: this.state.eventDate,
      eventTime: this.state.eventTime,
      eventDuration: this.state.eventDuration,
      eventDescription: this.state.eventDescription,
      registeredUsers: this.state.registeredUsers,
      prizes: this.state.prizes,
      registeredTeams: this.state.registeredTeams,
      interestCode: this.state.interestCode,
      gameIndicator: this.state.gameIndicator,
      quizIndicator: this.state.quizIndicator,
      madePublicIndicator: this.state.madePublicIndicator
    };
    let request;
    if (this.props.match.params.mode === 'edit') {
      request = axios.patch(
        'http://localhost:3100/events/' + this.props.match.params.id,
        eventData
      );
    } else {
      request = axios.post('http://localhost:3100/events', eventData);
    }
    request
      .then(result => {
        this.setState({ isLoading: false });
        this.props.history.replace('/events');
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
        this.props.onError(
          'Editing the event details failed. Please try again later'
        );
      });
    specializationArr = [];
    workingDaysArr = [];
  };

  inputChangeHandler = (event, input) => {
    this.setState({ [input]: event.target.value });
  };

  resetValues = event => {
    this.setState({ eventName: '' });
    this.setState({ eventCreatedBy: '' });
    this.setState({ eventDate: '' });
    this.setState({ eventTime: '' });
    this.setState({ eventDuration: '' });
    this.setState({ eventDescription: '' });
    this.setState({ registeredUsers: '' });
    this.setState({ prizes: '' });
    this.setState({ registeredTeams: '' });
    this.setState({ interestCode: '' });
    this.setState({ gameIndicator: '' });
    this.setState({ quizIndicator: '' });
    this.setState({ madePublicIndicator: '' });
    specializationArr = [];
    workingDaysArr = [];
    var x = document.getElementsByClassName('daysBoxSelected')
    while (x.length > 0) {
      x[0].className = 'daysBox';
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
          'Resetting the event details failed. Please try again later'
        );
      });
  };

  editLoadSpecialization = (specialization) => {
    var specializationArrEdit = specialization.split(',');
    var i = 0;
    while (i < specializationArrEdit.length) {
      //var specializationChkBoxes = document.getElementsByName('specialization');
      $('input:checkbox:not(:checked)').each(function () {
        if (this.value === specializationArrEdit[i].trim()) {
          this.checked = true;
        }
        //alert("Id: " + $(this).attr("id") + " Value: " + $(this).val());
      });
      i++;
    }
  };

  editLoadWorkingDays = (workingDays) => {
    var workingDaysArrEdit = workingDays.split(',');
    var i = 0;
    while (i < workingDaysArrEdit.length) {
      switch (workingDaysArrEdit[i].trim()) {
        case 'Monday':
          this.selectDay(this, 'btnMon');
          break;
        case 'Tuesday':
          this.selectDay(this, 'btnTue');
          break;
        case 'Wednesday':
          this.selectDay(this, 'btnWed');
          break;
        case 'Thursday':
          this.selectDay(this, 'btnThu');
          break;
        case 'Friday':
          this.selectDay(this, 'btnFri');
          break;
        case 'Saturday':
          this.selectDay(this, 'btnSat');
          break;
        case 'Sunday':
          this.selectDay(this, 'btnSun');
          break;
        default:
          break;
      }
      i++;
    }
  };

  selectDay = (event, btnId) => {
    var btnDay = document.getElementById(btnId);
    $(btnDay).toggleClass("daysBox daysBoxSelected");
    if (btnDay.className.includes('daysBoxSelected')) {
      this.addWorkingDays(event, btnId);
    }
    else {
      this.removeWorkingDays(event, btnId);
    }
  };

  addSpecialization = (event, specializationId) => {
    var specializationEl = document.getElementById(specializationId);
    if (specializationEl.checked === true) {
      specializationArr.push(specializationEl.value);
    }
    if (specializationEl.checked === false) {
      var unCheck = specializationArr.indexOf(specializationEl.value);
      if (unCheck > -1) {
        specializationArr.splice(unCheck, 1);
      }
    }
    this.setState({ specialization: specializationArr.join(", ") });
  };

  addWorkingDays = (event, workingDayId) => {
    var workingDayEl = document.getElementById(workingDayId);
    var workingDayId;
    workingDayId = workingDayEl.id;
    switch (workingDayId) {
      case 'btnMon':
        workingDaysArr.push('Monday');
        break;
      case 'btnTue':
        workingDaysArr.push('Tuesday');
        break;
      case 'btnWed':
        workingDaysArr.push('Wednesday');
        break;
      case 'btnThu':
        workingDaysArr.push('Thursday');
        break;
      case 'btnFri':
        workingDaysArr.push('Friday');
        break;
      case 'btnSat':
        workingDaysArr.push('Saturday');
        break;
      case 'btnSun':
        workingDaysArr.push('Sunday');
        break;
      default:
        break;
    }
    this.setState({ workingDays: workingDaysArr.join(", ") });
  };

  removeWorkingDays = (event, workingDayId) => {
    var workingDayEl = document.getElementById(workingDayId);
    var workingDayId = workingDayEl.id;
    var unSelect;
    switch (workingDayId) {
      case 'btnMon':
        unSelect = workingDaysArr.indexOf('Monday');
        break;
      case 'btnTue':
        unSelect = workingDaysArr.indexOf('Tuesday');
        break;
      case 'btnWed':
        unSelect = workingDaysArr.indexOf('Wednesday');
        break;
      case 'btnThu':
        unSelect = workingDaysArr.indexOf('Thursday');
        break;
      case 'btnFri':
        unSelect = workingDaysArr.indexOf('Friday');
        break;
      case 'btnSat':
        unSelect = workingDaysArr.indexOf('Saturday');
        break;
      case 'btnSun':
        unSelect = workingDaysArr.indexOf('Sunday');
        break;
      default:
        break;
    }
    if (unSelect > -1) {
      workingDaysArr.splice(unSelect, 1);
    }
    this.setState({ workingDays: workingDaysArr.join(", ") });
  };

  // selectTime = (event, optionlist, txtId) => {
  //   var example = optionlist.selectedIndex;
  //   var demo = txtId.options[example].innerHTML;
  //   var demo = txtId.options[example].value;
  // };

  render() {
    let content = (
      <div>
        <form className="add-form" onSubmit={this.editEventHandler}>
          <h2>Event Registration</h2>
          <table border="1" width="90%" style={{ borderCollapse: "collapse" }} cellSpacing="5" cellPadding="5">
            <colgroup>
              <col width="100%" />
            </colgroup>
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }}>
                  <table border="0" cellSpacing="10" cellPadding="10" width="100%">
                    <colgroup>
                      <col width="30%" />
                      <col width="70%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <td className="formFirstCol">
                          Event Name:
                        </td>
                        <td style={{ textAlign: "left" }}>
                          <input type="text" className="textInput" id="eventName"
                            placeholder="Enter name of the event" onChange={event => this.inputChangeHandler(event, 'eventName')} />
                        </td>
                      </tr>
                      <tr>
                        <td className="formFirstCol">
                          Organized By:
                        </td>
                        <td style={{ textAlign: "left" }}>
                          <input type="text" className="textInput" id="eventCreatedBy"
                            placeholder="Enter your name" onChange={event => this.inputChangeHandler(event, 'eventCreatedBy')} />
                        </td>
                      </tr>
                      <tr>
                        <td className="formFirstCol">
                          Event Date:
                        </td>
                        <td style={{ textAlign: "left" }}>
                          <input type="text" className="textInput" id="eventDate"
                            placeholder="Enter the starting date of the event" onChange={event => this.inputChangeHandler(event, 'eventDate')} />
                        </td>
                      </tr>
                      <tr>
                        <td className="formFirstCol">
                          Event Start Time:
                        </td>
                        <td style={{ textAlign: "left" }}>
                          <input type="text" className="textInput" id="eventTime"
                            placeholder="Enter the starting time of the event" onChange={event => this.inputChangeHandler(event, 'eventTime')} />
                        </td>
                      </tr>
                      <tr>
                        <td className="formFirstCol">
                          Event Duration:
                        </td>
                        <td style={{ textAlign: "left" }}>
                          <input type="text" className="textInput" id="eventDuration"
                            placeholder="Enter event duration" onChange={event => this.inputChangeHandler(event, 'eventDuration')} />
                        </td>
                      </tr>
                      <tr>
                        <td className="formFirstCol">
                          Event Description:
                        </td>
                        <td style={{ textAlign: "left" }}>
                          <input type="text" className="textInput" id="eventDescription"
                            placeholder="Enter event description" onChange={event => this.inputChangeHandler(event, 'eventDescription')} />
                        </td>
                      </tr>
                      <tr>
                        <td className="formFirstCol">
                          Event Prizes:
                        </td>
                        <td style={{ textAlign: "left" }}>
                          <input type="text" className="textInput" id="prizes"
                            placeholder="Enter prizes for the event" onChange={event => this.inputChangeHandler(event, 'prizes')} />
                        </td>
                      </tr>
                      <tr>
                        <td className="formFirstCol">
                          Interest Code:
                        </td>
                        <td style={{ textAlign: "left" }}>
                        <select id="interestCode" name="" className="textInputSmall" width="150px" height="30px"
                            onChange={event => this.inputChangeHandler(event, 'interestCode')}>
                            <option value="" disabled selected hidden style={{ paddingLeft: "10px", color: "#D3D3D3" }}>Select interest code</option>
                            <option>ART0 - Art</option>
                            <option>MUSI - Music</option>
                            <option>DANC - Dance</option>
                            <option>CODI - Coding</option>
                            <option>PHOT - Photography</option>
                            <option>VIDE - Videography</option>
                            <option>CINE - Cinema</option>
                            <option>GARD - Gardening</option>
                            <option>HUMO - Humor</option>
                            <option>LITE - Literature</option>
                            <option>TRAV - Travel</option>
                            <option>INTE - Interior Designing</option>
                            <option>FASH - Fashion Designing</option>
                            <option>SPOR - Sports</option>
                            <option>YOGA - Yoga</option>
                            <option>WRIT - Writing</option>
                            <option>COOK - Cooking</option>
                            <option>SWIM - Swimming</option>
                            <option>CYCL - Cycling</option>
                            <option>WALK - Walking</option>
                            <option>RUNN - Running</option>
                            <option>BEEK - Bee Keeping</option>
                            <option>WINE - Wine Tasting</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td className="formFirstCol">
                          Make the event public:
                        </td>
                        <td style={{ textAlign: "left" }}>
                          <input type="checkbox" className="textInput" id="madePublicIndicator"
                            onChange={event => this.inputChangeHandler(event, 'madePublicIndicator')} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <table border="0" cellSpacing="0" cellPadding="0" width="100%">
            <colgroup>
              <col width="40%" />
              <col width="5%" />
              <col width="60%" />
            </colgroup>
            <tbody>
              <tr>
                <td style={{ textAlign: "right" }}>
                  <input type="submit" id="btnRegister" className="blueBtn" value="Update Details" onClick={this.editEventHandler} />
                </td>
                <td></td>
                <td style={{ textAlign: "left" }}>
                  <input type="reset" id="btnCancel" className="blueBtn" value="Cancel" onClick={this.resetValues} />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
        </form>
      </div>
    );
    if (this.state.isLoading) {
      content = <p>Is loading...</p>;
    }
    return <main>{content}</main>;
  }
}

export default EditEventPage;