import React from 'react';

import PostCard from './PostCard/PostCard';

import './PostCards.css';

const postCards = props => (
  <section className="cards">
    {props.posts.map(p => (
      <PostCard
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
      // onDelete={props.onDeleteProduct}
      />
    ))}
  </section>
);

export default postCards;