import React, { Component } from 'react';
import axios from 'axios';

import './PostCard.css';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class PostCardPage extends Component {
  state = { isLoading: true, post: null };

  componentDidMount() {
    axios
      .get('http://localhost:3100/searchposts/' + this.props.match.params.id)
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
          <h1>{this.state.post.title}</h1>
          <h2>{this.state.post.caption}</h2>
          <h2>{this.state.post.tags}</h2>
          <p>{this.state.post.postedBy}</p>
          <p>{this.state.post.postedDate}</p>
          <p>{this.state.post.postedTime}</p>
          <p>{this.state.post.image}</p>
          <p>{this.state.post.video}</p>
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

export default PostCardPage;