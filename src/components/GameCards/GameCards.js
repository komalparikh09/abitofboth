import React from 'react';

import GameCard from './GameCard/GameCard';

import './GameCards.css';

const gameCards = props => (
  <section className="cards">
    {props.games.map(p => (
      <GameCard
        key={p._id}
        id={p._id}
        gameName={p.gameName}
        // onDelete={props.onDeleteProduct}
      />
    ))}
  </section>
);

export default gameCards;