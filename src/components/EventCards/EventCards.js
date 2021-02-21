import React from 'react';

import EventCard from './EventCard/EventCard';

import './EventCards.css';

const eventCards = props => (
  <section className="cards">
    {props.events.map(p => (
      <EventCard
        key={p._id}
        id={p._id}
        eventCreatedBy={p.eventCreatedBy}
        eventName={p.eventName}
        eventDate={p.eventDate}
        eventTime={p.eventTime}
        eventDuration={p.eventDuration}
        eventDescription={p.eventDescription}
        registeredUsers={p.registeredUsers}
        prizes={p.prizes}
        registeredTeams={p.registeredTeams}
        interestCode={p.interestCode}
        gameIndicator={p.gameIndicator}
        quizIndicator={p.quizIndicator}
        madePublicIndicator={p.madePublicIndicator}
        // onDelete={props.onDeleteProduct}
      />
    ))}
  </section>
);

export default eventCards;