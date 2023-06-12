import axios from 'axios';

export const getProducts = async () => {

    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getProducts`,
      {
        headers: {
          "Access-Control-Allow-Origin": true,
          "Access-Control-Allow-Credentials": true,
        },
      }
    );
    return response.data;
  };