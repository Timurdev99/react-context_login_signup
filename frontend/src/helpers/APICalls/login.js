import {getBaseApi} from './api';

const login = async (values) => {
  const api = getBaseApi();
  
  return await api.post('/login', values)
    .then((res) => res.data)
    .catch((error) => ({
      error: error
    }));
};

export default login;