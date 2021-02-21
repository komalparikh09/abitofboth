import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './ABoBHome.css';
import '../../../src/elements.css';
import '../../util.js';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ReactTypingEffect from 'react-typing-effect';
// import Slider from 'react-animated-slider';
// import 'react-animated-slider/build/horizontal.css';
// import SliderCarousel from './../../components/SliderCarousel/SliderCarousel';
// import './../../components/SliderCarousel/SliderCarousel.css';
// import AnimatedSlider from './../../components/AnimatedSlider/AnimatedSlider';
// import './../../components/AnimatedSlider/AnimatedSlider.scss';
// import Input from '../../components/Input/Input';
// import Button from '../../components/Button/Button';
// import $ from 'jquery';
import { Parallax, Background } from 'react-parallax';
import AwesomeSlider from 'react-awesome-slider';
// import withCaption from 'react-awesome-slider/dist/captioned';
import 'react-awesome-slider/dist/styles.css';
// import 'react-awesome-slider/dist/captioned.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
// import 'react-awesome-slider/src/hoc/captioned-images/index';
// import { Provider, Link, withNavigationContext, withNavigationHandlers } from "react-awesome-slider/dist/navigation";
//import { ParallaxMap } from 'react-parallax-map';
//import ATVParallax from 'react-atv-parallax';
//import ChatBot from 'react-simple-chatbot';
import CustomChatbot from '../../components/CustomChatbot/CustomChatbot';
import Plx from 'react-plx';
import SpringyParallax from 'react-springy-parallax';



// const awesomeSlider = (
//   <AwesomeSlider>
//     <div>1</div>
//     <div>2</div>
//     <div>3</div>
//     <div>4</div>
//   </AwesomeSlider>
// );

const AutoplaySlider = withAutoplay(AwesomeSlider);
const awesomeCubeSlider = (
  <AutoplaySlider animation="cubeAnimation" play={true} cancelOnInteraction={false} interval={3000}>
    <div className="divImage" data-src="/images/1.jpg">
      <Link to={'/memories'}><p className="legend divLinkP">Memories</p></Link>
    </div>
    <div className="divImage" data-src="/images/2.jpg">
      <Link to={'/memories'}><p className="legend divLinkP">Memories</p></Link>
    </div>
    <div className="divImage" data-src="/images/3.jpg">
      <Link to={'/memories'}><p className="legend divLinkP">Memories</p></Link>
    </div>
    <div className="divImage" data-src="/images/4.jpg">
      <Link to={'/memories'}><p className="legend divLinkP">Memories</p></Link>
    </div>
    <div className="divImage" data-src="/images/5.jpg">
      <Link to={'/memories'}><p className="legend divLinkP">Memories</p></Link>
    </div>
    <div className="divImage" data-src="/images/6.jpg">
      <Link to={'/memories'}><p className="legend divLinkP">Memories</p></Link>
    </div>
  </AutoplaySlider>
);

// const CaptionedSlider = withCaption(AwesomeSlider);

// const captionedSlider = (
//   <CaptionedSlider
//     screens={[
//       {
//         backgroundColor: '#4a9c8c',
//         media: '/images/series/ricknmorty-3.png',
//         caption: 'I want to see what you got.',
//       },
//       {
//         backgroundColor: '#4a9c8c',
//         media: '/images/series/ricknmorty-3.png',
//         caption: "The answer is -- Don't think about it.",
//       },
//     ]}
//   />
// );

class ABoBHomePage extends Component {
  state = {
    isLoading: true,
    name: '',
    phoneNumber: '',
    specialization: '',
    totalExperience: '',
    workingDays: '',
    visitingHoursFrom: '',
    visitingHoursTo: ''
  };

  componentDidMount() {
    // Will be "edit" or "add"
    if (this.props.match.params.mode === 'edit') {
      axios
        .get('http://localhost:3100/doctors/' + this.props.match.params.id)
        .then(doctorResponse => {
          const doctor = doctorResponse.data;
          this.setState({
            isLoading: false,
            name: doctor.name,
            phoneNumber: doctor.phoneNumber,
            specialization: doctor.specialization,
            totalExperience: doctor.totalExperience,
            workingDays: doctor.workingDays,
            visitingHoursFrom: doctor.visitingHoursFrom,
            visitingHoursTo: doctor.visitingHoursTo
          });
        })
        .catch(err => {
          this.setState({ isLoading: false });
          console.log(err);
        });
    } else {
      this.setState({ isLoading: false });
    }
  }

