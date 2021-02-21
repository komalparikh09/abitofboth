import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './AnimatedSlider.scss';

class AnimatedSlider extends Component {
    constructor(props) {
      super(props);
      
      this.IMAGE_PARTS = 4;
      
      this.changeTO = null;
      this.AUTOCHANGE_TIME = 4000;
      
      this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
    }
    
    componentWillUnmount() {
      window.clearTimeout(this.changeTO);
    }
    
    componentDidMount() {
      this.runAutochangeTO();
      setTimeout(() => {
        this.setState({ activeSlide: 0, sliderReady: true });
      }, 0);
    }
    
    runAutochangeTO() {
      this.changeTO = setTimeout(() => {
        this.changeSlides(1);
        this.runAutochangeTO();
      }, this.AUTOCHANGE_TIME);
    }
    
    changeSlides(change) {
      window.clearTimeout(this.changeTO);
      const { length } = this.props.slides;
      const prevSlide = this.state.activeSlide;
      let activeSlide = prevSlide + change;
      if (activeSlide < 0) activeSlide = length - 1;
      if (activeSlide >= length) activeSlide = 0;
      this.setState({ activeSlide, prevSlide });
    }
    
    render() {
        // var slides = [
        //     { city: 'CityA', country: 'CountryA', img: 'https://www.pmc.gov.au/sites/default/files/styles/news_centre_content_page_hero_image/public/media-release/digital-tech-taskforce-hero.jpg?itok=AZaJCF6e' },
        //     { city: 'CityB', country: 'CountryB', img: 'https://609200810204-drupal-cms-production.s3.eu-west-2.amazonaws.com/drupal-icbs/public/styles/focalpoint_5x3_960/public/2019-08/Data_1.jpg?ZQpz1GXezoiCMlAkAMQVxYtybEHzxZbb&h=aa81dfca&itok=c_cPINrh' },
        //     { city: 'CityC', country: 'CountryC', img: 'https://www.adweek.com/wp-content/uploads/2018/06/internet-speeds-CONTENT-2018-600x315.gif' },
        //     { city: 'CityD', country: 'CountryD', img: 'https://www.orfonline.org/wp-content/uploads/2019/06/Heart_Rate_Digital_Getty.jpg' }
        // ];
      const { activeSlide, prevSlide, sliderReady } = this.state;
      return (
        <div className={classNames('slider', { 's--ready': sliderReady })}>
          <p className="slider__top-heading">Travelers</p>
          <div className="slider__slides">
            {this.props.slides.map((slide, index) => (
              <div
                className={classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index  })}
                key={slide.city}
                >
                <div className="slider__slide-content">
                  <h3 className="slider__slide-subheading">{slide.country || slide.city}</h3>
                  <h2 className="slider__slide-heading">
                    {slide.city.split('').map(l => <span>{l}</span>)}
                  </h2>
                  <p className="slider__slide-readmore">read more</p>
                </div>
                <div className="slider__slide-parts">
                  {[...Array(this.IMAGE_PARTS).fill()].map((x, i) => (
                    <div className="slider__slide-part" key={i}>
                      <div className="slider__slide-part-inner" style={{ backgroundImage: `url(${slide.img})` }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="slider__control" onClick={() => this.changeSlides(-1)} />
          <div className="slider__control slider__control--right" onClick={() => this.changeSlides(1)} />
        </div>
      );
    }
  }
  
  const slides = [
    {
      city: 'Paris',
      country: 'France',
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/paris.jpg',
    },
    {
      city: 'Singapore',
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg',
    },
    {
      city: 'Prague',
      country: 'Czech Republic',
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg',
    },
    {
      city: 'Amsterdam',
      country: 'Netherlands',
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/amsterdam.jpg',
    },
    {
      city: 'Moscow',
      country: 'Russia',
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg',
    },
  ];
  
//  ReactDOM.render(<AnimatedSlider slides={slides} />, document.querySelector('#root'));

export default AnimatedSlider;
  