import TweetDetailComponent from '../sections/tweetDetail.component.js';

function filterTweets(tweets) {
  if (Array.isArray(tweets) && tweets.length > 0) {
    let retweetedParent = [];
    let alreadyRetweetedParent = [];

    tweets.forEach(tweet => {
      if (tweet.is_a_retweet) retweetedParent.push(tweet.parent);
      if (tweet.is_already_retweeted) alreadyRetweetedParent.push(tweet.parent); 
    });

    return tweets.filter(tweet => {
      return tweet.is_already_retweeted ||
        (retweetedParent.indexOf(tweet.id) === -1 &&
        alreadyRetweetedParent.indexOf(tweet.parent) === -1);
    })
  }
  return tweets;
}

function TweetListComponent(props) {

  return (
      <div className="card">
        {Array.isArray(props.tweets) && filterTweets(props.tweets)
          .sort((a,b) => b.timestamp - a.timestamp)
          .map(tweet => {
          return (
            <TweetDetailComponent 
              tweet={tweet} 
              key={tweet.id}
              pushTweet={props.pushTweet}
              removeTweet={props.removeTweet}/>
          )
        })}
      </div>
  )
}

export default TweetListComponent;