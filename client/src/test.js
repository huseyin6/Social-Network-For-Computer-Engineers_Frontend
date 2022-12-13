import axios from './axios';

const handleSignIn = async (adminUser) => {
  const response = await axios.post('/auth', {
    email: 'huseyinkkarakaya@gmail.com',
    password: '123456',
  });
  console.log(response);
};

export default handleSignIn;
