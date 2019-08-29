import React from 'react';
import styled from 'styled-components';

class Form extends React.Component {
    render() {
        return (
            <FormWrapper>
                <Title>Get in touch.</Title>
                <Input placeholder="Name" />
                <Input placeholder="Email" />
                <Blob placeholder="Message" />
                <Submit onClick={this.submitInquiry()}>Submit</Submit>
            </FormWrapper>
        );
    }

    submitInquiry() {
        console.log("hi");
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
    width: 35%;
    margin: 10px 10px 5px;
`;

const Blob = styled.textarea`
    width: 35%;
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
