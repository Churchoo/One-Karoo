import axios from 'axios';

export const getBox = async () => {

    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getBox`,
      {
        headers: {
          "Access-Control-Allow-Origin": true,
          "Access-Control-Allow-Credentials": true,
        },
      }
    );
    return response.data;
  };