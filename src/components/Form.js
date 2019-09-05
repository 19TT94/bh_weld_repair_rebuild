import React from 'react';
import styled from 'styled-components';
import Mail from './resources/mail.js';

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
            <FormWrapper>
                <Title>Get in touch.</Title>

                <Input
                    name="name"
                    value={this.state.name}
                    onChange={(e) => this.handleNameChange(e)}
                    placeholder="Name" />

                <Input
                    name="email"
                    value={this.state.email}
                    onChange={(e) => this.handleEmailChange(e)}
                    placeholder="Email" />

                <Blob
                    name="message"
                    value={this.state.message}
                    onChange={(e) => this.handleMessageChange(e)}
                    placeholder="Message" />


                <Submit type="button" onClick={this.submitInquiry}>Submit</Submit>
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

    submitInquiry() {
        console.log(this.state.name, this.state.email, this.state.message);
        if (this.state.name && this.state.email && this.state.message) {
            Mail(this.state.name, this.state.email, this.state.message);
        }
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
`;

const Input = styled.input`
    width: 50%;
    margin: 10px 10px 5px;
`;

const Blob = styled.textarea`
    width: 50%;
    margin: 10px 10px 5px;
`;

const Submit = styled.button`
    color: #fff;
    padding: 5px 10px;
    margin: 10px;
    border: 1px solid #fff;
    max-width: 100px;
    transition: all ease 0.5s;

    &:hover {
        background: #fff;
        color: #000;
    }
`;

export default Form;
