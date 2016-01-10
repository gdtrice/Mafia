define([
    "underscore",
    "react",
    "models/player"
],
function (
    _,
    React,
    PlayerModel
    ) {
    return React.createClass({
        IMAGES: [
            "https://pbs.twimg.com/profile_images/378800000189727654/ab49635c2ea63d32c066c899e21fa8ce_400x400.jpeg",
            "http://i2.wp.com/masetv.com/wp-content/uploads/2013/12/sway-aint-got-the-answers.jpg",
            "http://weknowmemes.com/wp-content/uploads/2012/06/i-feel-it.jpg",
            "http://static.comicvine.com/uploads/original/5/50639/3377081-walter+white.jpg",
            "http://www.adweek.com/files/blogs/old-spice-terry-crews-brain-explodes.jpg",
            "http://s3.jspenguin.org/dodgeball_fran.jpeg",
            "http://i0.kym-cdn.com/photos/images/facebook/000/017/382/1250991947631.jpg",
            "http://static4.businessinsider.com/image/55918a4b6da811695ab77f22-480/rtx1gzco.jpg",
            "https://dantefw.files.wordpress.com/2014/07/top-funny-memes-06.jpg",
        ],

        createPlayer: function(e) {
            e.preventDefault();

            var picture = _.sample(this.IMAGES); 
            var username = React.findDOMNode(this.refs.username).value.trim();

            if (username.length > 25) {
                alert('Username must be less than 25 characters!');
                return;
            };

            var currentPlayer = new PlayerModel({username: username, picture: picture});
            this.props.onPlayerCreated(currentPlayer);
        },

        render: function() {
            return (
                <div>
                    Name: <input type="text" placeholder="enter your name..." ref="username" />
                    <input className="btn btn-default" type="button" value="Go" onClick={this.createPlayer} />
                </div>
            );
        }
    });
});

