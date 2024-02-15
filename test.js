const axios = require('axios');
const test = async () => {
  try {
    const { data } = await axios.post(
      'http://full-stack-ecommerce-five.vercel.app/api/auth/signin',
      { email: 'test@gmail.com', password: '123' }
    );
    const { user } = data;
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};
test();
