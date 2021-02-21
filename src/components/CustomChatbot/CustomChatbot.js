import React, { Component } from 'react';
import 'react-dom';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import PropTypes from 'prop-types';
import { Chocolate, Planet, File, Ghost, IceCream, Backpack, Cat, KawaiiMood } from 'react-kawaii';
import './CustomChatbot.css';

class KawaiiRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            result: '',
            trigger: false,
        };
        this.triggerNext = this.triggerNext.bind(this);
    }
    triggerNext() {
        this.setState({ trigger: true }, () => {
            this.props.triggerNextStep();
        });
    }
    render() {
        const { trigger, loading, result } = this.state;
        return (<div className="bgDiv">
            <button className="kawaii-bot-emojis" onClick={() => this.triggerNext()}><File size={100} mood="ko" color="#FFFA8C" /></button>
            <button className="kawaii-bot-emojis" onClick={() => this.triggerNext()}><Planet size={100} mood="sad" color="#83D1FB" eyes="blink" /></button>
            <button className="kawaii-bot-emojis" onClick={() => this.triggerNext()}><Cat size={100} mood="happy" color="#596881" /></button>
            <button className="kawaii-bot-emojis" onClick={() => this.triggerNext()}><Chocolate size={100} mood="blissful" color="#fc105c" /></button>
            <button className="kawaii-bot-emojis" onClick={() => this.triggerNext()}><Backpack size={100} mood="excited" color="#CD853F" /></button>
            <button className="kawaii-bot-emojis" onClick={() => this.triggerNext()}><Ghost size={100} mood="shocked" color="#E0E4E8" /></button>
            <button className="kawaii-bot-emojis" onClick={() => this.triggerNext()}><IceCream size={100} mood="lovestruck" color="#FDA7DC" /></button>
        </div>
        );
    }
}

KawaiiRating.propTypes = {
    steps: PropTypes.object,
    triggerNextStep: PropTypes.func,
};
KawaiiRating.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
};

