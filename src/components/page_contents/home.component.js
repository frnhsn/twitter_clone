
import { useState, useEffect } from 'react';
import NewTweetComponent from '../sections/newTweet.component.js';
import TweetListComponent from '../sections/tweetList.component.js';
import WhoToFollowListComponent from '../sections/whoToFollowList.component.js';
import TweetService from '../../services/tweet.service.js';

function HomeComponent(props) {
  const [tweets, setTweets] = useState([]);

  const handleNewTweet = (message, image=null) => {
    TweetService.newTweet(message).then(response =>  {
      if (!response.error) {
        setTweets([response.data, ...tweets]);
      }
    })
  }
    
  // When mount completed
  useEffect(() => {
    TweetService.getFeeds().then(response => {
      if (!response.error) {
        setTweets(tweets.concat(...response.data));
      } else {
        alert(response.message);
      }
    }).catch(error => {
      alert(error);
    });
  }, [])

  return (
    <div className="row p-4">
      <div className="col-md-8">
          <NewTweetComponent handleNewTweet={handleNewTweet}/>
          <TweetListComponent tweets={tweets}/>
      </div>
      {/* Right sidebar */}
      <div className="right-sidebar col-md-4">
        <WhoToFollowListComponent/>
      </div>
    </div>
    )
}

export default HomeComponent;
