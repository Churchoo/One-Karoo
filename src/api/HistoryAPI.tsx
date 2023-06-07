import axios from 'axios';

export const getHistory = async (params: {accountId: number}) => {

    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/history`,
      {
        headers: {
        },
        params,
      },
    );
    return response.data;
  };