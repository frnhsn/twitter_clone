import { Switch, Route, useHistory, useParams } from 'react-router-dom';
import Login from './components/login.component.js';
import Register from './components/register.component.js';
import Home from './components/page_contents/home.component.js';
import Profile from './components/page_contents/profile.component.js';
import Settings from './components/page_contents/settings.component.js';
import AuthRoute from './components/routes/authRoute.component.js';
import MainWrapper from './components/mainWrapper.component.js';
import AuthService from './services/auth.service.js';

function App() {
  const history = useHistory();
  const user = AuthService.getCurrentUser();

  const ProfileWrapper = () => {
    const params = useParams();
    if (params.username)
      return <Profile username={params.username} />
    return <Profile username={user.username} />
  };

  return (
    <div className="App">
      <Switch>
          {/* <Route exact path={["/", "/home"]} component={Home} /> */}
          <AuthRoute path="/login" component={Login} />
          <Route path="/logout" render={() => { 
            AuthService.logout();
            history.push('/login')
            }}/>
          <AuthRoute path="/register" component={Register} />
          <MainWrapper exact path="/" title="Home" component={Home}/>
          <MainWrapper path="/home" title="Home" component={Home}/>
          <MainWrapper path="/profile/:username" title="Profile" component={ProfileWrapper}/>
          <MainWrapper exact path="/profile" title="Profile" component={ProfileWrapper}/>
          <MainWrapper path="/settings" title="Settings" component={Settings}/>
      </Switch>
    </div>
  );
}

export default App;
