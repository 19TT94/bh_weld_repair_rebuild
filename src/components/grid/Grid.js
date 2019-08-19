import React from 'react';
import './Grid.scss';

class Grid extends React.Component {
    render() {
        return (
            <section className="grid">
                <div id="instagram" data-userid="" data-limit=""></div>
                <button onClick={activateLasers}>Load More</button>
                // <a href="#!" className="instagram__loadButton js-instagram__loadButton">Load More</a>
            </section>
        );
    }

    componentDidMount() {
        // ADD YOUR IG ACCESS TOKEN HERE (ig.token) CAN EASILY GET USING ~ http://instagram.pixelunion.net/
        let accessToken = "408299344.1677ed0.5a73bb001edb42eaa3eda42979b088e6";
        // let accessToken = "";
        // ADD YOUR USER ID HERE ~ THIS IS THE FIRST SECTION OF THE IG TOKEN EG. 1234567890
        let userID = "408299344";
        // THE AMMOUNT OF INSTAGRAM IMAGES YOU WANT TO DISPLAY
        let numPosts = "8"
        // THE AMMOUNT OF INSTAGRAM IMAGES YOU WANT TO ADD WITH EACH CLICK
        let rowLength = "4"

        jsInstagram(accessToken, userID, numPosts, rowLength);
    }
}

function jsInstagram(access_token, user_id, posts, rows) {
    let instagram = document.getElementById('instagram');
    if(access_token === '') {
        let placeholder = "<a class='instagram__placeholder'></a>".repeat(posts);
        instagram.insertAdjacentHTML('beforeend', placeholder);
    } else {
        instagram.setAttribute('data-userid', user_id);
        instagram.setAttribute('data-limit', posts);

        let ig = {};
        ig.token = access_token;

        ig.init = ()=> {
            let args = {};
            args.container = instagram;
            args.userid = args.container.getAttribute('data-userid');
            args.limit = args.container.getAttribute('data-limit');
            args.feedurl = 'https://api.instagram.com/v1/users/' + args.userid + '/media/recent/?access_token=' + ig.token + '&count=' + args.limit + '&callback=?';
            args.html = '';
            // PASS ARGS TO QUERY
            ig.query(args);
        }

    ig.query = (args)=> {
        getJSONP(args.feedurl, (data)=> {
            // PASS QUERY DATA TO BUILDER
            ig.build(data, args);
        });
    }

    ig.build = (data, args)=> {
        console.log(data.data);
        data.data.forEach((item, i)=> {
            let link = item.link || false;
            let likes = item.likes.count || false;
            let thumb = item.images.low_resolution.url;
            let img = item.images.standard_resolution.url;
            // get 1280 size photo [hack until avail in api]
            let hires = img.replace('s640x640', '1080x1080');
            args.html += '<a href="' + link + '" class="image" target="_blank" style="background-image: url(' + img + ');" data-img="' + hires + '">';
            if (likes) {
                args.html += '<span class="likes">'+likes+'</span>';
                args.html += '</a>';
            }
        })

        // PASS TO OUTPUT
        ig.output(args);
    }

    ig.output = (args)=> {
        instagram.insertAdjacentHTML('beforeend', args.html);
    }

    ig.view = {
      viewer: document.getElementsByClassName('igviewer'),
      image: document.getElementsByClassName('igviewer img'),
      open: function(img) {
          console.log(ig.view.viewer);
          ig.view.viewer.removeClass('hidden');
          ig.view.image.attr('src', img);
          console.log(ig.view.image);
      },
      close: function() {
          ig.view.viewer.addClass('hidden');
          ig.view.image.attr('src', '');
      }
    }

    ig.init();
  }
}

function getJSONP(url, success) {
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

export default Grid;
