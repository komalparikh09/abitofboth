import React, { Component } from 'react';
import axios from 'axios';

import Quizzes from '../../components/Quizzes/Quizzes';
import { config } from 'process';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class QuizzesPage extends Component {
  state = { isLoading: true, quizzes: [] };
  componentDidMount() {
    this.fetchData();
  }

  quizDeleteHandler = quizId => {
    axios
      .delete('http://localhost:3100/quizzes/' + quizId)
      .then(result => {
        console.log(result);
        this.fetchData();
      })
      .catch(err => {
        this.props.onError(
          'Deleting the quiz account failed. Please try again later'
        );
        console.log(err);
      });
  };

  fetchData = () => {
    axios
      .get('http://localhost:3100/quizzes')
      .then(quizzesResponse => {
        this.setState({ isLoading: false, quizzes: quizzesResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, quizzes: [] });
        this.props.onError('Loading quiz accounts failed. Please try again later');
        console.log(err);
      });
  };

  searchQuizHandler = () => {
    axios
      .get('http://localhost:3100/searchquizzes')
      .then(quizzesResponse => {
        this.setState({ isLoading: false, quizzes: quizzesResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, quizzes: [] });
        this.props.onError('Search failed. Please try again later');
        console.log(err);
      });
  };

  render() {
    let content = <div className="center-loading"><div className="sweet-loading"><BeatLoader css={override} size={50} color={"#86bc25"} loading={this.state.isLoading} /></div><p style={{display: "none"}}>Loading quizzes...</p></div>;

    if (!this.state.isLoading && this.state.quizzes.length > 0) {
      content = (
        <Quizzes
          quizzes={this.state.quizzes}
          onDeleteQuiz={this.quizDeleteHandler}
        />
      );
    }
    if (!this.state.isLoading && this.state.quizzes.length === 0) {
      content = <p>Found no quizzes. Try again later.</p>;
    }
    return <main>{content}</main>;
  }
}

export default QuizzesPage;