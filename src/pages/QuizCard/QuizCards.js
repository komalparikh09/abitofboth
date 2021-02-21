import React, { Component } from 'react';
import axios from 'axios';

import QuizCards from '../../components/QuizCards/QuizCards';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class QuizCardsPage extends Component {
  state = { isLoading: true, quizzes: [] };
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get('http://localhost:3100/searchquizzes')
      .then(quizzesResponse => {
        this.setState({ isLoading: false, quizzes: quizzesResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, quizzes: [] });
        this.props.onError('Loading search results for quizzes failed. Please try again later');
        console.log(err);
      });
  };

  render() {
    let content = <div className="center-loading"><div className="sweet-loading"><BeatLoader css={override} size={50} color={"#86bc25"} loading={this.state.isLoading} /></div><p style={{display: "none"}}>Loading quizzes...</p></div>;

    if (!this.state.isLoading && this.state.quizzes.length > 0) {
      content = (
        <QuizCards
          quizzes={this.state.quizzes}
          // onDeleteQuiz={this.quizDeleteHandler}
        />
      );
    }
    if (!this.state.isLoading && this.state.quizzes.length === 0) {
      content = <p>Found no quizzes. Try again later.</p>;
    }
    return <main>{content}</main>;
  }
}

export default QuizCardsPage;