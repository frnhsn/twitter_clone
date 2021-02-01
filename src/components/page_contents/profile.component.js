
import { useEffect, useState } from 'react';
import ProfileHeaderComponent from '../sections/profileHeader.component.js';
import TweetListComponent from '../sections/tweetList.component.js';
import WhoToFollowListComponent from '../sections/whoToFollowList.component.js';
import UserService from '../../services/user.service.js';

function ProfileComponent(props) {
  const [ following, setFollowing ] = useState();
  const [ followers, setFollowers ] = useState();
  const [ user, setUser ] = useState();
  const [ userTweets, setUserTweets] = useState([]);

  const pushTweet = (tweet) => {
    if (userTweets.map(tweet => tweet.id).indexOf(tweet.id) === -1) {
      setUserTweets([tweet, ...userTweets]);
    } 
  };

  const removeTweet = (tweetId) => {
    setUserTweets(userTweets.filter(tweet => tweet.id !== tweetId));
  };

  useEffect(() => {
    if (props.username) {
      UserService.getProfile(props.username).then(response => {
        if (!response.error) {
          setUser(response.data);
          //  Fetch following list of the user
          UserService.following(props.username).then(response => {
            setFollowing(response.data);
          });
          // Fetch followers list of the user
          UserService.followers(props.username).then(response => {
            setFollowers(response.data);
          });
          // Fetch tweet list of a user
          UserService.getTweets(props.username).then(res => {
            if (!response.error) {
                setUserTweets(res.data);
            } else {
              alert(JSON.stringify(res.message));
            }
          }).catch(error => {
            alert(error);
          });
        } else {
          alert(JSON.stringify(response.message));
        } 
      }).catch(error => {
        alert(error);
      });
    }
  }, [props])

  return (
    <div className="row p-4">
      <div className="col-md-8">
          <ProfileHeaderComponent 
            profile={user} 
            following={following} 
            followers={followers}/>
          <TweetListComponent 
            tweets={userTweets}
            pushTweet={pushTweet}
            removeTweet={removeTweet}/>
      </div>
      {/* Right sidebar */}
      <div className="right-sidebar col-md-4">
        <WhoToFollowListComponent/>
      </div>
    </div>
    )
}

export default ProfileComponent;
