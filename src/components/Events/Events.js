import React from 'react';

import Event from './Event/Event';

import './Events.css';
//import Masonry from 'react-masonry-component';

const generateRandomImg = (event) => {
  return "/images/" + (Math.floor(Math.random() * (+100 + 1 - +1)) + +1) + ".jpg";
};

//let imageSourceLoc = "/images/" + (Math.floor(Math.random() * (+100 + 1 - +1)) + +1) + ".jpg";

// const masonryOptions = {
//   transitionDuration: 0
// };

// const imagesLoadedOptions = { background: '.my-bg-image-el' };

// const childElements = props => props.events.map(function(element){
//   return (
//        <li className="image-element-class">
//            <img src={imageSourceLoc} />
//        </li>
//    );
// });

const events = props => (
  <section className="card-section">
    {/* <Masonry
      className={'my-gallery-class'} // default ''
      elementType={'ul'} // default 'div'
      options={masonryOptions} // default {}
      disableImagesLoaded={false} // default false
      updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
      imagesLoadedOptions={imagesLoadedOptions} // default {}
    >
      {childElements}
    </Masonry> */}
    {props.events.map(p => (
      <Event
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
        imageSourceLoc={"/images/" + (Math.floor(Math.random() * (+100 + 1 - +1)) + +1) + ".jpg"}//{event => this.generateRandomImg(event)}//{imageSourceLoc}
        // childElements={childElements}
        onDelete={props.onDeleteEvent}
      />
    ))}
  </section>
);

export default events;