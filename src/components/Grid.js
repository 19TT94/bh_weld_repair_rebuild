import React from 'react';
import styled from 'styled-components';

// IMAGES
import Texture from '../assets/images/texture.png';

class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // ADD YOUR IG ACCESS TOKEN HERE (ig.token) CAN EASILY GET USING ~ http://instagram.pixelunion.net/
            access_token: "14441723451.1677ed0.e649f4f05271442b8b68fe27ca986a34",
            user_id: "14441723451",
            num_posts: "6",
            instagram: null,
            loaded: false
        };
        // Data Binding
        this.jsInstagram = this.jsInstagram.bind(this);
        this.getJSONP = this.getJSONP.bind(this);
    }

    render() {
        if (!this.state.loaded) return null;
        return (
            <GridWrapper data-userid={this.state.user_id} data-limit={this.state.num_posts}>
                {this.state.instagram.data.map((post, index)=> {
                    let imageStyle = {
                        backgroundImage: 'url(' + post.images.standard_resolution.url + ')'
                    }

                    return (
                        <Item key={index}>
                            <Image style={imageStyle}></Image>
                        </Item>
                    )
                })}

                <Button href="https://instagram.com/bh_weld_repair_rebuild" target="_blank">See All</Button>

            </GridWrapper>
        );
    }

    componentDidMount() {
        this.jsInstagram();
    }

    jsInstagram() {
        let url = 'https://api.instagram.com/v1/users/' + this.state.user_id + '/media/recent/?access_token=' + this.state.access_token + '&count=' + this.state.num_posts + '&callback=?';

        this.getJSONP(url, (data)=> {
            this.setState({
                loaded: true,
                instagram: data
            });
        });
    }

    getJSONP(url, success) {
        let ud = '_' + + new Date(),
            script = document.createElement('script'),
            head = document.getElementsByTagName('head')[0]
                   || document.documentElement;

        window[ud] = function(data) {
            head.removeChild(script);
            success && success(data);
        };

        script.src = url.replace('callback=?', 'callback=' + ud);
        head.appendChild(script);
    }
}

const GridWrapper = styled.section`
    padding: 5%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    background-image: url(${Texture});
    background-repeat: repeat;
`;

const Item = styled.div`
    width: 50%;
    padding: 10px;

    @media screen and (min-width: 767px) {
        width: 33.33%;
    }
`;

const Image = styled.div`
    display: inline-block;
    width: 100%;
    height: 150px;
    overflow: hidden;
    position: relative;
    background-size: cover;
    background-position: center;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.5);

    @media screen and (min-width: 767px) {
        height: 300px;
    }

    &:after {
        display: none;
    }

    &:hover {
        cursor: pointer;
        transform: scale(1.02);
        transition: all ease-in-out 0.5s;
    }
`;

const Button = styled.a`
    color: #000;
    font-size: 14px;
    min-width: 125px;
    padding: 5px 15px;
    text-align: center;
    margin: 40px auto 10px;
    border: 1px solid #000;
    transition: all ease 0.5s;

    &:hover {
        background: #000;
        color: #fff;
    }
`;

export default Grid;