function CustomChatbot(props) {
    const theme = {
        background: '#f6f6f6',
        fontFamily: 'Arial, Helvetica, sans-serif',
        headerBgColor: '#86bc25',
        headerFontColor: '#f6f6f6',
        headerFontSize: '15px',
        botBubbleColor: '#86bc25',
        botFontColor: '#f6f6f6',
        userBubbleColor: '#4a4a4a',
        userFontColor: '#f6f6f6',
    };
    const config = {
        width: "480px",
        height: "550px",
        floating: true,
        color: "black"
    };
    const steps = [

        {
            id: "1",
            message: "Hello, this is a prompt message as you just completed WinC - Girl, Hack It 2020.",
            trigger: "3"
        },
        // {
        //     id: "2",
        //     message: "Please fill out this short survey.",
        //     trigger: "3"
        // },
        {
            id: "3",
            message: "Please rate the user experience with the portal:",
            trigger: "4"
        },
        {
            id: "4",
            options: [
                { value: 1, label: 'Could be better', trigger: '5' },
                { value: 2, label: 'Not satisfied', trigger: '5' },
                { value: 3, label: 'Loved it!', trigger: '6' },
                // { value: 4, label: 'I cannot wait for another one', trigger: '7' },
            ],
        },
        {
            id: "5",
            message: "Oops! Hope you enjoy the next event hosted by WinC. Happy coding!",
            trigger: "7"
        },
        {
            id: "6",
            message: "Looks like you had a lot of fun. Stay tuned for more similar events!",
            trigger: "7"
        },
        {
            id: "ThankYou",
            message: "Thank you for your time. Have a great day!",
            end: true
        },
        {
            id: "7",
            message: "Please select the reaction which best matches your experience with WinC - Girl, Hack It 2020:",
            trigger: "KawaiiRating"
        },
        {
            id: 'KawaiiRating',
            component: <KawaiiRating />,
            waitAction: true,
            trigger: '9',
        },
        // {
        //     id: "8",
        //     options: [
        //         { value: 1, label: <File size={100} mood="ko" color="#FFFA8C" text="Very Sad" className="kawaii-bot-emojis" />, trigger: '5' },
        //         { value: 2, label: <Planet size={100} mood="sad" color="#83D1FB" text="Sad" className="kawaii-bot-emojis" />, trigger: '5' },
        //         { value: 3, label: <Cat size={100} mood="happy" color="#596881" className="kawaii-bot-emojis" />, trigger: '6' },
        //         { value: 4, label: <Chocolate size={100} mood="blissful" color="#fc105c" className="kawaii-bot-emojis" />, trigger: '6' },
        //         { value: 5, label: <Backpack size={100} mood="excited" color="#CD853F" className="kawaii-bot-emojis" />, trigger: '6' },
        //         { value: 6, label: <Ghost size={100} mood="shocked" color="#E0E4E8" className="kawaii-bot-emojis" />, trigger: '6' },
        //         { value: 7, label: <IceCream size={100} mood="lovestruck" color="#FDA7DC" className="kawaii-bot-emojis" />, trigger: '9' }
        //     ],
        //     asMessage: true,
        //     placeholder: "Yayy!"
        // },
        {
            id: "9",
            message: "Would you like to share some feedback?",            
            trigger: "10"
        },
        {
            id: "10",
            options: [
                { value: 1, label: 'Sure, I\'ll do it', trigger: '11' },
                { value: 2, label: 'No, not now', trigger: 'ThankYou' }
            ]
        },
        {
            id: "11",
            message: "Please go ahead and type your response.",
            trigger: "12"
        },
        {
            id: "12",
            user: true,
            trigger: "13"
        },
        {
            id: "13",
            message: "Great to hear that. I'm sure the event organizer would love it.",
            trigger: "ThankYou"
        },

        // {
        //     id: "Greet",
        //     message: "Hello, Welcome to A Bit of Bot(h) hub!",
        //     trigger: "InterestPath"
        // },
        // {
        //     id: "InterestPath",
        //     message: "Please select your interest path: (any one)",
        //     trigger: "InterestPathOptions"
        // },
        // {
        //     id: "InterestPathOptions",
        //     options: [
        //         { value: 1, label: 'Art', trigger: 'SaveInterestPath' },
        //         { value: 2, label: 'Music', trigger: 'SaveInterestPath' },
        //         { value: 3, label: 'Dancing', trigger: 'SaveInterestPath' },
        //         { value: 4, label: 'Coding', trigger: 'SaveInterestPath' },
        //         { value: 5, label: 'Photography', trigger: 'SaveInterestPath' },
        //         { value: 6, label: 'Videography', trigger: 'SaveInterestPath' },
        //         { value: 7, label: 'Cinema', trigger: 'SaveInterestPath' },
        //         { value: 8, label: 'Gardening', trigger: 'SaveInterestPath' },
        //         { value: 9, label: 'Humor', trigger: 'SaveInterestPath' },
        //         { value: 10, label: 'Literature', trigger: 'SaveInterestPath' },
        //         { value: 11, label: 'Travel', trigger: 'SaveInterestPath' },
        //         { value: 12, label: 'Interior Designing', trigger: 'SaveInterestPath' },
        //         { value: 13, label: 'Fashion Designing', trigger: 'SaveInterestPath' },
        //         { value: 14, label: 'Sports', trigger: 'SaveInterestPath' },
        //         { value: 15, label: 'Yoga', trigger: 'SaveInterestPath' },
        //         { value: 12, label: 'Writing', trigger: 'SaveInterestPath' },
        //         { value: 13, label: 'Cooking', trigger: 'SaveInterestPath' },
        //         { value: 14, label: 'Swimming', trigger: 'SaveInterestPath' },
        //         { value: 15, label: 'Cycling', trigger: 'SaveInterestPath' },
        //         { value: 16, label: 'Walking', trigger: 'SaveInterestPath' },
        //         { value: 17, label: 'Running', trigger: 'SaveInterestPath' },
        //         { value: 18, label: 'Bee Keeping', trigger: 'SaveInterestPath' },
        //         { value: 19, label: 'Wine Tasting', trigger: 'SaveInterestPath' },
        //     ],
        // },
        // {
        //     id: "SaveInterestPath",
        //     message: "Okay!",
        //     trigger: "Event"
        // },
        // {
        //     id: "Event",
        //     message: "Are you interested in participating in the upcoming event?",
        //     trigger: "SendEventURL"
        // },
        // {
        //     id: "SendEventURL",
        //     component: (
        //         <div style={{backgroundColor: "#86bc25", borderRadius: "5"}}><a href="/events" target="_blank">Check out the event!</a> </div>
        //     ),
        //     trigger: "InterestedInEventOptions"
        // },
        // {
        //     id: "InterestedInEventOptions",
        //     options: [
        //         { value: 1, label: 'Yes', trigger: 'NavigateToEvent' },
        //         { value: 2, label: 'No', trigger: 'ThankYou' }
        //     ]
        // },
        // {
        //     id: "NavigateToEvent",
        //     message: "Awesome! Let's go!",
        //     end: true
        // },
        // {
        //     id: "ThankYou",
        //     message: "Thank you for your time. Have a great day!",
        //     end: true
        // },
    ];
    return <ThemeProvider theme={theme}><ChatBot userAvatar={"./../../images/30.jpg"} speechSynthesis={{ enable: true, lang: 'en', voice: null }} recognitionEnable={true} headerTitle="Chat with A Bit of Bot(h)!" steps={steps} {...config} /></ThemeProvider>;
}

export default CustomChatbot;