import React from 'react';

import MemoryCard from './MemoryCard/MemoryCard';

import './MemoryCards.css';

const memoryCards = props => (
  <section className="cards">
    {props.memories.map(p => (
      <MemoryCard
        key={p._id}
        id={p._id}
        image={p.image}
        video={p.video}
        title={p.title}
        event={p.event}
      // onDelete={props.onDeleteProduct}
      />
    ))}
  </section>
);

export default memoryCards;