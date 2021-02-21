import React from 'react';

import Memory from './Memory/Memory';

import './Memories.css';

const memories = props => (
  <section className="card-section">
    {props.memories.map(p => (
      <Memory
        key={p._id}
        id={p._id}
        image={p.image}
        video={p.video}
        title={p.title}
        event={p.event}
        onDelete={props.onDeleteMemory}
      />
    ))}
  </section>
);

export default memories;