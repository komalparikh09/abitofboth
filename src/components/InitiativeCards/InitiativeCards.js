import React from 'react';

import InitiativeCard from './InitiativeCard/InitiativeCard';

import './InitiativeCards.css';

const initiativeCards = props => (
  <section className="cards">
    {props.initiatives.map(p => (
      <InitiativeCard
        key={p._id}
        id={p._id}
        initiativeName={p.initiativeName}
        initiativeCreatedBy={p.initiativeCreatedBy}
        initiativeType={p.initiativeType}
        initiativeDescription={p.initiativeDescription}
        initiativeDuration={p.initiativeDuration}
        paidIndicator={p.paidIndicator}
        chargecodeIndicator={p.chargecodeIndicator}
        // onDelete={props.onDeleteProduct}
      />
    ))}
  </section>
);

export default initiativeCards;