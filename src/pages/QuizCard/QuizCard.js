import React, { Component } from 'react';
import axios from 'axios';

import './QuizCard.css';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class QuizCardPage extends Component {
  state = { isLoading: true, quiz: null };

  componentDidMount() {
    axios
      .get('http://localhost:3100/searchquizzes/' + this.props.match.params.id)
      .then(quizResponse => {
        this.setState({ isLoading: false, quiz: quizResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
        this.props.onError('Loading the quiz details failed. Please try again later');
      });
  }

  render() {
    let content = <div className="center-loading"><div className="sweet-loading"><BeatLoader css={override} size={50} color={"#86bc25"} loading={this.state.isLoading} /></div><p style={{display: "none"}}>Is loading...</p></div>;

    if (!this.state.isLoading && this.state.quiz) {
      content = (
        <main className="main-page">
          <h1>Name: {this.state.quiz.name}</h1>
          <h2>Phone Number: {this.state.quiz.phoneNumber}</h2>
          <h2>Specialization: {this.state.quiz.specialization}</h2>
          <p>Total Experience: {this.state.quiz.totalExperience}</p>
          <p>Working Days: {this.state.quiz.workingDays}</p>
          <p>Visiting Hours From: {this.state.quiz.visitingHoursFrom}</p>
          <p>Visiting Hours To: {this.state.quiz.visitingHoursTo}</p>
          {/* <div
            className="main-page-image"
            style={{
              backgroundImage: "url('" + this.state.quiz.image + "')"
            }}
          /> }
          {/* <p>{this.state.quiz.description}</p> */}
        </main>
      );
    }
    if (!this.state.isLoading && !this.state.quiz) {
      content = (
        <main>
          <p>Found no quiz. Try again later.</p>
        </main>
      );
    }
    return content;
  }
}

export default QuizCardPage;