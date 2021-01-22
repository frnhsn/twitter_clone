import { useHistory } from 'react-router-dom';
import AuthService from '../services/auth.service.js';

function LogoutComponent() {
    const history = useHistory();
    AuthService.logout();
    history.push('/');
}

export default LogoutComponent;