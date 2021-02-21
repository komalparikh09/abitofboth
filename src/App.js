import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import ParticlesBg from "particles-bg";
import AnimatedBg from 'react-animated-bg';

import '../src/util.js';
import './elements.css';
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';
import Backdrop from './components/Backdrop/Backdrop';
import Footer from './components/Footer/Footer';
import AuthPage from './pages/Auth/Auth';
import DoctorAppointmentHomePage from './pages/ABoBHome/ABoBHome';
import BookNewAppointmentPage from './pages/BookNewAppointment/BookNewAppointment';
import DoctorRegistrationPage from './pages/DoctorRegistration/DoctorRegistration';
import DoctorDashboardPage from './pages/DoctorDashboard/DoctorDashboard';
import PatientDashboardPage from './pages/PatientDashboard/PatientDashboard';
import DoctorPage from './pages/Doctor/Doctor';
import DoctorsPage from './pages/Doctor/Doctors';
import EditDoctorPage from './pages/Doctor/EditDoctor';
import DoctorCardPage from './pages/DoctorCard/DoctorCard';
import DoctorCardsPage from './pages/DoctorCard/DoctorCards';
import BookAppointmentDoctorCardPage from './pages/DoctorCard/BookAppointmentDoctorCard';
import BookAppointmentForPage from './pages/BookAppointmentFor/BookAppointmentFor';
import PatientAppointmentsPage from './pages/PatientAppointment/PatientAppointments';
import PatientAppointmentPage from './pages/PatientAppointment/PatientAppointment';
import EditPatientAppointmentPage from './pages/PatientAppointment/EditPatientAppointment';
import EventPage from './pages/Event/Event';
import EventsPage from './pages/Event/Events';
import EditEventPage from './pages/Event/EditEvent';
import EventCardPage from './pages/EventCard/EventCard';
import EventCardsPage from './pages/EventCard/EventCards';
import GamePage from './pages/Game/Game';
import GamesPage from './pages/Game/Games';
import EditGamePage from './pages/Game/EditGame';
import GameCardPage from './pages/GameCard/GameCard';
import GameCardsPage from './pages/GameCard/GameCards';
import QuizPage from './pages/Quiz/Quiz';
import QuizzesPage from './pages/Quiz/Quizzes';
import EditQuizPage from './pages/Quiz/EditQuiz';
import QuizCardPage from './pages/QuizCard/QuizCard';
import QuizCardsPage from './pages/QuizCard/QuizCards';
import InitiativePage from './pages/Initiative/Initiative';
import InitiativesPage from './pages/Initiative/Initiatives';
import EditInitiativePage from './pages/Initiative/EditInitiative';
import InitiativeCardPage from './pages/InitiativeCard/InitiativeCard';
import InitiativeCardsPage from './pages/InitiativeCard/InitiativeCards';
import PostPage from './pages/Post/Post';
import PostsPage from './pages/Post/Posts';
import EditPostPage from './pages/Post/EditPost';
import PostCardPage from './pages/PostCard/PostCard';
import PostCardsPage from './pages/PostCard/PostCards';
import MemoryPage from './pages/Memory/Memory';
import MemoriesPage from './pages/Memory/Memories';
import EditMemoryPage from './pages/Memory/EditMemory';
import MemoryCardPage from './pages/MemoryCard/MemoryCard';
import MemoryCardsPage from './pages/MemoryCard/MemoryCards';
import ABoBHomePage from './pages/ABoBHome/ABoBHome';
import MenuPage from './pages/Menu/Menu';

class App extends Component {
  state = {
    isAuth: true,
    authMode: 'login',
    error: null,
    success: null
  };

  logoutHandler = () => {
    this.setState({ isAuth: false });
  };

  authHandler = (event, authData) => {
    event.preventDefault();
    if (authData.email.trim() === '' || authData.password.trim() === '') {
      return;
    }
    let request;
    if (this.state.authMode === 'login') {
      request = axios.post('http://localhost:3100/login', authData);
    } else {
      request = axios.post('http://localhost:3100/signup', authData);
    }
    request
      .then(authResponse => {
        if (authResponse.status === 201 || authResponse.status === 200) {
          const token = authResponse.data.token;
          console.log(token);
          // Theoretically, you would now store the token in localstorage + app state
          // and use it for subsequent requests to protected backend resources
          this.setState({ isAuth: true });
        }
      })
      .catch(err => {
        this.errorHandler(err.response.data.message);
        console.log(err);
        this.setState({ isAuth: false });
      });
  };

  authModeChangedHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login'
      };
    });
  };

  errorHandler = message => {
    this.setState({
      error: message
    });
  };

  successHandler = message => {
    this.setState({
      success: message
    });
  }

  render() {
    // const imagesList = [
    //   'url("https://images.dog.ceo/breeds/labrador/n02099712_3503.jpg")',
    //   'url("https://images.dog.ceo/breeds/labrador/n02099712_5844.jpg")',
    //   'url("https://images.dog.ceo/breeds/labrador/n02099712_5343.jpg")',
    //   'url("https://images.dog.ceo/breeds/labrador/n02099712_7481.jpg")',
    //   'url("https://images.dog.ceo/breeds/labrador/n02099712_7414.jpg")'
    // ];
    let routes = (
      <Switch>
        <Redirect from="/" to="/home" exact />
        {/* <Redirect from="/home"to="/doctor/add" exact />
        <Redirect from="/home"to="/patients" exact /> */}
        <Redirect from="/auth" to="/home" exact />
        <Redirect from="/signup" to="/home" exact />
        {/* <Route
          path="/home"
          render={props => (
            <DoctorAppointmentHomePage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        /> */}
        <Route
          path="/home"
          render={props => (
            <ABoBHomePage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/doctordashboard"
          render={props => (
            <DoctorDashboardPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/doctor/:mode"
          render={props => (
            <DoctorRegistrationPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/doctors/:id/:mode"
          render={props => (
            <EditDoctorPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/doctors/:id"
          render={props => (
            <DoctorPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        {/* <Route
          path="/searchdoctors/specialization/:specialization/workingDays/:workingDays"
          render={props => (
            <DoctorsPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        /> */}
        <Route
          path="/searchdoctors"
          render={props => (
            <DoctorsPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/doctors"
          render={props => (
            <DoctorsPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        {/* <Route
          path="/patients/:patientPhone"
          render={props => (
            <PatientAppointmentsPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        /> */}
        <Route
          path="/patients"
          render={props => (
            <PatientDashboardPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/appointment/doctordetails/"
          render={props => (
            <DoctorDashboardPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/appointment/patientdetails/"
          render={props => (
            <DoctorDashboardPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/appointment/datetime/"
          render={props => (
            <PatientDashboardPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/appointment/book/:id"
          render={props => (
            <BookAppointmentForPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/appointment/patient/:patientPhone"
          render={props => (
            <PatientAppointmentsPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/appointments/:id/:mode"
          render={props => (
            <EditPatientAppointmentPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/appointment/:id"
          render={props => (
            <PatientAppointmentsPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/appointments/:id"
          render={props => (
            <PatientAppointmentPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/appointments"
          render={props => (
            <PatientAppointmentsPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/appointment"
          render={props => (
            <BookNewAppointmentPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        {/* <Route
          path="/errorlog"
          render={props => (
            <PatientDashboardPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        /> */}
        <Route
          path="/events/:id/:mode"
          render={props => (
            <EditEventPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/initiatives/:id/:mode"
          render={props => (
            <EditInitiativePage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/posts/:id/:mode"
          render={props => (
            <EditPostPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/events/:id"
          render={props => (
            <EventPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/games/:id"
          render={props => (
            <GamePage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/quizzes/:id"
          render={props => (
            <QuizPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/initiatives/:id"
          render={props => (
            <InitiativePage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/posts/:id"
          render={props => (
            <PostPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/memories/:id"
          render={props => (
            <MemoryPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/events"
          render={props => (
            <EventsPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/initiatives"
          render={props => (
            <InitiativesPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        {/* <Route
          path="/users"
          render={props => (
            <UsersPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        /> */}
        <Route
          path="/games"
          render={props => (
            <GamesPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/quizzes"
          render={props => (
            <QuizzesPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/posts"
          render={props => (
            <PostsPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        <Route
          path="/memories"
          render={props => (
            <MemoriesPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        />
        {/* <Route
          path="/menu"
          render={props => (
            <MenuPage {...props} onError={this.errorHandler} onSuccess={this.successHandler} />
          )}
        /> */}
      </Switch>
    );

    if (!this.state.isAuth) {
      routes = (
        <Switch>
          <Redirect from="/" to="/auth" exact />
          <Redirect from="/home" to="/auth" exact />
          <Redirect from="/doctors" to="/auth" />
          <Redirect from="/doctor" to="/auth" />
          <Redirect from="/patients" to="/auth" />
          <Redirect from="/patient" to="/auth" />
          <Redirect from="/appointment" to="/auth" />
          <Redirect from="/appointment/book" to="/auth" />
          <Redirect from="/doctor/add" to="/auth" />
          <Route
            path="/auth"
            render={() => (
              <AuthPage
                mode={this.state.authMode}
                onAuth={this.authHandler}
                onAuthModeChange={this.authModeChangedHandler}
              />
            )}
          />
        </Switch>
      );
    }

    return (
      // <AnimatedBg colors={imagesList} duration={2} delay={1} timingFunction="ease-out">
      <div className="App">
        {/* <ParticlesBg type="cobweb" bg={true} className="backgroundParticles" /> */}
        <Modal
          open={!!this.state.error}
          title="An Error Occurred"
          onClose={() => this.errorHandler(null)}
        >
          <p>{this.state.error}</p>
        </Modal>
        <Modal
          open={!!this.state.success}
          title="Attempt Successful"
          onClose={() => this.successHandler(null)}
        >
          <p>{this.state.success}</p>
        </Modal>
        <Backdrop show={!!this.state.error || !!this.state.success} />
        <Header
          authenticated={this.state.isAuth}
          onLogout={this.logoutHandler}
        />
        <Footer
          authenticated={this.state.isAuth}
          onLogout={this.logoutHandler}/>
        {routes}
      </div>
      // </AnimatedBg>
    );
  }
}

export default App;
