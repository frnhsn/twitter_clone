import { useState } from 'react';
import { Repeat, Heart } from 'react-feather';
import TweetService from '../../services/tweet.service.js';


const tweetSeparator = {
    borderTop: "1px solid var(--light)",
  };
const btnExtraSmall = {
    fontSize: "1em",
    width:"2rem",
    height:"2rem"
  };

function TweetDetailComponent(props) {
    // const [likeState, setLikeState] = useState(props.tweet.is_already_liked);
    // const [likeStyle, setLikeStyle] = useState(props.tweet.is_already_liked && 'btn-danger' || 'btn-light');
    // const [retweetState, setRetweetState] = useState(props.tweet.is_a_retweet);
    // const [retweetStyle, setRetweetStyle] = useState((props.tweet.is_a_retweet && 'btn-primary' || 'btn-light'));

    const [tweet, setTweet] = useState(props.tweet);
    const [likeStyle, setLikeStyle] = useState((props.tweet.is_already_liked && 'btn-danger') || 'btn-light');
    const [retweetStyle, setRetweetStyle] = useState((props.tweet.is_a_retweet && 'btn-primary') || 'btn-light');

    function handleLike() {
        // Unlike tweet
        if (tweet.is_already_liked) {
            TweetService.unlikeTweet(props.tweet.id).then((response) => {
                if (!response.error) {
                    setTweet(response.data);
                    setLikeStyle('btn-light');
                };
            });
        // Like tweet
        } else {
            TweetService.likeTweet(props.tweet.id).then((response) => {
                if (!response.error) {
                    setTweet(response.data);
                    setLikeStyle('btn-danger');
                };
            });
        }
    }

    function handleRetweet() {
        if (tweet.is_a_retweet) {
            TweetService.removeTweet(props.tweet.id).then((response) => {
                if (!response.error) {
                    setTweet(response.data);
                    setRetweetStyle('btn-light');
                };
            });
        } else {
            TweetService.retweet(props.tweet.id).then((response) => {
                if (!response.error) {
                    setTweet(response.data);
                    setRetweetStyle('btn-primary');
                };
            });
        }

    }

    return (
        <div className="card-body" style={tweetSeparator}>
        {/* Tweet content */}
        <div className="row">
        <div className="col-1 mr-3">
            <img src="../static/assets/images/users/profile-pic.jpg" alt="user" className="rounded-circle" width={60}/>
        </div>
        <div className="col-10">
            <h5 className="text-dark">
                <a href={"/profile/"+ tweet.user.username}>{
                    // (props.tweet.user.first_name && props.tweet.user.last_name
                    // && props.tweet.user.first_name + ' ' + props.tweet.user.last_name) ||
                    // (props.tweet.user.first_name && props.tweet.user.first_name) || 
                    // (props.tweet.user.last_name && props.tweet.user.last_name) || ''}
                    (props.tweet.user &&
                        props.tweet.user.first_name + ' ' + props.tweet.user.last_name)}</a>
                <span> @{props.tweet.user.username}</span></h5>
            <p>{props.tweet.content}</p>
        </div>
        </div>
        {/* Tweet button */}
        <div className="row justify-content-center px-3 my-2">
             <div className='col-2'>
                <button type="button" className={likeStyle + ' btn btn-xs btn-circle p-0 mr-2'} onClick={handleLike} style={btnExtraSmall}>
                    <Heart size={".8rem"}/>
                </button>
                <span>{(tweet.likes_count && tweet.likes_count) || 0}</span>
             </div>
             <div className='col-2'>
                <button type="button" className={retweetStyle + ' btn btn-xs btn-circle p-0 mr-2'} onClick={handleRetweet} style={btnExtraSmall}>
                    <Repeat size={".8rem"}/>
                </button>
                <span>{(tweet.retweet_count && tweet.retweet_count) || 0}</span>
             </div>
        </div>
    </div>
    )
}

export default TweetDetailComponent;