import React from 'react';

import Quiz from './Quiz/Quiz';

import './Quizzes.css';

const quizzes = props => (
  <section className="card-section">
    {props.quizzes.map(p => (
      <Quiz
        key={p._id}
        id={p._id}
        name={p.name}
        phoneNumber={p.phoneNumber}
        specialization={p.specialization}
        totalExperience={p.totalExperience}
        workingDays={p.workingDays}
        visitingHoursFrom={p.visitingHoursFrom}
        visitingHoursTo={p.visitingHoursTo}
        onDelete={props.onDeleteQuiz}
      />
    ))}
  </section>
);

export default quizzes;