  inputChangeHandler = (event, input) => {
    this.setState({ [input]: event.target.value });
  };

  navigateToDoctor = event => {
    this.setState({ isLoading: false });
    this.props.history.replace('/doctordashboard');
    // let request;
    // request = axios.get('http://localhost:3100/doctors');
    // request
    //   .then(result => {
    //     this.setState({ isLoading: false });
    //     this.props.history.replace('/doctors');
    //   })
    //   .catch(err => {
    //     this.setState({ isLoading: false });
    //     console.log(err);
    //     this.props.onError(
    //       'Navigating to the doctor details screen failed. Please try again later'
    //     );
    //   });
  };

  navigateToPatient = event => {
    let request;
    request = axios.get('http://localhost:3100/patients');
    request
      .then(result => {
        this.setState({ isLoading: false });
        this.props.history.replace('/patients');
      })
      .catch(err => {
        this.setState({ isLoading: false });
        //console.log(err);
        const errData = {
          message: err.message,
        };
        let err_request;
        err_request = axios.post('http://localhost:3100/errorlog', errData);
        err_request
          .then(err_result => {
            this.setState({ isLoading: false });
            this.props.onError(err_result.message);
            return;
          });
        this.props.onError(
          'Navigating to the patient details screen failed. Please try again later'
        );
      });
  };

  navigateToRegisterNewDoctor = event => {
    this.setState({ isLoading: false });
    this.props.history.replace('/doctor/add');
  };

  navigateToBookNewAppointment = event => {
    this.setState({ isLoading: false });
    this.props.history.replace('/appointment');
  };

