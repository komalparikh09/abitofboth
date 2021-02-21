import React, { Component } from 'react';
import axios from 'axios';

import PostCards from '../../components/PostCards/PostCards';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class PostCardsPage extends Component {
  state = { isLoading: true, posts: [] };
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get('http://localhost:3100/searchposts')
      .then(postsResponse => {
        this.setState({ isLoading: false, posts: postsResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, posts: [] });
        this.props.onError('Loading search results for posts failed. Please try again later');
        console.log(err);
      });
  };

  render() {
    let content = <div className="center-loading"><div className="sweet-loading"><BeatLoader css={override} size={50} color={"#86bc25"} loading={this.state.isLoading} /></div><p style={{display: "none"}}>Loading posts...</p></div>;

    if (!this.state.isLoading && this.state.posts.length > 0) {
      content = (
        <PostCards
          posts={this.state.posts}
          // onDeletePost={this.postDeleteHandler}
        />
      );
    }
    if (!this.state.isLoading && this.state.posts.length === 0) {
      content = <p>Found no posts. Try again later.</p>;
    }
    return <main>{content}</main>;
  }
}

export default PostCardsPage;