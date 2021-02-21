import React from 'react';

import Post from './Post/Post';

import './Posts.css';

const posts = props => (
  <section className="card-section">
    {props.posts.map(p => (
      <Post
        key={p._id}
        id={p._id}
        postedBy={p.postedBy}
        image={p.image}
        video={p.video}
        title={p.title}
        caption={p.caption}
        tags={p.tags}
        postedDate={p.postedDate}
        postedTime={p.postedTime}
        imageSourceLoc={"/images/" + (Math.floor(Math.random() * (+100 + 1 - +1)) + +1) + ".jpg"}//{event => this.generateRandomImg(event)}//{imageSourceLoc}
        onDelete={props.onDeletePost}
      />
    ))}
  </section>
);

export default posts;