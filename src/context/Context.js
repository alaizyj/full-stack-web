import { createContext, useEffect, useReducer } from 'react';
import Reducer from './Reducer';

const INITIAL_STATE = {
  user: null,
};
export const UserContext = createContext(INITIAL_STATE);

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {}, [state.user]);
  return (
    <UserContext.Provider value={{ user: state.user, dispatch }}>
      {children}{' '}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
