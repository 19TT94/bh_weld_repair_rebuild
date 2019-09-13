import React from 'react';
import styled from 'styled-components';

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
        this.handleChange = this.handleChange.bind(this);
        this.submitInquiry = this.submitInquiry.bind(this);
    }

    render() {
        return (
            <FormWrapper
                name="inquiries"
                method="POST"
                onSubmit={this.submitInquiry}
                data-netlify="true"
                data-netlify-honeypot="bot-field">
                <Title>Get in touch.</Title>

                <Input type="hidden" id="bot-field" name="bot-field" />
                <Input type="hidden" name="form-name" value="inquires" />

                <Input
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder="Name" />

                <Input
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder="Email" />

                <Blob
                    name="message"
                    type="text"
                    value={this.state.message}
                    onChange={this.handleChange}
                    placeholder="Message" />


                <Submit type="submit">Submit</Submit>
            </FormWrapper>
        );
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value });

    submitInquiry = e => {
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ 'form-name': 'inquiries', ...this.state }),
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            throw error;
        });
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
    font-size: 14px;
    min-height: 25px;
    margin: 10px 10px 5px;

    @media screen and (min-width: 767px) {
        width: 50%;
    }
`;

const Blob = styled.textarea`
    width: 90%;
    font-size: 14px;
    min-height: 50px;
    margin: 10px 10px 5px;

    @media screen and (min-width: 767px) {
        width: 50%;
    }
`;

const Submit = styled.button`
    color: #fff;
    font-size: 14px;
    max-width: 150px;
    padding: 5px 10px;
    margin: 40px 10px;
    border: 1px solid #fff;

    transition: all ease 0.5s;

    &:hover {
        background: #fff;
        color: #000;
    }
`;

export default Form;
