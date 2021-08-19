import React, { Component } from 'react';
import Slider from 'react-slick';
// import { baseUrl } from "./config";
import styled from 'styled-components';

class FadeBg extends Component {
  width100 = {
    width: '100%',
  };

  render() {
    const settings = {
      arrows: false,
      autoplay: true,
      autoplaySpeed: 400,
      dots: true,
      fade: true,
      infinite: true,
      speed: 4000,
      variableWidth: true,
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div>
        <Slider {...settings}>
          <div style={this.width100}>
            <img src={require('../../assets/img/bg2.jpg')} />
          </div>
          <div style={this.width100}>
            <img src={require('../../assets/img/bg3.jpg')} />
          </div>
          <div style={this.width100}>
            <img src={require('../../assets/img/bg4.jpg')} />
          </div>
          <div style={this.width100}>
            <img src={require('../../assets/img/bg7.jpg')} />
          </div>
        </Slider>
      </div>
    );
  }
}

export default FadeBg;