  render() {
    // const slides = [
    //   { title: 'First item', description: 'Lorem ipsum', button: "View More", image: 'https://s27389.pcdn.co/wp-content/uploads/2017/04/AdobeStock_100000042-2-1024x576.jpeg' },
    //   { title: 'Second item', description: 'Lorem ipsum', button: "View More", image: 'https://www.adweek.com/wp-content/uploads/2018/06/internet-speeds-CONTENT-2018-600x315.gif' }
    // ];
    // var homeCarousel = (
    //   <article className="carousel-card">
    //     <div className="carousel-card-element">
    //       <Carousel showArrows={true} showThumbs={false}>
    //         {/* onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}> */}
    //         <div className="carousel-element">
    //           <img src="https://s27389.pcdn.co/wp-content/uploads/2017/04/AdobeStock_100000042-2-1024x576.jpeg" />
    //           <Link to={'/events'}><p className="legend">Events</p></Link>
    //         </div>
    //         <div className="carousel-element">
    //           <img src="https://www.orfonline.org/wp-content/uploads/2019/06/Heart_Rate_Digital_Getty.jpg" />
    //           <Link to={'/games'}><p className="legend">Games</p></Link>
    //         </div>
    //         <div className="carousel-element">
    //           <img src="https://www.manatt.com/Manatt/media/Media/Images/Jumbotron/media_smart_TV_concept.jpg?ext=.jpg" />
    //           <Link to={'/quizzes'}><p className="legend">Quizzes</p></Link>
    //         </div>
    //         <div className="carousel-element">
    //           <img src="https://www.pmc.gov.au/sites/default/files/styles/news_centre_content_page_hero_image/public/media-release/digital-tech-taskforce-hero.jpg?itok=AZaJCF6e" />
    //           <Link to={'/initiatives'}><p className="legend">Initiatives</p></Link>
    //         </div>
    //         <div className="carousel-element">
    //           <img src="https://609200810204-drupal-cms-production.s3.eu-west-2.amazonaws.com/drupal-icbs/public/styles/focalpoint_5x3_960/public/2019-08/Data_1.jpg?ZQpz1GXezoiCMlAkAMQVxYtybEHzxZbb&h=aa81dfca&itok=c_cPINrh" />
    //           <Link to={'/posts'}><p className="legend">Posts</p></Link>
    //         </div>
    //         <div className="carousel-element">
    //           <img src="https://www.adweek.com/wp-content/uploads/2018/06/internet-speeds-CONTENT-2018-600x315.gif" />
    //           <Link to={'/memories'}><p className="legend">Memories</p></Link>
    //         </div>
    //       </Carousel>
    //     </div>
    //   </article>
    // );
    // let layerData = [
    //   {
    //     start: 0,
    //     end: 1000,
    //     beginX: 0,
    //     beginY: 0,
    //     x: 0,
    //     y: -400,
    //     radius: 500,
    //     direction: true,
    //     angle: -100,
    //     step: 0.15
    //   },
    //   {
    //     start: 1000,
    //     end: 2500,
    //     beginX: -537,
    //     beginY: -682,
    //     x: -2000,
    //     y: -700,
    //     radius: 500,
    //     direction: false,
    //     angle: -280,
    //     step: 0.15
    //   }
    // ];
    // const steps = [
    //   {
    //     id: '0',
    //     message: 'Welcome to react chatbot!',
    //     trigger: '1',
    //   },
    //   {
    //     id: '1',
    //     message: 'Bye!',
    //     end: true,
    //   },
    // ];

    // An array of parallax effects to be applied - see below for detail
    // const parallaxData = [
    //   {
    //     start: 0,
    //     end: 500,
    //     properties: [
    //       {
    //         startValue: 1,
    //         endValue: 2,
    //         property: 'scale',
    //       },
    //     ],
    //   },
    // ];
    // const parallaxData = [
    //   {
    //     start: 0,
    //     end: 300,
    //     properties: [
    //       {
    //         startValue: 0,
    //         endValue: 90,
    //         property: "rotate"
    //       },
    //       {
    //         startValue: 1,
    //         endValue: 1.5,
    //         property: "scale"
    //       },
    //       {
    //         startValue: 1,
    //         endValue: 0.75,
    //         property: "opacity"
    //       }
    //     ]
    //   },
    //   {
    //     start: 350,
    //     duration: 300,
    //     properties: [
    //       {
    //         startValue: "#3cb99c",
    //         endValue: "rgba(50,50,200,0.8)",
    //         property: "backgroundColor"
    //       },
    //       {
    //         startValue: 0,
    //         endValue: 100,
    //         property: "translateY"
    //       },
    //       {
    //         startValue: 0.75,
    //         endValue: 1,
    //         property: "opacity"
    //       }
    //     ]
    //   },
    //   {
    //     start: 700,
    //     duration: 1000,
    //     properties: [
    //       {
    //         startValue: 100,
    //         endValue: 0,
    //         property: "translateY"
    //       },
    //       {
    //         startValue: 1.5,
    //         endValue: 2,
    //         property: "scale"
    //       },
    //       {
    //         startValue: 90,
    //         endValue: 0,
    //         property: "rotate"
    //       },
    //       // Blur is not performant
    //       // Used just as an example for CSS filters
    //       {
    //         startValue: 0,
    //         endValue: 20,
    //         property: "blur"
    //       }
    //     ]
    //   }
    // ];
    let content = (
      <div>
        {/* <h2>A Bit of Bot(h) Hub</h2> */}
        {/* {homeCarousel} */}
        {/* {captionedSlider} */}
        {/* {awesomeSlider} */}
        {/* <UIParalaxMap
          map={layerData}
          currentScroll={this.state.scrollTop}
          layerClassName="test-layer-bg"
          layerZIndex={0}
        /> */}

        <Parallax
          blur={5}
          bgImage={require('./../../images/7.jpg')}
          bgImageAlt="Image"
          strength={200}>
          <div className="parallaxTyping">
            <ReactTypingEffect
              text={["Your network is your net worth.", "Welcome to A Bit of Bot(h) hub!"]}
              cursorRenderer={cursor => <h2>{cursor}</h2>}
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
              displayTextRenderer={(text, i) => {
                return (
                  <h2>
                    {text.split('').map((char, i) => {
                      const key = `${i}`;
                      return (
                        <span
                          key={key}
                          style={{ color: '#86bc25' }}>{char}</span>
                      );
                    })}
                  </h2>
                );
              }}
            />
          </div>
          <div className="homeSlider">
            {awesomeCubeSlider}
          </div>
          <div className="parallaxImg" />
        </Parallax>
        <Parallax
          blur={{ min: -15, max: 15 }}
          bgImage={require('./../../images/8.jpg')}
          bgImageAlt="Image"
          strength={-200}>
          <div className="parallaxImgText">"The currency of real networking is not greed, but generosity."</div>
          <div className="parallaxImg" />
        </Parallax>
        <Parallax
          blur={{ min: -15, max: 15 }}
          bgImage={require('./../../images/9.jpg')}
          bgImageAlt="Image"
          strength={-200}>
          <div className="parallaxImgText">"My Golden Rule of Networking is simple: Don't keep score."</div>
          <div className="parallaxImg" />
        </Parallax>
        <Parallax
          blur={{ min: -15, max: 15 }}
          bgImage={require('./../../images/10.jpg')}
          bgImageAlt="Image"
          strength={-200}>
          <div className="parallaxImgText">"Networking is marketing. Marketing yourself, marketing your uniqueness, marketing what you stand for."</div>
          <div className="parallaxImg" />
        </Parallax>
        <div>
          <CustomChatbot />
        </div>

        {/* <SpringyParallax ref='parallax' pages={3}>
          <SpringyParallax.Layer
            // Page offset, or where the layer will be at when scrolled to
            // 0 means start, 1 second page, 1.5 second and half, and so on ...
            offset={1}
            // Parallax factor, allows for positive and negative values
            // Shifts the layer up or down in accordance to its offset
            speed={0.5}>
            <span>
              <div style={{ backgroundColor: "pink", height: "300px"}}></div><div style={{ backgroundColor: "yellow", height: "400px"}}></div>
              <div style={{ backgroundColor: "blue", height: "300px"}}></div><div style={{ backgroundColor: "orange", height: "400px"}}></div>
            </span>
          </SpringyParallax.Layer>
        </SpringyParallax> */}

        {/* <Plx className='MyAwesomeParallax' parallaxData={parallaxData}>
          <div className="parallaxImgText">Sample Text</div>
          <br />
          <br />
          <div style={{ content: "url('./../../images/15.jpg')", height: "400px", width: "100%" }} />
        </Plx> */}

        {/* <ATVParallax style={{ width: 320, height: 190 }}>
          <img src='/images/12.jpg' />
          <img src='/images/13.jpg' />
          <div style={{ backgroundColor: "pink" }}>
            <span>Floating Title</span>
          </div>
        </ATVParallax> */}
        {/* <SliderCarousel />
        <br/>
        <br/>
        <AnimatedSlider />
        <br/>
        <br/> */}
        {/* <Slider>
          {slides.map((article, index) => <div key={index}
          style={{ background: `url('${article.image}') no-repeat` }}>
            <h2>{article.title}</h2>
            <div>{article.description}</div>
          </div>)}
        </Slider> */}
        {/* <Slider autoplay={3000}>
          {slides.map((item, index) => (
            <div
              key={index}
              style={{ background: `url('${item.image}') no-repeat center center` }} >
              <div className="center" style={{ alignSelf: "center"}}>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <button>{item.button}</button>
              </div>
            </div>
          ))}
        </Slider> */}
        {/* <table border="1" width="90%" style={{ borderCollapse: "collapse" }} cellSpacing="5" cellPadding="5">
          <colgroup>
            <col width="100%" />
          </colgroup>
          <tbody>
            <tr>
              <td style={{ textAlign: "center" }}>
                <table border="0" cellSpacing="0" cellPadding="0" width="100%">
                  <colgroup>
                    <col width="50%" />
                    <col width="50%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        <input type="button" id="btnUser" className="greenBtn" value="Users" onClick={this.navigateToDoctor} />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <input type="button" id="btnEvent" className="greenBtn" value="Events" onClick={this.navigateToPatient} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <br />
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        <input type="button" id="btnPost" className="greenBtn" value="Posts" onClick={this.navigateToRegisterNewDoctor} />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <input type="button" id="btnQuiz" className="greenBtn" value="Quizzes" onClick={this.navigateToBookNewAppointment} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <br />
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        <input type="button" id="btnInitiative" className="greenBtn" value="Initiatives" onClick={this.navigateToRegisterNewDoctor} />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <input type="button" id="btnBot" className="greenBtn" value="Talk to ABoB, the Bot" onClick={this.navigateToBookNewAppointment} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table> */}
      </div>
    );
    if (this.state.isLoading) {
      content = <p>Is loading...</p>;
    }
    return <main>{content}</main>;
  }
}

export default ABoBHomePage;