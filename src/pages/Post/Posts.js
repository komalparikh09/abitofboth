import React, { Component } from 'react';
import axios from 'axios';

import Posts from '../../components/Posts/Posts';
import { config } from 'process';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class PostsPage extends Component {
  state = { isLoading: true, posts: [] };
  componentDidMount() {
    this.fetchData();
  }

  postDeleteHandler = postId => {
    axios
      .delete('http://localhost:3100/posts/' + postId)
      .then(result => {
        console.log(result);
        this.fetchData();
      })
      .catch(err => {
        this.props.onError(
          'Deleting the post account failed. Please try again later'
        );
        console.log(err);
      });
  };

  fetchData = () => {
    axios
      .get('http://localhost:3100/posts')
      .then(postsResponse => {
        this.setState({ isLoading: false, posts: postsResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, posts: [] });
        this.props.onError('Loading posts failed. Please try again later');
        console.log(err);
      });
  };

  searchPostHandler = () => {
    axios
      .get('http://localhost:3100/searchposts')
      .then(postsResponse => {
        this.setState({ isLoading: false, posts: postsResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, posts: [] });
        this.props.onError('Search failed. Please try again later');
        console.log(err);
      });
  };

  render() {
    let content = <div className="center-loading"><div className="sweet-loading"><BeatLoader css={override} size={50} color={"#86bc25"} loading={this.state.isLoading} /></div><p style={{display: "none"}}>Loading posts...</p></div>;

    if (!this.state.isLoading && this.state.posts.length > 0) {
      content = (
        <Posts
          posts={this.state.posts}
          onDeletePost={this.postDeleteHandler}
        />
      );
    }
    if (!this.state.isLoading && this.state.posts.length === 0) {
      content = <p>Found no posts. Try again later.</p>;
    }
    return <main>{content}</main>;
  }
}

export default PostsPage;