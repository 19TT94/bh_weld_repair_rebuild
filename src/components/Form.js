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
    }

    render() {
        const { name, email, message } = this.state;
      return (
        <form onSubmit={this.handleSubmit}>
          <p>
            <label>
              Your Name: <input type="text" name="name" value={name} onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              Your Email: <input type="email" name="email" value={email} onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              Message: <textarea name="message" value={message} onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
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
