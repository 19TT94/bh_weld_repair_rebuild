import React from 'react';
import './Grid.scss';
import styled from 'styled-components';

// IMAGES
import Texture from '../../assets/images/texture.png';

class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // ADD YOUR IG ACCESS TOKEN HERE (ig.token) CAN EASILY GET USING ~ http://instagram.pixelunion.net/
            access_token: "14441723451.1677ed0.e649f4f05271442b8b68fe27ca986a34",
            user_id: "14441723451",
            num_posts: "6",
            row_length: "4",
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
                    'background-image': 'url(' + post.images.standard_resolution.url + ')'
                }

                return (
                    <Item>
                        <Image style={imageStyle} key={index}></Image>
                    </Item>
                )
            })}

            </GridWrapper>
        );
    }

    componentDidMount() {
        this.jsInstagram();
    }

    jsInstagram() {
        let url = 'https://api.instagram.com/v1/users/' + this.state.user_id + '/media/recent/?access_token=' + this.state.access_token + '&count=' + this.state.num_posts + '&callback=?';

        this.getJSONP(url, (data)=> {
            console.log(data);
            this.setState({
                loaded: true,
                instagram: data
            });
        });
    }

    getJSONP(url, success) {
        let ud = '_' + +new Date,
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
    width: 33.33%;
    padding: 10px;
`;

const Image = styled.div`
    display: inline-block;
    width: 100%;
    height: 200px;
    overflow: hidden;
    position: relative;
    background-size: cover;
    background-position: center;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.5);

    &:after {
        display: none;
    }

    &:hover {
        transform: scale(1.02);
        transition: all ease-in-out 0.5s;
    }
`;

export default Grid;
