import React from 'react';

import Initiative from './Initiative/Initiative';

import './Initiatives.css';

const initiatives = props => (
  <section className="card-section">
    {props.initiatives.map(p => (
      <Initiative
        key={p._id}
        id={p._id}
        initiativeName={p.initiativeName}
        initiativeCreatedBy={p.initiativeCreatedBy}
        initiativeType={p.initiativeType}
        initiativeDescription={p.initiativeDescription}
        initiativeDuration={p.initiativeDuration}
        paidIndicator={p.paidIndicator}
        chargecodeIndicator={p.chargecodeIndicator}
        onDelete={props.onDeleteInitiative}
      />
    ))}
  </section>
);

export default initiatives;