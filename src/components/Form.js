import React from 'react';
import styled from 'styled-components';
import Mail from './resources/mail.js';

const axios = require('axios');

const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  }

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            messasge: ''
        };
        // Data Binding
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.submitInquiry = this.submitInquiry.bind(this);
    }

    render() {
        return (
            <FormWrapper onSubmit={(e) => this.submitInquiry(e)} name="inquiries" netlify="true" netlify-honeypot="bot-field">
                <Title>Get in touch.</Title>

                <Input name="inquiries" type="hidden" />

                <Input
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={(e) => this.handleNameChange(e)}
                    placeholder="Name" />

                <Input
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={(e) => this.handleEmailChange(e)}
                    placeholder="Email" />

                <Blob
                    name="message"
                    type="text"
                    value={this.state.message}
                    onChange={(e) => this.handleMessageChange(e)}
                    placeholder="Message" />


                <Submit type="submit">Submit</Submit>
            </FormWrapper>
        );
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handleMessageChange(e) {
        this.setState({message: e.target.value});
    }

    submitInquiry(e) {
        fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "inquiries", ...this.state })
      })
        .then(() => alert("Success!"))
        .catch(error => alert(error));

      e.preventDefault();
    }
}

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    text-align: center;
    background: #553739;
    box-shadow: 0 0 15px rgba(0,0,0,0.5);
`;

const Title = styled.h1`
    color: #fff;
    font-size: 35px;
    padding: 40px 0 20px;
`;

const Input = styled.input`
    width: 90%;
    min-height: 25px;
    margin: 10px 10px 5px;

    @media screen and (min-width: 767px) {
        width: 50%;
    }
`;

const Blob = styled.textarea`
    width: 90%;
    min-height: 50px;
    margin: 10px 10px 5px;

    @media screen and (min-width: 767px) {
        width: 50%;
    }
`;

const Submit = styled.button`
    color: #fff;
    padding: 5px 10px;
    margin: 40px 10px;
    border: 1px solid #fff;
    max-width: 100px;
    transition: all ease 0.5s;

    &:hover {
        background: #fff;
        color: #000;
    }
`;

export default Form;
