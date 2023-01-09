import './topbar.css';
import { UserContext } from '../../context/Context';
import { useContext } from 'react';
import { fetchLogOut } from '../../services/service';
export default function TopBar() {
  const { user, dispatch } = useContext(UserContext);
  const handleClick = (e) => {
    e.preventDefault();
    fetchLogOut()
      .then(() => {
        dispatch({ type: 'LOG_OUT' });
      })
      .catch((err) => {
        setTimeout(() => {
          dispatch({ type: 'LOGIN_FAIL' });
        }, 2000);
      });
  };
  const websiteTitle = user ? 'AlgoNote' : 'Welcome to AlgoNote';
  return (
    <div className='topbar'>
      <h1 className='website-title'> {websiteTitle} </h1>
      {user && (
        <div className='topbar-userinfo'>
          <p className='userinfo'>
            {' '}
            Hi, <span className='username'>{user}</span>{' '}
          </p>{' '}
          <button className='logout-button' onClick={handleClick}>
            Logout{' '}
          </button>{' '}
        </div>
      )}
    </div>
  );
}
