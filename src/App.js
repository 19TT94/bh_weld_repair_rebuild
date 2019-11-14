import React from 'react';
import './App.scss';
import Grid from './components/Grid.js';
import Form from './components/Form.js';
import styled from 'styled-components';

function App() {
  return (
    <AppWrapper>
      <Phone href="tel:8052866147">805.286.6147</Phone>
      <header className="App-header">
        <Image src={require('./assets/images/logo.png')} />
        <Banner />
        <Bike src={require('./assets/images/bike.png')} />
        <Bar>
            <Header>S.L.O. Based Building Solutions <span>by Brian Hamm</span></Header>
            <Description>
              Based in beautiful San Luis Obispo California, I provide all your custom welding, fabrication, and reparation services. Whether you need a new gate for your trailer or a fully restored custom motorcycle, I am here for you. Looking forward to your business!
            </Description>
        </Bar>
      </header>

      <Grid />

      <Form />

      <Footer>
        &copy; Brian Hamm 2019
      </Footer>

    </AppWrapper>
  );
}

const Phone = styled.a`
    position: absolute;
    top: 0;
    right: 0;
    padding: 20px;
    color: #553739;
`;

const AppWrapper = styled.div`
    min-height: 100vh;
`;

const Image = styled.img`
    margin-top: 50px;
    width: 50%;

    @media screen and (min-width: 767px) {
        width: 30%;
    }
`;

const Banner = styled.div`
    width: 100%;
    height: 100px;
    position: relative;
    padding-top: $pad*3;
    overflow: hidden;

    &:before {
        content: '';
        position: absolute;
        top: 10px;
        left: 10px;
        width: 200px;
        height: 200px;
        background: #A85751;
        border-radius: 50%;
        margin: 10px;
        box-shadow: 10px 8px 10px rgba(0,0,0,0.5);
        z-index: 2;

        @media screen and (min-width: 767px) {
            top: -10px;
            left: 40px;
            width: 300px;
            height: 300px;
        }
    }

    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 25px;
        background: #553739;
        margin: 10px 0;
        box-shadow: 0 0 15px rgba(0,0,0,0.5);
        z-index: 3;
        overflow: hidden;
    }
`;

const Bike = styled.img`
    width: 50%;
    position: absolute;
    top: 15%;
    right: 0;
    z-index: 4;

    @media screen and (min-width: 767px) {
        width: 25%;
        top: 20%;
    }
`;

const Bar = styled.div`
    background: #232020;
    width: 100%;
    box-shadow: 0 0 15px rgba(0,0,0,0.8);
`;

const Header = styled.h1`
    font-size: 35px;
    padding: 10px;
    margin: 40px auto 5px;
    max-width: 900px;
    color: #fff;

    span {
        font-size: 12px;
    }
`;

const Description = styled.p`
    font-size: 14px;
    line-height: 1.5;
    color: #fff;
    position: relative;
    width: 100%;
    padding: 10px;
    margin: 5px auto 40px;
    max-width: 900px;
`;

const Footer = styled.div`
    background: #232020;
    width: 100%;
    padding: 20px;
    color: #fff;
    font-size: 10px;
`;

export default App;
