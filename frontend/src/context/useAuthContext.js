import { useState, useContext, createContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
// import logoutAPI from '../helpers/APICalls/logout';

export const AuthContext = createContext({
  loggedInUser: undefined,
  updateLoginContext: () => null,
  logout: () => null,
});

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState();
  const history = useHistory();

  const updateLoginContext = useCallback(

    (data) => {
      setLoggedInUser(data);
      history.push('/dashboard');
    },
    [history],
  );

  const logout = useCallback(async () => {
    // await logoutAPI()
    //   .then(() => {
    //     setLoggedInUser(null);
    //     history.push('/login');
    //   })
    //   .catch((error) => console.error(error));
  }, [history]);

  return <AuthContext.Provider value={{ loggedInUser, updateLoginContext, logout }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
