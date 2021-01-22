import { useEffect, useState } from 'react';
import WhoToFollowDetailComponent from '../sections/whoToFollowDetail.component.js';
import UserService from '../../services/user.service.js';

function WhoToFollowListComponent(props) {
    const [profiles, setProfiles] = useState([]);

    // Component did mount
    useEffect(() => { 
        UserService.whoToFollow().then(response => {
            if (!response.error) {
                setProfiles(response.data);
            } else {
                alert(response.message);
            };
        }).catch(error => {
            alert(error.message);
        })
    }, [])

    return (
        <div className="card">
            <div className="card-body">
            <h4 className="card-title">Who to follow?</h4>
            </div>
            {profiles && profiles.map(profile => {
                return <WhoToFollowDetailComponent profile={profile} key={profile.user_id}/>
            })}
        </div>
    )
};

export default WhoToFollowListComponent;