import './app.css';
import { UserContext } from './context/Context';
import { useContext, useEffect, useState } from 'react';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import TopBar from './components/topbar/TopBar';
import Notes from './components/notes/Notes';
import { checkSession } from './services/service';
import Spinner from './components/spinner/Spinner';

function App() {
  const { user, dispatch } = useContext(UserContext);
  const [loading, setIsloading] = useState(false);
  useEffect(() => {
    setIsloading(true);
    setTimeout(() => {
      checkSession()
        .then((user) => {
          dispatch({ type: 'LOGIN_SUCCESS', payload: user.username });
          setIsloading(false);
        })
        .catch((error) => {
          dispatch({ type: 'LOGIN_FAIL' });
          setIsloading(false);
        });
    }, 2000);
  }, []);
  return (
    <div className='app'>
      {loading && <Spinner message={'Checking your session...'} />}
      {!loading && <TopBar />}
      {!user && !loading && <Login />}
      {user && !loading && <Notes />}
      {!loading && <Footer />}
    </div>
  );
}

export default App;
