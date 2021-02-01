
import { useState, useEffect, useRef } from 'react';
import NewTweetComponent from '../sections/newTweet.component.js';
import TweetListComponent from '../sections/tweetList.component.js';
import WhoToFollowListComponent from '../sections/whoToFollowList.component.js';
import TweetService from '../../services/tweet.service.js';

function HomeComponent(props) {
  const [tweets, setTweets] = useState([]);
  const mounted = useRef(false);

  const handleNewTweet = (message, image=null) => {
    TweetService.newTweet(message).then(response =>  {
      if (!response.error) {
        setTweets([response.data, ...tweets]);
      }
    })
  }

  const pushTweet = (tweet) => {
    if (tweets.map(tweet => tweet.id).indexOf(tweet.id) === -1) {
      setTweets([tweet, ...tweets]);
    } 
  };

  const removeTweet = (tweetId) => {
    setTweets(tweets.filter(tweet => tweet.id !== tweetId));
  };
    
  useEffect(() => {
    if (!mounted.current) {
      // Component did mount
      TweetService.getFeeds().then(response => {
        if (!response.error) {
          setTweets(response.data);
        } else {
          alert(response.message);
        }
      }).catch(error => {
        alert(error);
      });
      mounted.current = true;
    }
  }, [tweets])

  return (
    <div className="row p-4">
      <div className="col-md-8">
          <NewTweetComponent handleNewTweet={handleNewTweet}/>
          <TweetListComponent 
            tweets={tweets}
            pushTweet={pushTweet}
            removeTweet={removeTweet}
          />
      </div>
      {/* Right sidebar */}
      <div className="right-sidebar col-md-4">
        <WhoToFollowListComponent/>
      </div>
    </div>
    )
}

export default HomeComponent;
