import './login.css';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/Context';
import { fetchLogin, handleError } from '../../services/service';
import loginImg from '../../img/login.png';
export default function Login() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useContext(UserContext);
  const handleSubmit = (e) => {
    e.preventDefault();

    fetchLogin(username)
      .then((user) => {
        dispatch({ type: 'LOGIN_SUCCESS', payload: user.username });
      })
      .catch((error) => {
        setUsername('');
        setError(handleError(error));
      });
  };
  return (
    <div className='login-page'>
      <img src={loginImg} className='login-img' alt='login img' />
      <h1 className='login-form-title'>
        Start taking your notes on algorithms!
      </h1>
      <form action='' className='login-form' onSubmit={handleSubmit}>
        <label className='login-label' htmlFor='login-input'>
          Username:{' '}
        </label>
        <input
          id='login-input'
          type='text'
          placeholder='Please enter your username'
          size='23'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError('');
          }}
        ></input>
        <button className='login-button' type='submit'>
          LOGIN
        </button>
      </form>
      {error && <p className='error-message'>{error}</p>}
    </div>
  );
}
