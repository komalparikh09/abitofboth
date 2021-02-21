import React from 'react';

import QuizCard from './QuizCard/QuizCard';

import './QuizCards.css';

const quizCards = props => (
  <section className="cards">
    {props.quizzes.map(p => (
      <QuizCard
        key={p._id}
        id={p._id}
        name={p.name}
        specialization={p.specialization}
        totalExperience={p.totalExperience}
        address={p.address}
        // onDelete={props.onDeleteProduct}
      />
    ))}
  </section>
);

export default quizCards;