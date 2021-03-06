import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';
import './Header.css';
import Title from './Title.js';
import Note from './Note.js';

class Main extends Component {
  constructor(props) {
		super(props);
		this.state = {
			wasLoaded: false
		};
    this.top = 0;
    this.topBefore = 0;
	}
  
  componentDidMount = () => {
     	this.setState({wasLoaded: !this.state.wasLoaded});
      const winWidth = window.innerWidth;
      this.top = winWidth > 950 ? 150 : (winWidth > 550 ? 100 : 70);
      this.topBefore = winWidth > 950 ? 100 : (winWidth > 550 ? 80 : 60);
	}
  
  render() {
    return (
      <div className="Main">
        <Title initialAnimation={this.props.initialAnimation} inView={this.props.inView}></Title>
        <Note initialAnimation={this.props.initialAnimation} inView={this.props.inView}></Note>
        <Motion style={{
            opacity: spring(this.state.wasLoaded ? 1 : 0),
            top: spring(this.state.wasLoaded ? this.top : this.topBefore),
            right: spring(this.props.initialAnimation ? -8 : (this.props.inView ? -8 : 5)),
            time: spring(this.props.initialAnimation ? 1 : 0),
           }}>
           {({opacity, top, right, time}) =>
           <div className='NoteBackground' style={{
                  opacity: `${opacity}`,
                  right: `${right}vw`,
                  top: `${top}px`,
                  WebkitTransitionDuration: '0.5s',
                  transitionDuration: '0.5s',
                  WebkitTransitionTimingFunction: 'ease-out',
                  transitionTimingFunction: 'ease-out',
                  WebkitTransitionDelay: `${time}s`,
                  transitionDelay: `${time}s`,
                }}></div>
         }
        </Motion>
      </div>
    );
  }
}

export default Main;