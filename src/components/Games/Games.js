import React from 'react';

import Game from './Game/Game';

import './Games.css';

const games = props => (
  <section className="card-section">
    {props.games.map(p => (
      <Game
        key={p._id}
        id={p._id}
        gameName={p.gameName}
        onDelete={props.onDeleteEvent}
      />
    ))}
  </section>
);

export default games;