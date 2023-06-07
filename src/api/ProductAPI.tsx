import axios from 'axios';

export const getProducts = async () => {

    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/products`,
      {
        headers: {
        },
      }
    );
    return response.data;
  };