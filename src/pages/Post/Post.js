import React, { Component } from 'react';
import axios from 'axios';

import './Post.css';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class PostPage extends Component {
  state = { isLoading: true, post: null };

  componentDidMount() {
    axios
      .get('http://localhost:3100/posts/' + this.props.match.params.id)
      .then(postResponse => {
        this.setState({ isLoading: false, post: postResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
        this.props.onError('Loading the post details failed. Please try again later');
      });
  }

  render() {
    let content = <div className="center-loading"><div className="sweet-loading"><BeatLoader css={override} size={50} color={"#86bc25"} loading={this.state.isLoading} /></div><p style={{display: "none"}}>Is loading...</p></div>;

    if (!this.state.isLoading && this.state.post) {
      content = (
        <main className="main-page">
          <br />
          <div className="div-card">
            <div className="div-card-name">
              <div className="div-card-text">
                <h3>{this.state.post.title}</h3>
              </div>
            </div>
            <div className="div-card-text">
              <br />
              {this.state.post.caption}
              <br />
              <br />
              {this.state.post.tags}
              <br />
              <br />
              {this.state.post.postedBy}
              <br />
              <br />
              {this.state.post.postedDate}
              <br />
              <br />
              {this.state.post.postedTime}
              <br />
              <br />
            </div>
          </div>
          {/* <h1>Name: {this.state.post.name}</h1>
          <h2>Phone Number: {this.state.post.phoneNumber}</h2>
          <h2>Specialization: {this.state.post.specialization}</h2>
          <p>Total Experience: {this.state.post.totalExperience}</p>
          <p>Working Days: {this.state.post.workingDays}</p>
          <p>Visiting Hours From: {this.state.post.visitingHoursFrom}</p>
          <p>Visiting Hours To: {this.state.post.visitingHoursTo}</p> */}
          {/* <div
            className="main-page-image"
            style={{
              backgroundImage: "url('" + this.state.post.image + "')"
            }}
          /> }
          {/* <p>{this.state.post.description}</p> */}
        </main>
      );
    }
    if (!this.state.isLoading && !this.state.post) {
      content = (
        <main>
          <p>Found no post. Try again later.</p>
        </main>
      );
    }
    return content;
  }
}

export default PostPage;